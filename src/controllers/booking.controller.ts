import bookingServices from "@/services/booking.service";
import {ICreateBooking} from "@/types/booking";
import {IPayload} from "@/types/jwt";
import {IParams} from "@/types/params";

const bookingController = {
  getAllBookings: async ({store}: { store: { user: IPayload } }) =>
    bookingServices.getAllBookings(store.user),

  getOneBooking: async ({
                          params,
                          store,
                        }: {
    params: IParams;
    store: { user: IPayload };
  }) => bookingServices.getOneBooking(params.uuid, store.user),

  getTotalBooking: ({store}: { store: { user: IPayload } }) =>
    bookingServices.getTotalBooking(store.user),

  getFilterBookings: async ({store, query}: {
    store: { user: IPayload }, query: {
      no_penerbangan: string,
      no_booking: string,
    }
  }) => bookingServices.getFilterBookings(store.user, query.no_penerbangan, query.no_booking),

  createBookings: async ({
                           body,
                           store,
                         }: {
    body: ICreateBooking;
    store: { user: IPayload };
  }) => bookingServices.createBookings(body, store.user),

  updateBookings: async ({
                           body,
                           params,
                           store,
                         }: {
    body: ICreateBooking;
    params: IParams;
    store: { user: IPayload };
  }) => bookingServices.updateBookings(body, params.uuid, store.user),

  deleteBookings: async ({
                           params,
                           store,
                         }: {
    params: IParams;
    store: { user: IPayload };
  }) => bookingServices.deleteBookings(params.uuid, store.user),
};

export default bookingController;
