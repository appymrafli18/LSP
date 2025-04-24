import {prisma_connection} from "@/lib/prisma-orm";
import {IBodyAirlines} from "@/types/airlines";
import {IPayload} from "@/types/jwt";
import fs from "fs";
import path from "path";

const airlineServices = {
  getAllAirlines: async (user: IPayload) => {
    try {
      const response = await prisma_connection.airlines.findMany({
        where: {
          ...(user.role === "Maskapai" && {userId: user.id}),
        },
        omit: {
          userId: true,
        },
        include: {
          user: {
            omit: {
              password: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      if (!response.length)
        return {statusCode: 404, message: "Airlines not found"};

      return {statusCode: 200, message: "Success", data: response};
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  getSelectedAirlines: async (uuid: string, user: IPayload) => {
    try {
      const response = await prisma_connection.airlines.findUnique({
        where: {
          uuid,
          ...(user.role === "Maskapai" && {userId: user.id}),
        },
        omit: {
          userId: true,
        },
        include: {
          user: {
            omit: {
              password: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      if (!response) return {statusCode: 404, message: "Airlines not found"};

      return {statusCode: 200, message: "Success", data: response};
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  createAirlines: async (body: IBodyAirlines, user: IPayload) => {
    if (user.role === "User")
      return {statusCode: 401, message: "Unauthorized"};

    try {
      if (!body.logo) return {statusCode: 400, message: "Image is required"};

      if (user.role === "Maskapai") {
        body.userId = user.id;
      }

      if (!body.userId) body.userId = user.id;

      const userId = Number(body.userId) || user.id;

      const search = await prisma_connection.airlines.findUnique({
        where: {
          userId,
        },
      });

      if (search)
        return {statusCode: 400, message: "Only one airlines per user"};

      const file = body.logo as File;
      const fileName = `${file.lastModified}-${file.name}`;

      if (file.size > 1_000_000)
        return {
          statusCode: 400,
          message: "File size must be less than 1MB",
        };

      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type))
        return {
          statusCode: 400,
          message: "File type must be image png/jpeg/jpg",
        };

      if (file.length > 1)
        return {statusCode: 400, message: "Image is required"};


      // if (!fs.existsSync("public/img-airlines")) {
      //   fs.mkdirSync("public/img-airlines", {recursive: true});
      // }

      const filePath = path.resolve("public/img-airlines/", fileName);
      fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));

      await prisma_connection.airlines.create({
        data: {
          name: user.role === "Maskapai" ? user.name : body.name,
          logo: fileName,
          userId,
        },
      });

      return {
        statusCode: 201,
        message: "Success created data airlines",
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  updateAirlines: async (uuid: string, body: IBodyAirlines, user: IPayload) => {
    if (user.role === "User")
      return {statusCode: 401, message: "Unauthorized"};

    try {
      const search = await prisma_connection.airlines.findUnique({
        where: {
          uuid,
        },
      });

      if (!search) return {statusCode: 404, message: "Airlines not found"};

      const file = body.logo as File;
      let fileName;

      if (body.logo && body.logo.size > 0) {
        if (file.size > 1_000_000)
          return {
            statusCode: 400,
            message: "File size must be less than 1MB",
          };

        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type))
          return {
            statusCode: 400,
            message: "File type must be image PNG/JPEG/JPG",
          };

        if (fs.existsSync("public/img-airlines/" + search.logo)) {
          fs.unlinkSync("public/img-airlines/" + search.logo);
        }

        fileName = `${file.lastModified}-${file.name}`;
        const filePath = path.resolve("public/img-airlines/", fileName);
        fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));
      }

      await prisma_connection.airlines.update({
        where: {id: search.id},
        data: {
          name: body.name || search.name,
          logo: fileName || search.logo,
        },
      });

      return {
        statusCode: 200,
        message: "Success updated data airlines",
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  deleteAirlines: async (uuid: string, user: IPayload) => {
    if (user.role !== "Admin")
      return {statusCode: 401, message: "Unauthorized"};

    try {
      const search = await prisma_connection.airlines.findUnique({
        where: {
          uuid,
        },
      });

      if (!search) return {statusCode: 404, message: "Airlines not found"};

      await prisma_connection.airlines.delete({
        where: {
          id: search.id,
        },
      });

      fs.unlinkSync("public/img-airlines/" + search.logo);

      return {statusCode: 200, message: "Success deleted data airlines"};
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
};

export default airlineServices;
