import React from "react"
import TempLoader from "../TempLoader"
import {PAYMENT} from "@/types/payment"
import {CheckCircle, XCircle} from 'lucide-react'
import {
  TableBase,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableActionCell,
  StatusBadge,
  ActionButton
} from "../ui/table-base"

interface PaymentsTableProps {
  initialValues: PAYMENT[] | null
  loading: boolean
  selectStatus: string
  errorMessage: Record<string, string>
  onConfirm: (uuid: string) => void
  onCancel: (uuid: string) => void
}

const PaymentsTable = ({
                         initialValues,
                         loading,
                         errorMessage,
                         onConfirm,
                         onCancel,
                         selectStatus
                       }: PaymentsTableProps) => {
  return (
    <TableBase>
      <table className="w-full">
        <TableHeader>
          <TableHeaderCell>No</TableHeaderCell>
          <TableHeaderCell>Nama Booking</TableHeaderCell>
          <TableHeaderCell>Metode Pembayaran</TableHeaderCell>
          <TableHeaderCell>Jumlah Pembayaran</TableHeaderCell>
          <TableHeaderCell className="text-center">Status</TableHeaderCell>
          {selectStatus === "Pending" && (
            <TableHeaderCell className="text-center">Action</TableHeaderCell>
          )}
        </TableHeader>

        <TableBody>
          {!loading && initialValues && initialValues.length > 0 && initialValues.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                    {item.booking.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="font-medium">{item.booking.user.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>{item.payment_method}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium text-gray-900 dark:text-white">
                  Rp {new Intl.NumberFormat("id-ID").format(Number(item.jumlah_pembayaran))}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <StatusBadge status={item.status}/>
              </TableCell>
              {selectStatus === "Pending" && (
                <TableActionCell>
                  <ActionButton
                    icon={<CheckCircle size={18}/>}
                    label="Confirm"
                    onClick={() => onConfirm(item.uuid)}
                    variant="success"
                  />
                  <ActionButton
                    icon={<XCircle size={18}/>}
                    label="Cancel"
                    onClick={() => onCancel(item.uuid)}
                    variant="danger"
                  />
                </TableActionCell>
              )}
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

export default PaymentsTable
