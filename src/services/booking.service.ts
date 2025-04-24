import {prisma_connection} from "@/lib/prisma-orm";
import {ICreateBooking} from "@/types/booking";
import {IPayload} from "@/types/jwt";

const bookingServices = {
  getAllBookings: async (user: IPayload) => {
    try {
      const searchAirlines = await prisma_connection.airlines.findUnique({
        where: {
          userId: user.id,
        },
        include: {
          flights: true,
        },
      });

      if (!searchAirlines && user.role === "Maskapai")
        return {statusCode: 404, message: "Airlines not found"};

      const airlinesId = searchAirlines?.id;
      const response = await prisma_connection.booking.findMany({
        where: {
          ...(user.role === "User" && {userId: user.id}),
          flight: {
            airlinesId: airlinesId,
          },
          ...(user.role === "Maskapai" && {
            status: "Confirmed",
          }),
        },
        omit: {
          userId: true,
          flightId: true,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          flight: {
            select: {
              no_penerbangan: true,
            },
          },
        },
      });

      if (!response || response.length < 1) return {statusCode: 404, message: "Bookings not found"};
      return {statusCode: 200, message: "Success", data: response};
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  getTotalBooking: async (user: IPayload) => {
    if (user.role === "User")
      return {statusCode: 401, message: "Unauthorized"};

    try {
      const totalBooking = await prisma_connection.booking.count({
        where: {
          ...(user.role === "Maskapai" && {
            flight: {
              airlines: {
                userId: user.id,
              },
            },
            status: "Confirmed",
          }),
        },
      });

      return {
        statusCode: 200,
        message: "Success",
        data: totalBooking,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  getFilterBookings: async (user: IPayload, no_flight?: string, no_booking?: string) => {
    if (user.role === "User") return {statusCode: 401, message: "Unauthorized"};

    try {
      const response = await prisma_connection.booking.findMany({
        where: {
          status: "Confirmed",
          ...(user.role === "Maskapai" && {
            flight: {
              airlines: {
                userId: user.id,
              },
            },
          }),
          ...(no_flight && {
            flight: {
              no_penerbangan: no_flight
            },

          }),
          ...(no_booking && {
            uuid: no_booking,
          }),
        },
        omit: {
          flightId: true,
          userId: true
        },
        include: {
          flight: {
            select: {
              no_penerbangan: true,
            }
          },
          user: {
            select: {
              name: true
            }
          }
        }
      })

      if (!response) return {statusCode: 404, message: "Bookings not found"};

      if (response.length < 1) return {statusCode: 404, message: "Does not have booking data"};

      return {
        statusCode: 200,
        message: "Success",
        data: response,
      }
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      }
    }
  },

  getOneBooking: async (uuid: string, user: IPayload) => {
    try {
      const searchAirlines = await prisma_connection.airlines.findUnique({
        where: {
          userId: user.id,
        },
        include: {
          flights: true,
        },
      });

      if (!searchAirlines && user.role === "Maskapai")
        return {statusCode: 404, message: "Airlines not found"};

      const airlinesId = searchAirlines?.id;
      const response = await prisma_connection.booking.findUnique({
        where: {
          uuid,
          ...(user.role === "User" && {userId: user.id}),
          flight: {
            airlinesId: airlinesId,
          },
          ...(user.role === "Maskapai" && {
            status: "Confirmed",
          }),
        },
        omit: {
          flightId: true,
          userId: true,
        },
        include: {
          flight: {
            omit: {
              kapasitas_kursi: true,
              kursi_tersedia: true,
              airlinesId: true,
            },
          },
        },
      });

      if (!response) return {statusCode: 404, message: "Bookings not found"};

      return {statusCode: 200, message: "Success", data: response};
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  createBookings: async (body: ICreateBooking, user: IPayload) => {
    if (user.role === "Maskapai")
      return {statusCode: 401, message: "Unauthorized"};
    try {
      const searchFlights = await prisma_connection.flights.findUnique({
        where: {
          uuid: body.flightId,
        },
        include: {
          airlines: true
        }
      });

      if (!searchFlights)
        return {statusCode: 404, message: "Flights not found"};

      const data = {
        jumlah_kursi: Number(body.jumlah_kursi),
        total_harga: searchFlights.harga.toNumber() * Number(body.jumlah_kursi),
        flightId: searchFlights.id,
        userId: user.role === "Admin" ? (body.userId as number) : user.id,
      };

      if (searchFlights.kursi_tersedia < data.jumlah_kursi)
        return {statusCode: 400, message: "Kursi Tersedia Kurang"};

      await prisma_connection.flights.update({
        where: {
          id: searchFlights.id,
        },
        data: {
          kursi_tersedia: searchFlights.kursi_tersedia - data.jumlah_kursi,
        },
      });

      const createBook = await prisma_connection.booking.create({
        data: {
          userId: data.userId,
          jumlah_kursi: data.jumlah_kursi,
          flightId: data.flightId,
          total_harga: data.total_harga,
        },
      });

      await prisma_connection.bookingActivity.create({
        data: {
          message: `${user.name} melakukan pemesanan ${data.jumlah_kursi} kursi untuk penerbangan ${searchFlights.airlines.name} dengan total harga Rp. ${data.total_harga.toLocaleString("id-ID")}`,
        }
      })

      return {
        statusCode: 201,
        message: "Success",
        data: {
          booking_uuid: createBook.uuid,
        },
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  updateBookings: async (
    body: ICreateBooking,
    uuid: string,
    user: IPayload
  ) => {
    if (user.role === "Maskapai")
      return {statusCode: 401, message: "Unauthorized"};
    try {
      const searchFlights = await prisma_connection.flights.findUnique({
        where: {
          uuid: body.flightId,
        },
        include: {
          bookings: true,
        },
      });

      if (!searchFlights)
        return {statusCode: 404, message: "Flights not found"};
      if (searchFlights.kursi_tersedia < Number(body.jumlah_kursi))
        return {
          statusCode: 400,
          message: "Jumlah kursi melebihi kapasitas kursi",
        };

      const searchBookings = await prisma_connection.booking.findUnique({
        where: {
          uuid,
          ...(user.role === "User" && {userId: user.id}),
        },
      });

      if (!searchBookings)
        return {statusCode: 404, message: "Bookings not found"};

      const data = {
        jumlah_kursi: Number(body.jumlah_kursi),
        total_harga: searchFlights.harga.toNumber() * Number(body.jumlah_kursi),
        flightId: searchFlights.id,
        userId: user.role === "Admin" ? (body.userId as number) : user.id,
      };

      await prisma_connection.booking.update({
        where: {
          id: searchBookings.id,
        },
        data,
      });

      return {statusCode: 200, message: "Success updated booking!"};
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  deleteBookings: async (uuid: string, user: IPayload) => {
    if (user.role === "Maskapai")
      return {statusCode: 401, message: "Unauthorized"};
    try {
      const search = await prisma_connection.booking.findUnique({
        where: {
          uuid,
          ...(user.role === "User" && {userId: user.id}),
        },
      });

      if (!search) return {statusCode: 404, message: "Bookings not found"};

      await prisma_connection.booking.delete({
        where: {
          id: search.id,
        },
      });

      return {statusCode: 200, message: "Success Deleted Bookings"};
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
};

export default bookingServices;
