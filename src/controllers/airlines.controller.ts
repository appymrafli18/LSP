import airlineServices from "@/services/airlines.service";
import { IBodyAirlines } from "@/types/airlines";
import { IPayload } from "@/types/jwt";
import { IParams } from "@/types/params";

const airlinesController = {
  getAllAirlines: async ({ store }: { store: { user: IPayload } }) => {
    return airlineServices.getAllAirlines(store.user);
  },

  getSelectedAirlines: async ({
    params,
    store,
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => {
    return airlineServices.getSelectedAirlines(params.uuid, store.user);
  },

  createAirlines: async ({
    body,
    store,
  }: {
    body: IBodyAirlines;
    store: { user: IPayload };
  }) => {
    return airlineServices.createAirlines(body, store.user);
  },

  updateAirlines: async ({
    params,
    body,
    store,
  }: {
    params: IParams;
    body: IBodyAirlines;
    store: { user: IPayload };
  }) => {
    return airlineServices.updateAirlines(params.uuid, body, store.user);
  },

  deleteAirlines: async ({
    params,
    store,
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => {
    return airlineServices.deleteAirlines(params.uuid, store.user);
  },
};

export default airlinesController;
