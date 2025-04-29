import { userServices } from "@/services/user.service";
import { IPayload } from "@/types/jwt";
import { IParams } from "@/types/params";
import { USER } from "@/types/user";

export const userController = {
  getUsers: async ({
    params,
    store: { user },
  }: {
    params: { role: string };
    store: { user: IPayload };
  }) => await userServices.getAllUser(params.role, user),

  filterUser: async ({
    store: { user },
    query
  }: {
    store: { user: IPayload };
    query: {email?: string, role: string}
  }) => {
    const {email, role} = query;
    return await userServices.getFilterUser(user, role, email)
  },

  getOneUser: async ({
    params,
    store: { user },
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => await userServices.getOneUser(params.uuid, user),

  getTotalUser: async ({ store: { user } }: { store: { user: IPayload } }) =>
    await userServices.getTotalUser(user),

  getMeUser: async ({ store: { user } }: { store: { user: IPayload } }) =>
    await userServices.getMeUser(user),

  createUser: async ({
    body,
    store: { user },
  }: {
    body: USER;
    store: { user: IPayload };
  }) => await userServices.createUser(body, user),

  updateUser: async ({
    params,
    body,
    store: { user },
  }: {
    params: IParams;
    body: USER;
    store: { user: IPayload };
  }) => await userServices.updateUser(params.uuid, body, user),

  updateMe: async ({
    body,
    store: { user },
  }: {
    body: USER;
    store: { user: IPayload };
  }) => await userServices.updateMe(body, user),

  deleteUser: async ({
    params,
    store: { user },
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => await userServices.deleteUser(params.uuid, user),
};
