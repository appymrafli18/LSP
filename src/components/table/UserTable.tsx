import { USER } from "@/types/user";
import React from "react";
import TempLoader from "../TempLoader";
import { Edit, Trash } from "lucide-react";

interface UserTableProps {
  users: USER[] | null;
  loading: boolean;
  errorMessage: Record<string, string>;
  onEdit: (selectUser: USER) => void;
  onDelete: (uuid: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  errorMessage,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200 text-sm leading-normal text-gray-600 uppercase">
            <th className="px-6 py-3 text-left">No</th>
            <th className="px-6 py-3 text-left">Nama</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        {!errorMessage.error && (
          <tbody className="text-sm font-light text-gray-600">
            {users &&
              users.map((user, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={index}
                >
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-left">{user.name}</td>
                  <td className="px-6 py-3 text-left">{user.email}</td>
                  <td className="px-6 py-3 text-left">{user.role}</td>
                  <td className="px-6 py-3 text-center flex justify-center gap-x-4">
                    <Edit
                      width={20}
                      className="text-blue-500 hover:cursor-pointer"
                      onClick={() => onEdit(user)}
                    />
                    <Trash
                      width={20}
                      className="text-red-500 hover:cursor-pointer"
                      onClick={() => onDelete(user.uuid as string)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>

      {loading && (
        <div className="flex justify-center">
          <TempLoader />
        </div>
      )}
    </div>
  );
};

export default UserTable;
