import {BOOKING} from "@/types/booking"
import React from "react"
import TempLoader from "../TempLoader"
import {
  TableBase,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  StatusBadge
} from "../ui/table-base"

interface BookingTableProps {
  initialValues?: BOOKING[]
  loading: boolean
  errorMessage: Record<string, string>
}

const BookingTable = ({initialValues, loading, errorMessage}: BookingTableProps) => {
  return (
    <TableBase>
      <table className="w-full">
        <TableHeader>
          <TableHeaderCell>No</TableHeaderCell>
          <TableHeaderCell>Nomor Booking</TableHeaderCell>
          <TableHeaderCell>Nomor Penerbangan</TableHeaderCell>
          <TableHeaderCell>Nama Pembeli</TableHeaderCell>
          <TableHeaderCell>Jumlah Kursi</TableHeaderCell>
          <TableHeaderCell>Total Harga</TableHeaderCell>
          <TableHeaderCell className="text-center">Status</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {!loading && initialValues && !errorMessage.error && initialValues.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {item.uuid}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                  {item.flight.no_penerbangan}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{item.user.name}</div>
              </TableCell>
              <TableCell>
                <div
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">
                  {item.jumlah_kursi}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium text-gray-900 dark:text-white">
                  Rp {new Intl.NumberFormat("id-ID").format(Number(item.total_harga))}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <StatusBadge status={item.status}/>
              </TableCell>
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

export default BookingTable
