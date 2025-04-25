"use client"
import type React from "react"
import {useEffect, useState} from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import useMe from "@/store/me"
import {useRouter} from "next/navigation"

const LayoutDashboard = ({
                           children,
                         }: Readonly<{
  children: React.ReactNode
}>) => {
  const {user, setUser} = useMe()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      setUser()
      setLoading(true)
    } else {
      if (user.role === "User") router.push("/")
      setLoading(false)
    }
  }, [user, setUser, router])

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <div
            className="absolute top-0 left-0 animate-ping rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-white dark:bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return (window.location.href = "/login")

  if (user.role !== "User") {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar user={user}/>
        <div className="flex-1 overflow-x-hidden flex flex-col">
          <Navbar user={user}/>
          <main className="flex-1 p-6 bg-[url('/subtle-pattern.png')] bg-repeat bg-opacity-5">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    )
  }
}

export default LayoutDashboard
