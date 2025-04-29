"use client"
import {ErrorAxios} from "@/lib/axios-error"
import {useState} from "react"
import Link from "next/link"
import toast, {Toaster} from "react-hot-toast"
import type {REGISTER} from "@/types/user"
import FormComponent from "@/components/form/FormComponent"
import InputField from "@/components/input/InputField"
import axios from "axios"
import {User, AtSign, Mail, Lock, KeyRound, ArrowLeft, Loader2} from "lucide-react"

const Page = () => {
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(false)

  const initialValues: REGISTER = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const handleSubmit = async (data: REGISTER) => {
    setErrorMessage({})
    setLoading(true)
    console.log("submitted:", data)

    try {
      const response = await axios.post("/api/auth/register", data)

      if (response.status === 201) {
        toast.success("Berhasil Register")
        setTimeout(() => {
          window.location.href = "/login"
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
              <User className="h-8 w-8 text-white"/>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <p className="text-sky-100 text-center mt-1 text-sm">Join us today and start your journey</p>
        </div>

        <div className="p-8">
          <FormComponent<REGISTER>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            buttonLoading={loading}
            submitLabel={loading ? "Creating account..." : "Sign Up"}
            buttonStyle="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {({formData, handleChange}) => (
              <>
                <div className="space-y-5">
                  <div className="relative">
                    <InputField
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      errors={errorMessage?.name}
                      required
                      labelStyle="text-gray-700 dark:text-gray-300 font-medium mb-1 block"
                      inputStyle="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-3 top-[38px] h-5 w-5 text-gray-400"/>
                  </div>

                  <div className="relative">
                    <InputField
                      label="Username"
                      name="username"
                      onChange={handleChange}
                      value={formData.username}
                      errors={errorMessage?.username}
                      required
                      labelStyle="text-gray-700 dark:text-gray-300 font-medium mb-1 block"
                      inputStyle="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      placeholder="Choose a username"
                    />
                    <AtSign className="absolute left-3 top-[38px] h-5 w-5 text-gray-400"/>
                  </div>

                  <div className="relative">
                    <InputField
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      errors={errorMessage?.email}
                      required
                      type="email"
                      labelStyle="text-gray-700 dark:text-gray-300 font-medium mb-1 block"
                      inputStyle="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      placeholder="Enter your email address"
                    />
                    <Mail className="absolute left-3 top-[38px] h-5 w-5 text-gray-400"/>
                  </div>

                  <div className="relative">
                    <InputField
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      errors={errorMessage?.password}
                      required
                      type="password"
                      labelStyle="text-gray-700 dark:text-gray-300 font-medium mb-1 block"
                      inputStyle="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      placeholder="Create a password"
                    />
                    <Lock className="absolute left-3 top-[38px] h-5 w-5 text-gray-400"/>
                  </div>

                  <div className="relative">
                    <InputField
                      label="Confirm Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                      errors={errorMessage?.confirmPassword}
                      required
                      type="password"
                      labelStyle="text-gray-700 dark:text-gray-300 font-medium mb-1 block"
                      inputStyle="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      placeholder="Confirm your password"
                    />
                    <KeyRound className="absolute left-3 top-[38px] h-5 w-5 text-gray-400"/>
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
              </>
            )}
          </FormComponent>

          <div className="mt-6 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1"/>
              Kembali
            </Link>
            <Link
              href="/login"
              className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 text-sm font-medium transition-colors"
            >
              Already have an account? Sign In
            </Link>
          </div>
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
