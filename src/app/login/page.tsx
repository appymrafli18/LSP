"use client"
import FormComponent from "@/components/form/FormComponent"
import InputField from "@/components/input/InputField"
import {ErrorAxios} from "@/lib/axios-error"
import type {LOGIN} from "@/types/user"
import axios from "axios"
import {useState} from "react"
import toast, {Toaster} from "react-hot-toast"
import Link from "next/link"
import {Plane, Lock, Mail, ArrowLeft, Loader2} from "lucide-react"

const Page = () => {
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(false)

  const initialValues: LOGIN = {
    email: "",
    password: "",
  }

  const handleSubmit = async (data: LOGIN) => {
    setErrorMessage({})
    setLoading(true)
    try {
      const response = await axios.post("/api/auth/login", data)
      if (response.status === 200) {
        toast.success("Berhasil Login")
        setTimeout(() => {
          window.location.reload()
        }, 1500)
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
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-sky-600 dark:bg-sky-700 py-6 px-6 text-white">
          <div className="flex justify-center mb-3">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <Plane className="h-8 w-8 text-white"/>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-sky-100 text-center mt-1 text-sm">Sign in to your account</p>
        </div>

        <div className="p-8">
          <FormComponent<LOGIN>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            submitLabel={loading ? "Signing in..." : "Sign In"}
            buttonStyle="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            buttonLoading={loading}
          >
            {({formData, handleChange}) => (
              <>
                <div className="space-y-5">
                  <div className="relative">
                    <InputField
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      autoComplete={true}
                      placeholder="Enter your email"
                      required
                      errors={errorMessage?.email}
                      type="email"
                      labelStyle="text-gray-700 dark:text-gray-300 font-medium mb-1 block"
                      inputStyle="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                    />
                    <Mail className="absolute left-3 top-[38px] h-5 w-5 text-gray-400"/>
                  </div>

                  <div className="relative">
                    <InputField
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      autoComplete={true}
                      value={formData.password}
                      placeholder="Enter your password"
                      required
                      errors={errorMessage?.password}
                      type="password"
                      labelStyle="text-gray-700 dark:text-gray-300 font-medium mb-1 block"
                      inputStyle="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                    />
                    <Lock className="absolute left-3 top-[38px] h-5 w-5 text-gray-400"/>
                  </div>

                  {errorMessage?.error && (
                    <div
                      className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                      {errorMessage.error}
                    </div>
                  )}

                  {loading && (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 text-sky-600 animate-spin"/>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 text-sm font-medium transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1"/>
                    Kembali
                  </Link>
                  <Link
                    href="/register"
                    className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 text-sm font-medium transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </FormComponent>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#0ea5e9",
              color: "#fff",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />
    </div>
  )
}

export default Page
