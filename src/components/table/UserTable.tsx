import {USER} from "@/types/user"
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

interface UserTableProps {
  users: USER[] | null
  loading: boolean
  errorMessage: Record<string, string>
  onEdit: (selectUser: USER) => void
  onDelete: (uuid: string) => void
}

const UserTable: React.FC<UserTableProps> = ({users, loading, errorMessage, onEdit, onDelete}) => {
  return (
    <TableBase>
      <table className="w-full">
        <TableHeader>
          <TableHeaderCell>No</TableHeaderCell>
          <TableHeaderCell>Nama</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell className="text-center">Action</TableHeaderCell>
        </TableHeader>

        {!errorMessage.error && (
          <TableBody>
            {!loading && users && users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-medium">{user.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {user.role}
                  </div>
                </TableCell>
                <TableActionCell>
                  <ActionButton
                    icon={<Edit size={18}/>}
                    label="Edit"
                    onClick={() => onEdit(user)}
                    variant="primary"
                  />
                  <ActionButton
                    icon={<Trash size={18}/>}
                    label="Delete"
                    onClick={() => onDelete(user.uuid as string)}
                    variant="danger"
                  />
                </TableActionCell>
              </TableRow>
            ))}
          </TableBody>
        )}
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

export default UserTable
