"use client"
import type {SelectFlight} from "@/types/flight"
import type React from "react"
import getCurrentDateTime from "@/lib/nowDate"
import {useState} from "react"
import toast, {Toaster} from "react-hot-toast"
import {ErrorAxios} from "@/lib/axios-error";
import axios from "axios";

interface IEditFlightProps {
  isOpen: boolean
  onClose: () => void
  loading: boolean
  initialValues: SelectFlight
}

export default function EditFlight({isOpen, onClose, loading, initialValues}: IEditFlightProps) {
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<SelectFlight>(initialValues)
  // Convert the array of seat classes to an object for easier handling
  const [selectedClassesObj, setSelectedClassesObj] = useState<Record<string, boolean>>(() => {
    const classObj: Record<string, boolean> = {
      Economy: false,
      Business: false,
      FirstClass: false,
    }

    // Set initial values based on the seatClasses array
    initialValues.seatClasses.forEach((cls) => {
      classObj[cls.type] = cls.active
    })

    return classObj
  })

  const handleClassChange = (className: "Economy" | "Business" | "FirstClass") => {
    setSelectedClassesObj((prev) => ({
      ...prev,
      [className]: !prev[className],
    }))

    // Update the formData seatClasses when toggling a class
    setFormData((prev) => {
      const updatedSeatClasses = [...(prev.seatClasses || [])]
      const classIndex = updatedSeatClasses.findIndex((cls) => cls.type === className)

      if (classIndex >= 0) {
        // Toggle the active state if the class exists
        updatedSeatClasses[classIndex] = {
          ...updatedSeatClasses[classIndex],
          active: !selectedClassesObj[className],
        }
      } else {
        // Add the class if it doesn't exist
        updatedSeatClasses.push({
          type: className,
          harga: "0",
          active: true,
        })
      }

      return {
        ...prev,
        seatClasses: updatedSeatClasses,
      }
    })
  }

  const handleSeatClassPriceChange = (className: string, price: string) => {
    setFormData((prev) => {
      const updatedSeatClasses = [...(prev.seatClasses || [])]
      const classIndex = updatedSeatClasses.findIndex((cls) => cls.type === className)

      if (classIndex >= 0) {
        // Update the price if the class exists
        updatedSeatClasses[classIndex] = {
          ...updatedSeatClasses[classIndex],
          harga: price,
        }
      } else {
        // Add the class if it doesn't exist
        updatedSeatClasses.push({
          type: className as "Economy" | "Business" | "FirstClass",
          harga: price,
          active: true,
        })
      }

      return {
        ...prev,
        seatClasses: updatedSeatClasses,
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Helper function to find the price of a specific seat class
  const getClassPrice = (className: string): string => {
    const classData = formData.seatClasses?.find((cls) => cls.type === className)
    return classData?.harga || ""
  }

  const handleSubmit = async (data: SelectFlight) => {
    // Filter only active seat classes for submission
    const activeSeatClasses = data.seatClasses.filter((cls) => selectedClassesObj[cls.type])

    // Validate that at least one seat class is selected
    if (activeSeatClasses.length === 0) {
      setErrorMessage({error: "Minimal satu kelas kursi harus dipilih"})
      return
    }

    const updateData = {
      no_penerbangan: data.no_penerbangan,
      kota_keberangkatan: data.kota_keberangkatan,
      kota_tujuan: data.kota_tujuan,
      waktu_keberangkatan: getCurrentDateTime(data.waktu_keberangkatan),
      waktu_kedatangan: getCurrentDateTime(data.waktu_kedatangan),
      kapasitas_kursi: data.kapasitas_kursi,
      kursi_tersedia: data.kursi_tersedia,
      seatClasses: activeSeatClasses,
    }

    console.log({updateData})
    try {
      const response = await axios.put(`/api/flights/update/${data.uuid}`, updateData);

      if (response.status === 200) {
        toast.success("Berhasil Mengubah Data Flight")
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error) {
      const err = ErrorAxios(error);

      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>)
      } else {
        setErrorMessage({error: err})
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster position="top-right" reverseOrder={false}/>
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md bg-white max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Flight</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No Penerbangan</label>
            <input
              type="text"
              name="no_penerbangan"
              value={formData.no_penerbangan}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan Nomor Penerbangan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kota Keberangkatan</label>
            <input
              type="text"
              name="kota_keberangkatan"
              value={formData.kota_keberangkatan}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan Kota Keberangkatan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kota Tujuan</label>
            <input
              type="text"
              name="kota_tujuan"
              value={formData.kota_tujuan}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan Kota Tujuan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Keberangkatan</label>
            <input
              type="datetime-local"
              name="waktu_keberangkatan"
              value={formData.waktu_keberangkatan.slice(0, 16)}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Kedatangan</label>
            <input
              type="datetime-local"
              name="waktu_kedatangan"
              value={formData.waktu_kedatangan.slice(0, 16)}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas Kursi</label>
            <input
              type="number"
              name="kapasitas_kursi"
              value={formData.kapasitas_kursi}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan Kapasitas Kursi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kursi Tersedia</label>
            <input
              type="number"
              name="kursi_tersedia"
              value={formData.kursi_tersedia}
              onChange={handleChange}
              min="1"
              max={formData.kapasitas_kursi}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan Kursi Tersedia"
            />
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium text-gray-800 mb-3">Kelas Kursi</h3>
            <p className="text-sm text-gray-500 mb-3">
              Pilih kelas kursi yang tersedia dan tentukan harga untuk masing-masing kelas
            </p>

            <div className="space-y-4">
              {/* Economy Class */}
              <div
                className={`border rounded-md p-3 bg-white ${selectedClassesObj.Economy ? "border-blue-500 ring-1 ring-blue-500" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="economy-class-edit"
                      checked={selectedClassesObj.Economy}
                      onChange={() => handleClassChange("Economy")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="economy-class-edit" className="ml-2 block text-sm font-medium text-gray-700">
                      Economy Class
                    </label>
                  </div>

                  {selectedClassesObj.Economy && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Rp</span>
                      <input
                        type="text"
                        value={getClassPrice("Economy")}
                        onChange={(e) => handleSeatClassPriceChange("Economy", e.target.value)}
                        className="w-28 px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Harga"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Business Class */}
              <div
                className={`border rounded-md p-3 bg-white ${selectedClassesObj.Business ? "border-blue-500 ring-1 ring-blue-500" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="business-class-edit"
                      checked={selectedClassesObj.Business}
                      onChange={() => handleClassChange("Business")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="business-class-edit" className="ml-2 block text-sm font-medium text-gray-700">
                      Business Class
                    </label>
                  </div>

                  {selectedClassesObj.Business && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Rp</span>
                      <input
                        type="text"
                        value={getClassPrice("Business")}
                        onChange={(e) => handleSeatClassPriceChange("Business", e.target.value)}
                        className="w-28 px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Harga"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* First Class */}
              <div
                className={`border rounded-md p-3 bg-white ${selectedClassesObj.FirstClass ? "border-blue-500 ring-1 ring-blue-500" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="firstclass-class-edit"
                      checked={selectedClassesObj.FirstClass}
                      onChange={() => handleClassChange("FirstClass")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="firstclass-class-edit" className="ml-2 block text-sm font-medium text-gray-700">
                      First Class
                    </label>
                  </div>

                  {selectedClassesObj.FirstClass && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Rp</span>
                      <input
                        type="text"
                        value={getClassPrice("FirstClass")}
                        onChange={(e) => handleSeatClassPriceChange("FirstClass", e.target.value)}
                        className="w-28 px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Harga"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {errorMessage.error && (
            <p className="text-left text-red-500 text-sm bg-red-50 p-2 rounded-md border border-red-200">
              {errorMessage.error}
            </p>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(formData)}
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
