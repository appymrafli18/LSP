"use client"
import {ErrorAxios} from "@/lib/axios-error"
import type {USER} from "@/types/user"
import axios from "axios"
import type React from "react"
import {useState} from "react"
import Link from "next/link"

const Navbar: React.FC<{ user?: USER | null }> = ({user}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout")
      if (response.status === 200) window.location.href = "/";
    } catch (error) {
      const err = ErrorAxios(error)
      console.log(err)
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <div className="ml-4 h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              Welcome back, <span className="font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full bg-blue-500 blur-[1px] transform scale-110 opacity-30 group-hover:opacity-40 transition-opacity"></div>
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold relative shadow-md">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-1 z-50 border border-gray-100 dark:border-gray-700 overflow-hidden transform origin-top-right transition-all duration-200 animate-in fade-in-5 zoom-in-95">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{user?.email}</p>
                  </div>

                  <Link
                    href="/dashboard/profile"
                    className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-red-500 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
