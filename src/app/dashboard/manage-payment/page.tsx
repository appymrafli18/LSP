"use client"
import LayoutDashboard from "@/components/LayoutDashboard"
import PaymentsTable from "@/components/table/PaymentsTable"
import toast, {Toaster} from "react-hot-toast"
import type React from "react"
import {useCallback, useEffect, useState, useRef} from "react"
import type {PAYMENT} from "@/types/payment"
import {ErrorAxios} from "@/lib/axios-error"
import axios from "axios"
import {ChevronDown, CreditCard} from "lucide-react"

const Page: React.FC = () => {
  const [data, setData] = useState<PAYMENT[] | null>(null)
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending")
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const statuses = [
    {value: "Confirmed", label: "Confirmed"},
    {value: "Pending", label: "Pending"},
    {value: "Cancelled", label: "Cancelled"},
  ]

  const initialValues = useCallback(async () => {
    setLoading(true)
    setErrorMessage({})
    try {
      const response = await axios.get(`/api/payments/all/${selectedStatus}`)

      if (response.status === 200) {
        setData(response.data.data)

        if (response.data.data.length === 0) {
          setErrorMessage({error: `Tidak memiliki data pembayaran`})
        }
      }
    } catch (error) {
      const err = ErrorAxios(error)

      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>)
      } else {
        const msgError = err || "Tidak Memiliki data pembayaran"
        setErrorMessage({error: msgError})
      }
    } finally {
      setLoading(false)
    }
  }, [selectedStatus])

  const onConfirm = async (uuid: string) => {
    try {
      const response = await axios.put(`/api/payments/update/${uuid}`, {
        status: "Confirmed",
      })

      if (response.status === 200) {
        toast.success("Berhasil Konfirmasi Pembayaran")
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onCancel = async (uuid: string) => {
    try {
      const response = await axios.put(`/api/payments/update/${uuid}`, {
        status: "Cancelled",
      })

      if (response.status === 200) {
        toast.success("Berhasil Batalkan Pembayaran")

        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status)
    setDropdownOpen(false)
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
    initialValues()
  }, [initialValues])

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
      case "Pending":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
      case "Cancelled":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  return (
    <LayoutDashboard>
      <div>
        <Toaster position="top-right" reverseOrder={false}/>
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <CreditCard className="mr-2 h-6 w-6 text-gray-700 dark:text-gray-300"/>
            Payments
          </h1>

          {/* Custom Select Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-40 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span
                className={`flex items-center font-medium ${getStatusColor(selectedStatus)} px-2 py-0.5 rounded-full text-sm`}
              >
                {selectedStatus}
              </span>
              <ChevronDown
                className={`ml-2 h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 py-1 animate-in fade-in slide-in-from-top-5 duration-200">
                <ul className="max-h-60 overflow-auto py-1 text-base" role="listbox">
                  {statuses.map((status) => (
                    <li
                      key={status.value}
                      className={`cursor-pointer select-none relative py-2.5 px-4 hover:bg-blue-50 dark:hover:bg-gray-700 ${
                        selectedStatus === status.value
                          ? "bg-blue-50 dark:bg-gray-700 font-medium"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                      onClick={() => handleStatusSelect(status.value)}
                      role="option"
                      aria-selected={selectedStatus === status.value}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`block truncate px-2 py-0.5 rounded-full text-sm ${getStatusColor(status.value)}`}
                        >
                          {status.label}
                        </span>
                        {selectedStatus === status.value && (
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
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <PaymentsTable
          initialValues={data}
          loading={loading}
          errorMessage={errorMessage}
          onConfirm={onConfirm}
          onCancel={onCancel}
          selectStatus={selectedStatus}
        />
      </div>
    </LayoutDashboard>
  )
}

export default Page
