import {BOOKING} from "@/types/booking";
import React from "react";
import TempLoader from "../TempLoader";

interface BookingTableProps {
  initialValues?: BOOKING[];
  loading: boolean;
  errorMessage: Record<string, string>;
}

const BookingTable = ({
                        initialValues,
                        loading,
                        errorMessage,
                      }: BookingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
        <tr className="bg-gray-200 text-sm leading-normal text-gray-600 uppercase">
          <th className="px-6 py-3 text-left">No</th>
          <th className="px-6 py-3 text-left">Nomor Booking</th>
          <th className="px-6 py-3 text-left">Nomor Penerbangan</th>
          <th className="px-6 py-3 text-left">Nama Pembeli</th>
          <th className="px-6 py-3 text-left">Jumlah Kursi</th>
          <th className="px-6 py-3 text-left">Total Harga</th>
          <th className="px-6 py-3 text-center">Status</th>
        </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
        {initialValues && !errorMessage.error && initialValues.map((item, index) => (
          <tr
            className="border-b border-gray-200 hover:bg-gray-100"
            key={index}
          >
            <td className="px-6 py-3 text-left whitespace-nowrap">
              {index + 1}
            </td>
            <td className="px-6 py-3 text-left whitespace-nowrap">
              {item.uuid}
            </td>
            <td className="px-6 py-3 text-left whitespace-nowrap">
              {item.flight.no_penerbangan}
            </td>
            <td className="px-6 py-3 text-left">{item.user.name}</td>
            <td className="px-6 py-3 text-left">{item.jumlah_kursi}</td>
            <td className="px-6 py-3 text-left">
              {new Intl.NumberFormat("id-ID").format(
                Number(item.total_harga)
              )}
            </td>
            <td className="px-6 py-3 text-center">
              <p className={`status status-${item.status.toLowerCase()}`}>
                {item.status}
              </p>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {errorMessage.error && <p className="text-center p-4">{errorMessage.error}</p>}
      {loading && <TempLoader/>}
    </div>
  );
};

export default BookingTable;
