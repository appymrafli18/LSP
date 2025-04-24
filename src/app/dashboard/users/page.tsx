"use client";
import { useCallback, useEffect, useState } from "react";
import UserTable from "@/components/table/UserTable";
import LayoutDashboard from "@/components/LayoutDashboard";
import { USER } from "@/types/user";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import EditUser from "@/components/modal/EditUser";
import toast, { Toaster } from "react-hot-toast";
import AddUser from "@/components/modal/AddUser";
const Page: React.FC = () => {
  const [users, setUsers] = useState<USER[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<USER | null>(null);
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const initialData = useCallback(async (values: string = "User") => {
    setErrorMessage({});
    setLoading(true);

    try {
      const response = await axios.get(`/api/user/all/${values}`);
      if (response.status === 200 && response.data.data.length !== 0) {
        setUsers(response.data.data);
      } else {
        setErrorMessage({ error: "Tidak memiliki data user" });
      }
    } catch (error) {
      const err = ErrorAxios(error);
      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>);
      } else {
        setErrorMessage({ error: err });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = async (data: USER) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/user/update/${data.uuid}`, data);

      if (response.status === 200) {
        toast.success("Berhasil Update User");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      const err = ErrorAxios(error);
      if (typeof err === "object") {
        console.log(err);
      } else {
        console.log(err);
      }
      setLoading(false);
    }
  };

  const handleAdd = async (data: USER) => {
    setLoading(true);
    try {
      const result = await axios.post("/api/user/create", data);
      if (result.status === 201) {
        toast.success("Berhasil Tambah User");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setIsAdd(true);
      const err = ErrorAxios(error);
      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>);
      } else {
        setErrorMessage({ error: err });
      }
      setLoading(false);
    }
  };

  const onEdit = (selectUser: USER) => {
    setIsOpen(true);
    setSelectedUser(selectUser);
  };

  const onDelete = (uuid: string) => {
    axios
      .delete(`/api/user/delete/${uuid}`)
      .then(() => {
        toast.success("Berhasil Delete User");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        alert("Gagal Menghapus Users");
      });
  };

  const onAdd = () => {
    setIsAdd(true);
  };

  useEffect(() => {
    initialData();
  }, [initialData]);

  return (
    <LayoutDashboard>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <div className="flex gap-x-4">
            <select
              name="type"
              defaultValue="User"
              onChange={(e) => initialData(e.target.value)}
              className="block p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Maskapai">Maskapai</option>
            </select>
            <button
              className="mr-2 rounded bg-green-500 hover:bg-green-600 px-6 py-2 text-white"
              onClick={() => onAdd()}
            >
              Create
            </button>
          </div>
        </div>
        <UserTable
          users={users}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
          errorMessage={errorMessage}
        />
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        {errorMessage && (
          <p className="text-center p-4">{errorMessage?.error}</p>
        )}
      </div>
      {isOpen && (
        <EditUser
          handleSubmit={handleEdit}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          loading={loading}
          title="Users"
          initialValue={selectedUser}
        />
      )}
      {isAdd && (
        <AddUser
          isOpen={isAdd}
          errorMessage={errorMessage}
          handleSubmit={handleAdd}
          onClose={() => setIsAdd(false)}
          loading={loading}
          title="Users"
        />
      )}
    </LayoutDashboard>
  );
};

export default Page;
