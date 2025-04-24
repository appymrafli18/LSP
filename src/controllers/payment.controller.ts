import paymentServices from "@/services/payment.service";
import { IPayload } from "@/types/jwt";
import { IParams } from "@/types/params";
import { IPayment } from "@/types/payment";

const paymentController = {
  getAllPayment: async ({
    params,
    store,
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => paymentServices.getAllPayments(params.uuid, store.user),
  getOnePayment: async ({
    params,
    store,
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => paymentServices.getOnePayment(params.uuid, store.user),
  getTotalRevenuePayment: ({ store }: { store: { user: IPayload } }) =>
    paymentServices.getTotalRevenuePayment(store.user),
  createPayment: async ({
    body,
    store,
  }: {
    body: IPayment;
    store: { user: IPayload };
  }) => paymentServices.createPayment(body, store.user),
  updatePayment: async ({
    params,
    body,
    store,
  }: {
    params: IParams;
    body: IPayment;
    store: { user: IPayload };
  }) => paymentServices.updatePayment(params.uuid, body, store.user),
  deletePayment: async ({
    params,
    store,
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => paymentServices.deletePayment(params.uuid, store.user),
};

export default paymentController;
