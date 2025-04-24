// "use client";

// import { BOOKING } from "@/types/booking";
// import { FLIGHT } from "@/types/flight";
// import { ChangeEvent, useState } from "react";

// interface IAddBookingProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (value: BOOKING) => void;
//   loading: boolean;
//   flight: FLIGHT;
// }

// export default function AddBooking({
//   isOpen,
//   onClose,
//   onSave,
//   loading,
//   flight,
// }: IAddBookingProps) {
//   const [value, setValue] = useState<BOOKING>({
//     jumlah_kursi: 1,
//     flightId: flight.uuid,
//   } as BOOKING);

//   if (!isOpen) return null;

//   const onChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
//     setValue((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }));
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-[var(--card)] rounded-lg shadow-lg p-6 w-full max-w-md">
//         <h2 className="text-lg font-semibold mb-4 text-[var(--text)]">
//           Add Booking
//         </h2>

//         {/* Flight Details */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg">
//           <h3 className="font-medium mb-2">Selected Flight Details:</h3>
//           <div className="text-sm space-y-1">
//             <p><span className="font-medium">Flight Number:</span> {flight.no_penerbangan}</p>
//             <p><span className="font-medium">Route:</span> {flight.kota_keberangkatan} → {flight.kota_tujuan}</p>
//             <p><span className="font-medium">Schedule:</span></p>
//             <p className="ml-4">{new Date(flight.waktu_keberangkatan).toLocaleString()} →</p>
//             <p className="ml-4">{new Date(flight.waktu_kedatangan).toLocaleString()}</p>
//             <p><span className="font-medium">Price:</span> Rp {parseInt(flight.harga).toLocaleString()}</p>
//             <p><span className="font-medium">Available Seats:</span> {flight.kursi_tersedia}</p>
//           </div>
//         </div>

//         <div>
//           <label className="text-sm font-medium">Jumlah Kursi</label>
//           <input
//             type="number"
//             onChange={(e) => onChangeValues(e)}
//             name="jumlah_kursi"
//             min={1}
//             max={flight.kursi_tersedia}
//             value={value.jumlah_kursi}
//             className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
//             placeholder="Jumlah Kursi..."
//           />
//         </div>

//         <div className="mt-2 mb-4">
//           <p className="text-sm text-gray-600">
//             Total Price: Rp {(parseInt(flight.harga) * value.jumlah_kursi).toLocaleString()}
//           </p>
//         </div>

//         <div className="flex justify-end space-x-2 mt-4">
//           <button
//             className="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-700"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             disabled={loading || value.jumlah_kursi < 1 || value.jumlah_kursi > flight.kursi_tersedia}
//             className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
//               (loading || value.jumlah_kursi < 1 || value.jumlah_kursi > flight.kursi_tersedia) ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             onClick={() => onSave(value)}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
