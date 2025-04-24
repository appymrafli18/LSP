import { prisma_connection } from "@/lib/prisma-orm";
import { IPayload } from "@/types/jwt";
import { IPayment } from "@/types/payment";
import { Status } from "@prisma/client";

const paymentServices = {
  getAllPayments: async (status: string, user: IPayload) => {
    if (user.role === "Maskapai")
      return { statusCode: 401, message: "Unauthorized" };
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
        return { statusCode: 404, message: "Airlines not found" };

      const airlinesId = searchAirlines?.id;
      const response = await prisma_connection.payment.findMany({
        where: {
          // ...(status && status in Status && { status: status as Status }),
          ...(status && { status: status as Status }),
          booking: {
            ...(user.role === "User" && { userId: user.id }),
            flight: {
              airlinesId: airlinesId,
            },
          },
        },
        omit: {
          bookingId: true,
        },
        include: {
          booking: {
            select: {
              status: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!response) return { statusCode: 404, message: "Payments not found" };

      return { statusCode: 200, message: "Success", data: response };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  getOnePayment: async (uuid: string, user: IPayload) => {
    if (user.role === "Maskapai")
      return { statusCode: 401, message: "Unauthorized" };
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
        return { statusCode: 404, message: "Airlines not found" };

      const airlinesId = searchAirlines?.id;
      const response = await prisma_connection.payment.findUnique({
        where: {
          uuid,
          booking: {
            ...(user.role === "User" && { userId: user.id }),
            flight: {
              airlinesId: airlinesId,
            },
          },
        },
        include: {
          booking: {
            include: {
              flight: {
                omit: {
                  kapasitas_kursi: true,
                  kursi_tersedia: true,
                  airlinesId: true,
                },
              },
            },
          },
        },
      });

      if (!response) return { statusCode: 404, message: "Payment not found" };

      return { statusCode: 200, message: "Success", data: response };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  getTotalRevenuePayment: async (user: IPayload) => {
    if (user.role === "User")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const totalRevenue = await prisma_connection.payment.aggregate({
        _sum: {
          jumlah_pembayaran: true,
        },
        where: {
          status: "Confirmed",
          ...(user.role === "Maskapai" && {
            booking: {
              flight: {
                airlines: {
                  userId: user.id,
                },
              },
            },
          }),
        },
      });

      return {
        statusCode: 200,
        message: "Success",
        data: totalRevenue._sum.jumlah_pembayaran || 0,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  createPayment: async (body: IPayment, user: IPayload) => {
    if (user.role !== "User")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const searchBooking = await prisma_connection.booking.findUnique({
        where: {
          uuid: body.bookingId,
        },
      });

      if (!searchBooking)
        return { statusCode: 404, message: "Booking not found" };

      const data = {
        payment_method: body.payment_method,
        jumlah_pembayaran: searchBooking.total_harga,
        bookingId: searchBooking.id,
      };

      const response = await prisma_connection.payment.create({
        data,
      });

      return { statusCode: 201, message: "Success", data: response };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  updatePayment: async (uuid: string, body: IPayment, user: IPayload) => {
    if (user.role !== "Admin")
      return { statusCode: 401, message: "Unauthorized" };

    try {
      const searchPayment = await prisma_connection.payment.findUnique({
        where: {
          uuid,
        },
        include: {
          booking: true,
        },
      });

      if (!searchPayment)
        return { statusCode: 404, message: "Payment not found" };

      const data = {
        payment_method: body.payment_method,
        jumlah_pembayaran: body.jumlah_pembayaran,
        status: body.status as Status,
      };

      if (body?.status && !(body.status in Status))
        return { statusCode: 400, message: "Status not found" };

      const flightId = searchPayment.booking.flightId;
      const countKursi = searchPayment.booking.jumlah_kursi;

      const flight = await prisma_connection.flights.findUnique({
        where: {
          id: flightId,
        },
      });

      if (!flight) return { statusCode: 404, message: "Flight not found" };

      if (body.status === "Confirmed") {
        await prisma_connection.booking.update({
          where: {
            id: searchPayment.bookingId,
          },
          data: {
            status: data.status,
          },
        });
      } else if (body.status === "Cancelled") {
        await prisma_connection.booking.update({
          where: {
            id: searchPayment.bookingId,
          },
          data: {
            status: data.status,
          },
        });

        await prisma_connection.flights.update({
          where: {
            id: flight.id,
          },
          data: {
            kursi_tersedia: flight.kursi_tersedia + countKursi,
          },
        });
      }

      await prisma_connection.payment.update({
        where: {
          id: searchPayment.id,
        },
        data,
      });

      return { statusCode: 200, message: "Success Updated Payment" };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  deletePayment: async (uuid: string, user: IPayload) => {
    if (user.role !== "Admin")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const searchPayment = await prisma_connection.payment.findUnique({
        where: {
          uuid,
        },
      });

      if (!searchPayment)
        return { statusCode: 404, message: "Payment not found" };

      await prisma_connection.payment.delete({
        where: {
          id: searchPayment.id,
        },
      });

      return { statusCode: 200, message: "Success Deleted Payment" };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
};

export default paymentServices;
