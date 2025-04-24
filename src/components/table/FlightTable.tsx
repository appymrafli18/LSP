import convertToRupiah from "@/lib/converterRupiah";
import { FLIGHT } from "@/types/flight";
import React from "react";
import TempLoader from "../TempLoader";
import { Edit, Eye, Trash } from "lucide-react";

interface IFlightTableProps {
  initialValues: FLIGHT[];
  loading: boolean;
  onEdit: (data: FLIGHT) => void;
  onDelete: (uuid: string) => void;
  onDetail: (data: FLIGHT) => void;
}

const FlightTable = ({
  initialValues,
  loading,
  onEdit,
  onDelete,
  onDetail,
}: IFlightTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white table-auto">
        <thead>
          <tr className="bg-gray-200 text-sm leading-normal text-gray-600 uppercase">
            <th className="px-6 py-3 text-left">No</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">
              Nomor Penerbangan
            </th>
            <th className="px-6 py-3 text-left whitespace-nowrap">
              Kota Keberangkatan
            </th>
            <th className="px-6 py-3 text-left whitespace-nowrap">
              Kota Tujuan
            </th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Harga</th>

            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {initialValues &&
            initialValues.map((item, index) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={index}
              >
                <td className="px-6 py-3 text-left whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-3 text-left">{item.no_penerbangan}</td>
                <td className="px-6 py-3 text-left">
                  {item.kota_keberangkatan}
                </td>
                <td className="px-6 py-3 text-left">{item.kota_tujuan}</td>
                <td className="px-6 py-3 text-left">
                  {convertToRupiah(item.harga)}
                </td>
                <td className="px-6 py-3 text-center whitespace-nowrap flex justify-center gap-x-4">
                  {/* <button
                    className="rounded bg-green-500 px-4 mx-2 py-1 text-white"
                    onClick={() => onDetail(item)}
                  >
                    Detail
                  </button>
                  <button
                    className="rounded bg-blue-500 px-4 mx-2 py-1 text-white"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-500 mx-2 px-4 py-1 text-white"
                    onClick={() => item.uuid && onDelete(item.uuid)}
                  >
                    Delete
                  </button> */}
                  <Eye
                    width={20}
                    className="text-green-500 hover:cursor-pointer"
                    onClick={() => onDetail(item)}
                  />
                  <Edit
                    width={20}
                    className="text-blue-500 hover:cursor-pointer"
                    onClick={() => onEdit(item)}
                  />
                  <Trash
                    width={20}
                    className="text-red-500 hover:cursor-pointer"
                    onClick={() => item.uuid && onDelete(item.uuid)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading && (
        <div className="flex justify-center">
          <TempLoader />
        </div>
      )}
    </div>
  );
};

export default FlightTable;
