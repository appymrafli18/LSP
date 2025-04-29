"use client"
import {useCallback, useEffect, useState, useRef, FormEvent} from "react"
import type React from "react"

import UserTable from "@/components/table/UserTable"
import LayoutDashboard from "@/components/LayoutDashboard"
import type {USER} from "@/types/user"
import axios from "axios"
import {ErrorAxios} from "@/lib/axios-error"
import EditUser from "@/components/modal/EditUser"
import toast, {Toaster} from "react-hot-toast"
import AddUser from "@/components/modal/AddUser"
import {ChevronDown, Plus, Users} from "lucide-react"

const Page: React.FC = () => {
  const [users, setUsers] = useState<USER[] | null>(null)
  const [selectedUser, setSelectedUser] = useState<USER | null>(null)
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [selectedRole, setSelectedRole] = useState<string>("User")
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const roles = [
    {value: "Admin", label: "Admin"},
    {value: "User", label: "User"},
    {value: "Maskapai", label: "Maskapai"},
  ]

  const initialData = useCallback(async (values = "User") => {
    setErrorMessage({})
    setLoading(true)

    try {
      const response = await axios.get(`/api/user/all/${values}`)
      if (response.status === 200 && response.data.data.length !== 0) {
        setUsers(response.data.data)
      } else {
        setErrorMessage({error: "Tidak memiliki data user"})
      }
    } catch (error) {
      const err = ErrorAxios(error)
      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>)
      } else {
        setErrorMessage({error: err})
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const handleEdit = async (data: USER) => {
    setLoading(true)
    try {
      const response = await axios.put(`/api/user/update/${data.uuid}`, data)

      if (response.status === 200) {
        toast.success("Berhasil Update User")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      const err = ErrorAxios(error)
      if (typeof err === "object") {
        console.log(err)
      } else {
        console.log(err)
      }
      setLoading(false)
    }
  }

  const handleAdd = async (data: USER) => {
    setLoading(true)
    try {
      const result = await axios.post("/api/user/create", data)
      if (result.status === 201) {
        toast.success("Berhasil Tambah User")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      setIsAdd(true)
      const err = ErrorAxios(error)
      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>)
      } else {
        setErrorMessage({error: err})
      }
      setLoading(false)
    }
  }

  const onEdit = (selectUser: USER) => {
    setIsOpen(true)
    setSelectedUser(selectUser)
  }

  const onDelete = (uuid: string) => {
    axios
      .delete(`/api/user/delete/${uuid}`)
      .then(() => {
        toast.success("Berhasil Delete User")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch(() => {
        alert("Gagal Menghapus Users")
      })
  }

  const onAdd = () => {
    setIsAdd(true)
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    initialData(role)
    setDropdownOpen(false)
  }

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    const email = formData.get("email");

    try {
      if (email) params.append("email", email as string);
      if (selectedRole) params.append("role", selectedRole as string);
      let response;

      if (email) {
        response = await axios.get(`/api/user/filter?${params.toString()}`);
      } else {
        response = await axios.get(`/api/user/all/${selectedRole}`);
      }

      if (response.status === 200 && response.data.data.length > 0) {
        setUsers(response.data.data);
        setErrorMessage({});
      } else {
        setUsers([]);
        setErrorMessage({error: response.data.message});
      }
      setLoading(false);
    } catch (error) {
      const err = ErrorAxios(error);
      setUsers([]);
      setLoading(false);
      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>)
      } else {
        setErrorMessage({error: err})
      }
    } finally {
      setLoading(false);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    initialData()
  }, [initialData])

  return (
    <LayoutDashboard>
      <div>
        <Toaster position="top-right" reverseOrder={false}/>
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6 text-gray-700 dark:text-gray-300"/>
            Manage Users
          </h1>
          <div className="flex gap-x-4 items-center">
            {/* Custom Select Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-40 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span className="block truncate font-medium text-gray-700 dark:text-gray-200">{selectedRole}</span>
                <ChevronDown
                  className={`ml-2 h-4 w-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "transform rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 py-1 animate-in fade-in slide-in-from-top-5 duration-200">
                  <ul className="max-h-60 overflow-auto py-1 text-base" role="listbox">
                    {roles.map((role) => (
                      <li
                        key={role.value}
                        className={`cursor-pointer select-none relative py-2.5 px-4 hover:bg-blue-50 dark:hover:bg-gray-700 ${selectedRole === role.value ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium" : "text-gray-700 dark:text-gray-200"}`}
                        onClick={() => handleRoleSelect(role.value)}
                        role="option"
                        aria-selected={selectedRole === role.value}
                      >
                        <span className="block truncate">{role.label}</span>
                        {selectedRole === role.value && (
                          <span
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <form className="flex gap-2 items-center" onSubmit={handleSubmitForm}>
                <input type="text" name="email" placeholder="Email user ..."
                       className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search
                </button>
              </form>

              <button
                className="flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 px-6 py-2.5 text-white font-medium transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={() => onAdd()}
              >
                <Plus className="h-4 w-4 mr-1.5"/>
                Create
              </button>
            </div>
          </div>
        </div>
        <UserTable users={users} loading={loading} onEdit={onEdit} onDelete={onDelete} errorMessage={errorMessage}/>
        <div>
          <Toaster position="top-right" reverseOrder={false}/>
        </div>
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
  )
}

export default Page
