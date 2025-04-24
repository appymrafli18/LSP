// import reportServices from "@/services/report.service";
// import { IPayload } from "@/types/jwt";
// import { IParams } from "@/types/params";
// import { ReportData } from "@/types/report";

// const reportController = {
//   getAllReport: async ({ store }: { store: { user: IPayload } }) =>
//     reportServices.getAllReports(store.user),

//   getOneReport: async ({
//     params,
//     store,
//   }: {
//     params: IParams;
//     store: { user: IPayload };
//   }) => reportServices.getOneReport(params.uuid, store.user),

//   createReport: async (
//     body: { bookingId: string; type: string; data: ReportData },
//     store: { user: IPayload }
//   ) => reportServices.createReport(body, store.user),
//   updateReport: async ({
//     params,
//     body,
//     store,
//   }: {
//     params: IParams;
//     body: { type?: string; data?: ReportData };
//     store: { user: IPayload };
//   }) => reportServices.updateReport(params.uuid, body, store.user),

//   deleteReport: async ({
//     params,
//     store,
//   }: {
//     params: IParams;
//     store: { user: IPayload };
//   }) => reportServices.deleteReport(params.uuid, store.user),
// };

// export default reportController;
