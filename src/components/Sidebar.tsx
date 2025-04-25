import type React from "react"
import Link from "next/link"
import type {USER} from "@/types/user"
import Image from "next/image"
import {Bookmark, DollarSign, Fan, LayoutDashboard, PlaneTakeoff, TableProperties} from "lucide-react"

const listSidebar = [
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard size={18}/>,
    allowedRoles: ["Admin", "Maskapai"],
  },
  {
    url: "/dashboard/users",
    title: "Users",
    icon: <TableProperties size={18}/>,
    allowedRoles: ["Admin"],
  },
  {
    url: "/dashboard/manage-airlines",
    title: "Airlines",
    icon: <Fan size={18}/>,
    allowedRoles: ["Admin"],
  },
  {
    url: "/dashboard/manage-flight",
    title: "Flight",
    icon: <PlaneTakeoff size={18}/>,
    allowedRoles: ["Admin", "Maskapai"],
  },
  {
    url: "/dashboard/manage-booking",
    title: "Booking",
    icon: <Bookmark size={18}/>,
    allowedRoles: ["Admin", "Maskapai"],
  },
  {
    url: "/dashboard/manage-payment",
    title: "Payments",
    icon: <DollarSign size={18}/>,
    allowedRoles: ["Admin"],
  },
]

const Sidebar: React.FC<{ user?: USER | null }> = ({user}) => {
  // Function to check if the current path matches the menu item
  const isActive = (path: string) => {
    if (typeof window !== "undefined") {
      return window.location.pathname === path
    }
    return false
  }

  return (
    <div
      className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-lg border-r border-gray-100 dark:border-gray-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-500/5"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-blue-500/5"></div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-8 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md"></div>
            <Image alt="logo" src={`/logo-eticketing-no-bg.png`} width={50} height={50} className="relative z-10"/>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            E-Ticketing
          </h1>
        </div>

        <div className="flex items-center mb-6">
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
          <p className="px-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Menu</p>
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
        </div>

        <ul className="space-y-1">
          {listSidebar
            .filter((item) => user?.role && item.allowedRoles.includes(user.role))
            .map((values, index) => {
              const active = isActive(values.url)
              return (
                <li key={index}>
                  <Link
                    href={values.url}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative
                      ${
                      active
                        ? "bg-blue-500 text-white font-medium shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {/* Icon background */}
                    {!active && (
                      <span
                        className="absolute left-4 w-6 h-6 rounded-full bg-blue-100 dark:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    )}

                    {/* Icon */}
                    <span
                      className={`relative z-10 ${active ? "text-white" : "text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300"}`}
                    >
                      {values?.icon}
                    </span>

                    {/* Text */}
                    <span className="relative z-10">{values.title}</span>

                    {/* Active indicator */}
                    {active && <span className="absolute right-3 w-2 h-2 rounded-full bg-white"></span>}
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
