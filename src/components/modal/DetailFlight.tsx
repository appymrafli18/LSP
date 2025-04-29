"use client"

import type React from "react"
import DetailModal from "./DetailModal"
import type {SelectFlight} from "@/types/flight"
import convertToRupiah from "@/lib/converterRupiah"
import Image from "next/image"
import timeArrival from "@/lib/timeArrival"

interface DetailFlightProps {
  isOpen: boolean
  onClose: () => void
  flight: SelectFlight
  loading?: boolean
}

const DetailFlight: React.FC<DetailFlightProps> = ({isOpen, onClose, flight, loading = false}) => {
  // Calculate flight duration
  const duration = timeArrival(flight.waktu_keberangkatan, flight.waktu_kedatangan)

  // Format dates for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      time: date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
      date: date.toLocaleDateString([], {weekday: "short", day: "numeric", month: "short", year: "numeric"}),
      full: date.toLocaleString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const departureDate = formatDate(flight.waktu_keberangkatan)
  const arrivalDate = formatDate(flight.waktu_kedatangan)

  // Calculate seat availability percentage
  const availabilityPercentage = Math.round((flight.kursi_tersedia / flight.kapasitas_kursi) * 100)
  const availabilityColor =
    availabilityPercentage > 60 ? "bg-green-500" : availabilityPercentage > 30 ? "bg-yellow-500" : "bg-red-500"

  // Get class-specific colors
  const getClassColor = (type: string) => {
    switch (type) {
      case "Economy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Business":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "FirstClass":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <DetailModal isOpen={isOpen} onClose={onClose} title="Flight Details" loading={loading}>
      <div className="space-y-8 py-2">
        {/* Header with airline info */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <Image
                src={`/img-airlines/${flight.airlines?.logo || "default-airline.png"}`}
                alt={flight.airlines?.name || "Airline"}
                className="w-12 h-12 object-contain"
                width={48}
                height={48}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{flight.airlines?.name || "Airline"}</h3>
              <div className="flex items-center mt-1">
                <span
                  className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                  {flight.no_penerbangan}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {flight.seatClasses && flight.seatClasses.length > 0
                ? convertToRupiah(Number(flight.seatClasses[0].harga))
                : "Price unavailable"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">starting price</div>
          </div>
        </div>

        {/* Seat Classes */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Available Seat Classes</h4>
          <div className="space-y-3">
            {flight.seatClasses &&
              flight.seatClasses.map((seatClass, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex items-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getClassColor(seatClass.type)}`}
                    >
                      {seatClass.type}
                    </span>
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {convertToRupiah(Number(seatClass.harga))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Flight route visualization */}
        <div className="relative py-6">
          <div className="flex justify-between items-start">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{departureDate.time}</div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{departureDate.date}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-[140px]">
                {flight.kota_keberangkatan}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center px-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{duration}</div>
              <div className="w-full flex items-center">
                <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600"></div>
                <div className="mx-2 w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600"></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Direct Flight</div>
            </div>

            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{arrivalDate.time}</div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{arrivalDate.date}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-[140px]">{flight.kota_tujuan}</div>
            </div>
          </div>

          {/* Airplane icon on the path */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500 dark:text-blue-400 transform rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </div>
        </div>

        {/* Seat availability */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Seat Availability</h4>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${availabilityPercentage > 60 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : availabilityPercentage > 30 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
            >
              {availabilityPercentage}% Available
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
            <div
              className={`h-2.5 rounded-full ${availabilityColor}`}
              style={{width: `${availabilityPercentage}%`}}
            ></div>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Available: </span>
              <span className="font-medium text-gray-900 dark:text-white">{flight.kursi_tersedia}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Total Capacity: </span>
              <span className="font-medium text-gray-900 dark:text-white">{flight.kapasitas_kursi}</span>
            </div>
          </div>
        </div>

        {/* Flight details in cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Departure Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Date & Time</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{departureDate.full}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{flight.kota_keberangkatan}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Arrival Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Date & Time</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{arrivalDate.full}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{flight.kota_tujuan}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailModal>
  )
}

export default DetailFlight
