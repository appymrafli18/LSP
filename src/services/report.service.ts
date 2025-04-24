// import { prisma_connection } from "@/lib/prisma-orm";
// import { IPayload } from "@/types/jwt";
// import { ReportData } from "@/types/report";
// import { Prisma, TypeReport } from "@prisma/client";

// const reportServices = {
//   getAllReports: async (user: IPayload) => {
//     try {
//       const searchAirlines = await prisma_connection.airlines.findUnique({
//         where: {
//           userId: user.id,
//         },
//         include: {
//           flights: true,
//         },
//       });

//       if (!searchAirlines && user.role === "MASKAPAI")
//         return { statusCode: 404, message: "Airlines not found" };

//       const airlinesId = searchAirlines?.id;
//       const response = await prisma_connection.tbl_reports.findMany({
//         where: {
//           booking: {
//             flight: {
//               airlinesId: airlinesId,
//             },
//           },
//         },
//         include: {
//           booking: {
//             include: {
//               flight: {
//                 omit: {
//                   kapasitas_kursi: true,
//                   kursi_tersedia: true,
//                   airlinesId: true,
//                 },
//               },
//             },
//           },
//         },
//       });

//       if (!response) return { statusCode: 404, message: "Reports not found" };

//       return { statusCode: 200, message: "Success", data: response };
//     } catch (error) {
//       return {
//         statusCode: 400,
//         message: "Terjadi kesalahan Internal",
//         error: (error as Error).message,
//       };
//     }
//   },

//   getOneReport: async (uuid: string, user: IPayload) => {
//     try {
//       const searchAirlines = await prisma_connection.airlines.findUnique({
//         where: {
//           userId: user.id,
//         },
//         include: {
//           flights: true,
//         },
//       });

//       if (!searchAirlines && user.role === "MASKAPAI")
//         return { statusCode: 404, message: "Airlines not found" };

//       const airlinesId = searchAirlines?.id;
//       const response = await prisma_connection.tbl_reports.findUnique({
//         where: {
//           uuid,
//           booking: {
//             flight: {
//               airlinesId: airlinesId,
//             },
//           },
//         },
//         include: {
//           booking: {
//             include: {
//               flight: {
//                 omit: {
//                   kapasitas_kursi: true,
//                   kursi_tersedia: true,
//                   airlinesId: true,
//                 },
//               },
//             },
//           },
//         },
//       });

//       if (!response) return { statusCode: 404, message: "Report not found" };

//       return { statusCode: 200, message: "Success", data: response };
//     } catch (error) {
//       return {
//         statusCode: 400,
//         message: "Terjadi kesalahan Internal",
//         error: (error as Error).message,
//       };
//     }
//   },

//   createReport: async (
//     body: { bookingId: string; type: string; data: ReportData },
//     user: IPayload
//   ) => {
//     if (user.role !== "ADMIN")
//       return { statusCode: 401, message: "Unauthorized" };
//     try {
//       const searchBooking = await prisma_connection.tbl_bookings.findUnique({
//         where: {
//           uuid: body.bookingId,
//         },
//       });

//       if (!searchBooking)
//         return { statusCode: 404, message: "Booking not found" };

//       const data = {
//         type: body.type as TypeReport,
//         data: body.data as Prisma.JsonObject,
//         bookingId: searchBooking.id,
//         userId: user.id,
//       };

//       if (body?.type && !(body.type in TypeReport))
//         return { statusCode: 400, message: "Type not found" };

//       const response = await prisma_connection.tbl_reports.create({
//         data,
//       });

//       return { statusCode: 200, message: "Success", data: response };
//     } catch (error) {
//       return {
//         statusCode: 400,
//         message: "Terjadi kesalahan Internal",
//         error: (error as Error).message,
//       };
//     }
//   },

//   updateReport: async (
//     uuid: string,
//     body: { type?: string; data?: ReportData },
//     user: IPayload
//   ) => {
//     if (user.role !== "ADMIN")
//       return { statusCode: 401, message: "Unauthorized" };
//     try {
//       const searchReport = await prisma_connection.tbl_reports.findUnique({
//         where: {
//           uuid,
//         },
//       });

//       if (!searchReport)
//         return { statusCode: 404, message: "Report not found" };

//       const data = {
//         type: body.type as TypeReport,
//         data: body.data as Prisma.JsonObject,
//       };

//       if (body?.type && !(body.type in TypeReport))
//         return { statusCode: 400, message: "Type not found" };

//       const response = await prisma_connection.tbl_reports.update({
//         where: {
//           id: searchReport.id,
//         },
//         data,
//       });

//       return { statusCode: 200, message: "Success", data: response };
//     } catch (error) {
//       return {
//         statusCode: 400,
//         message: "Terjadi kesalahan Internal",
//         error: (error as Error).message,
//       };
//     }
//   },

//   deleteReport: async (uuid: string, user: IPayload) => {
//     if (user.role !== "ADMIN")
//       return { statusCode: 401, message: "Unauthorized" };
//     try {
//       const searchReport = await prisma_connection.tbl_reports.findUnique({
//         where: {
//           uuid,
//         },
//       });

//       if (!searchReport)
//         return { statusCode: 404, message: "Report not found" };

//       await prisma_connection.tbl_reports.delete({
//         where: {
//           id: searchReport.id,
//         },
//       });

//       return { statusCode: 200, message: "Success Deleted Report" };
//     } catch (error) {
//       return {
//         statusCode: 400,
//         message: "Terjadi kesalahan Internal",
//         error: (error as Error).message,
//       };
//     }
//   },
// };

// export default reportServices;
