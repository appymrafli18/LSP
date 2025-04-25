"use client"
import React, {useCallback, useEffect} from "react"
import StatsCard from "./StatsCard"
import axios from "axios"
import {ErrorAxios} from "@/lib/axios-error"
import useMe from "@/store/me"
import {Activity, Clock, AlertCircle} from "lucide-react"

interface ICount {
  count_user?: number
  count_booking: number
  count_flights: number
  count_revenue: number
  activity?: Record<string, string | number>[]
}

const AdminDashboard: React.FC = () => {
  const [count, setCount] = React.useState<ICount>({
    count_user: 0,
    count_booking: 0,
    count_flights: 0,
    count_revenue: 0,
  })
  const [loading, setLoading] = React.useState<boolean>(false)
  const {user} = useMe()

  const valueTimestampConvert = (values: string) => {
    return new Date(values).toLocaleString("id-ID", {
      weekday: "short", // e.g., "Tue"
      year: "numeric", // e.g., "2025"
      month: "short", // e.g., "Apr"
      day: "numeric", // e.g., "25"
      hour: "numeric", // e.g., "12"
      minute: "numeric", // e.g., "21"
      second: "numeric", // e.g., "53"
      hour12: false, // 24-hour clock
    })
  }

  const handleView = useCallback(async () => {
    setLoading(true)

    try {
      if (user && user.role !== "User") {
        const requests =
          user.role === "Admin"
            ? [
              axios.get("/api/user/count"),
              axios.get("/api/bookings/count"),
              axios.get("/api/flights/count"),
              axios.get("/api/payments/count"),
              axios.get("/api/recently/all"),
            ]
            : [
              null,
              axios.get("/api/bookings/count"),
              axios.get("/api/flights/count"),
              axios.get("/api/payments/count"),
              null,
            ]

        const [userCount, bookingCount, flightCount, revenueCount, activity] = await Promise.all(requests)

        setCount({
          count_user: userCount?.data.data,
          count_booking: bookingCount?.data.data,
          count_flights: flightCount?.data.data,
          count_revenue: revenueCount?.data.data,
          activity: activity?.data.data,
        })
      }
    } catch (error) {
      const err = ErrorAxios(error)
      console.log(err)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [user])

  useEffect(() => {
    handleView();
  }, [handleView])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{user?.role} Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user && user.role === "Admin" && count && (
          <StatsCard title="Total Users" value={count.count_user?.toString() || "0"} loading={loading}/>
        )}
        {count && <StatsCard title="Total Booking" value={count.count_booking?.toString()} loading={loading}/>}
        {count && <StatsCard title="Total Flights" value={count.count_flights?.toString()} loading={loading}/>}
        {count && (
          <StatsCard
            title="Total Revenue"
            value={`Rp ${new Intl.NumberFormat("id-ID").format(Number(count.count_revenue))?.toString()}`}
            loading={loading}
          />
        )}
      </div>
      {user && user.role === "Admin" && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary"/>
            <h3 className="text-xl font-semibold">Recent Activities</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {count && count.activity && count.activity.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {count.activity.map((values, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary"/>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                        {values.message ? values.message : "No activity details available"}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                        {values.createdAt ? valueTimestampConvert(values.createdAt as string) : "Just now"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-10 w-10 text-gray-400 mb-2"/>
                <p className="text-gray-500 dark:text-gray-400">No recent activities found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
