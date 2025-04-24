import React from "react";
import TempLoader from "../TempLoader";
import { PAYMENT } from "@/types/payment";
import { CheckCircle, XCircle } from "lucide-react";

interface PaymentsTableProps {
  initialValues: PAYMENT[];
  loading: boolean;
  selectStatus: string;
  errorMessage: Record<string, string>;
  onConfirm: (uuid: string) => void;
  onCancel: (uuid: string) => void;
}

const PaymentsTable = ({
  initialValues,
  loading,
  errorMessage,
  onConfirm,
  onCancel,
  selectStatus,
}: PaymentsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200 text-sm leading-normal text-gray-600 uppercase">
            <th className="px-6 py-3 text-left">No</th>
            <th className="px-6 py-3 text-left">Nama Booking</th>
            <th className="px-6 py-3 text-left">Metode Pembayaran</th>
            <th className="px-6 py-3 text-left">Jumlah Pembayaran</th>
            <th className="px-6 py-3 text-center">Status</th>
            {selectStatus === "Pending" && (
              <th className="px-6 py-3 text-left">Action</th>
            )}
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {initialValues.map((item, index) => {
            return (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={index}
              >
                <td className="px-6 py-3 text-left whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-3 text-left">
                  {item.booking.user.name}
                </td>
                <td className="px-6 py-3 text-left">{item.payment_method}</td>
                <td className="px-6 py-3 text-left">
                  {new Intl.NumberFormat("id-ID").format(
                    Number(item.jumlah_pembayaran)
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  <p className={`status status-${item.status.toLowerCase()}`}>
                    {item.status}
                  </p>
                </td>
                {selectStatus === "Pending" && (
                  <td className="px-6 py-3 text-center flex gap-x-4">
                    <CheckCircle
                      width={20}
                      className="text-green-500 hover:cursor-pointer"
                      onClick={() => onConfirm(item.uuid)}
                    />
                    <XCircle
                      width={20}
                      className="text-red-500 hover:cursor-pointer"
                      onClick={() => onCancel(item.uuid)}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {errorMessage.error && (
        <p className="text-center p-4">{errorMessage.error}</p>
      )}
      {loading && (
        <div className="flex justify-center">
          <TempLoader />
        </div>
      )}
    </div>
  );
};

export default PaymentsTable;
