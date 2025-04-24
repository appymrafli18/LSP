import {IPayload} from "@/types/jwt";
import {prisma_connection} from "@/lib/prisma-orm";

export const activityService = {
  getALlActivity: async (user: IPayload) => {
    if (user.role !== "Admin")
      return {statusCode: 401, message: "Unauthorized"};

    try {
      const response = await prisma_connection.bookingActivity.findMany({
        orderBy: {
          id: "desc"
        }
      });

      if (!response || response.length < 1) return {statusCode: 404, message: "Activity Not Found"};

      return {
        statusCode: 200,
        message: "Success",
        data: response,
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: "Terjadi Kesalahan Internal",
        error: (error as Error).message,
      };
    }
  }
}