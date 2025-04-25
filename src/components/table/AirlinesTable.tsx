import {IAirlines} from "@/types/airlines"
import Image from "next/image"
import React from "react"
import TempLoader from "../TempLoader"
import {Edit, Trash} from 'lucide-react'
import {
  TableBase,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableActionCell,
  ActionButton
} from "../ui/table-base";

interface IAirlinesTableProps {
  initialValues: IAirlines[]
  loading: boolean
  errorMessage: Record<string, string>
  onEdit: (selectAirlines: IAirlines) => void
  onDelete: (uuid: string) => void
}

const AirlinesTable = ({initialValues, loading, errorMessage, onDelete, onEdit}: IAirlinesTableProps) => {
  return (
    <TableBase>
      <table className="w-full">
        <TableHeader>
          <TableHeaderCell>No</TableHeaderCell>
          <TableHeaderCell>Logo</TableHeaderCell>
          <TableHeaderCell>Nama</TableHeaderCell>
          <TableHeaderCell>Pemilik</TableHeaderCell>
          <TableHeaderCell className="text-center">Action</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {!loading && initialValues && initialValues.length > 0 && initialValues.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div
                  className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600 shadow-sm">
                  <div className="absolute inset-0 rounded-full overflow-hidden bg-white">
                    <Image
                      src={`/img-airlines/${item.logo}`}
                      alt={`${item.name}`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Airline
                  ID: {item.uuid.substring(0, 8)}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-medium">
                    {item.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{item.user.name}</span>
                </div>
              </TableCell>
              <TableActionCell>
                <ActionButton
                  icon={<Edit size={18}/>}
                  label="Edit"
                  onClick={() => onEdit(item)}
                  variant="primary"
                />
                <ActionButton
                  icon={<Trash size={18}/>}
                  label="Delete"
                  onClick={() => onDelete(item.uuid)}
                  variant="danger"
                />
              </TableActionCell>
            </TableRow>
          ))}
        </TableBody>
      </table>

      {!loading && errorMessage.error && (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{errorMessage.error}</p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center p-8">
          <TempLoader/>
        </div>
      )}
    </TableBase>
  )
}

export default AirlinesTable
