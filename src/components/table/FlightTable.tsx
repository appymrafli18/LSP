"use client"

import convertToRupiah from "@/lib/converterRupiah"
import type {FLIGHT, SeatClass} from "@/types/flight"
import TempLoader from "../TempLoader"
import {Edit, Eye, Trash} from "lucide-react"
import {
  TableBase,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableActionCell,
  ActionButton,
} from "../ui/table-base"

interface IFlightTableProps {
  initialValues: FLIGHT[]
  loading: boolean
  errorMessage: Record<string, string>
  onEdit: (data: FLIGHT) => void
  onDelete: (uuid: string) => void
  onDetail: (data: FLIGHT) => void
  role: string | undefined
}

const FlightTable = ({initialValues, loading, errorMessage, role, onEdit, onDelete, onDetail}: IFlightTableProps) => {
  // Helper function to get the lowest price from seat classes
  const getLowestPrice = (seatClasses: SeatClass[]): number => {
    if (!seatClasses || seatClasses.length === 0) return 0

    // Find the lowest price among all seat classes
    const prices = seatClasses.map((sc) => Number.parseInt(sc.harga))
    return Math.min(...prices)
  }

  return (
    <TableBase>
      <table className="w-full">
        <TableHeader>
          <TableHeaderCell>No</TableHeaderCell>
          <TableHeaderCell>Nomor Penerbangan</TableHeaderCell>
          <TableHeaderCell>Kota Keberangkatan</TableHeaderCell>
          <TableHeaderCell>Kota Tujuan</TableHeaderCell>
          <TableHeaderCell>Harga (Mulai Dari)</TableHeaderCell>
          <TableHeaderCell>Kelas</TableHeaderCell>
          <TableHeaderCell className="text-center">Action</TableHeaderCell>
        </TableHeader>

        <TableBody>
          {!loading &&
            initialValues &&
            initialValues.length > 0 &&
            initialValues.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                    <span className="font-medium">{item.no_penerbangan}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </span>
                    {item.kota_keberangkatan}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30">
                      <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </span>
                    {item.kota_tujuan}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {convertToRupiah(getLowestPrice(item.seatClasses))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.seatClasses &&
                      item.seatClasses.map((seatClass, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            seatClass.type === "Economy"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : seatClass.type === "Business"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                          }`}
                        >
                          {seatClass.type}
                        </span>
                      ))}
                  </div>
                </TableCell>
                <TableActionCell>
                  <ActionButton
                    icon={<Eye size={18}/>}
                    label="Detail"
                    onClick={() => onDetail(item)}
                    variant="success"
                  />
                  {role === "Maskapai" && (
                    <ActionButton
                      icon={<Edit size={18}/>}
                      label="Edit"
                      onClick={() => onEdit(item)}
                      variant="primary"
                    />
                  )}
                  <ActionButton
                    icon={<Trash size={18}/>}
                    label="Delete"
                    onClick={() => item.uuid && onDelete(item.uuid)}
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

export default FlightTable
