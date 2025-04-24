import { IAirlines } from "@/types/airlines";
import Image from "next/image";
import React from "react";
import TempLoader from "../TempLoader";
import { Edit, Trash } from "lucide-react";

interface IAirlinesTableProps {
  initialValues: IAirlines[];
  loading: boolean;
  onEdit: (selectAirlines: IAirlines) => void;
  onDelete: (uuid: string) => void;
}

const AirlinesTable = ({
  initialValues,
  loading,
  onDelete,
  onEdit,
}: IAirlinesTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200 text-sm leading-normal text-gray-600 uppercase">
            <th className="px-6 py-3 text-left">No</th>
            <th className="px-6 py-3 text-left">Logo</th>
            <th className="px-6 py-3 text-left">Nama</th>
            <th className="px-6 py-3 text-left">Pemilik</th>
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
                <td className="px-6 py-3 text-left">
                  <Image
                    src={`/img-airlines/${item.logo}`}
                    alt={`${item.name}`}
                    width={40}
                    height={40}
                    className="whitespace-nowrap"
                  />
                </td>
                <td className="px-6 py-3 text-left">{item.name}</td>
                <td className="px-6 py-3 text-left">{item.user.name}</td>
                <td className="px-6 py-3 text-center flex justify-center items-center gap-x-4">
                  {/* <button
                    className="rounded bg-blue-500 px-4 mx-2 py-1 text-white"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button> */}
                  {/* <button
                    className="rounded bg-red-500 mx-2 px-4 py-1 text-white"
                    onClick={() => onDelete(item.uuid)}
                  >
                    Delete
                  </button> */}
                  <Edit
                    width={20}
                    className="text-blue-500 hover:cursor-pointer"
                    onClick={() => onEdit(item)}
                  />
                  <Trash
                    width={20}
                    className="text-red-500 hover:cursor-pointer"
                    onClick={() => onDelete(item.uuid)}
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

export default AirlinesTable;
