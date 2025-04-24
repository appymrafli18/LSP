"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { SelectFlight } from "@/types/flight";
import timeArrival from "@/lib/timeArrival";
import toast, { Toaster } from "react-hot-toast";
import NavbarLandingPage from "./NavbarList/NavbarLandingPage";

const Checkout = ({ paramsUUID }: { paramsUUID: string }) => {
  const [flight, setFlight] = useState<SelectFlight>();
  const [activeStep, setActiveStep] = useState(1);
  const [totalOrang, setTotalOrang] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    const total = Number(flight?.harga);
    return total;
  };

  const handleNextStep = (kursi_tersedia: number) => {
    if (activeStep < 3) {
      if (totalOrang > kursi_tersedia) return;
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleCompleteBooking = async () => {
    try {
      const createBooking = await axios.post("/api/bookings/create", {
        flightId: flight?.uuid,
        jumlah_kursi: totalOrang,
      });

      const bookingData = createBooking.data;

      const hitApiCreatePayment = await axios.post("/api/payments/create", {
        payment_method: paymentMethod,
        bookingId: bookingData.data.booking_uuid,
      });

      if (hitApiCreatePayment.status === 201) {
        toast.success("Pembelian Ticket Pesawat telah berhasil.");

        setTimeout(() => {
          window.location.href = "/suclog/my-tickets";
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/flights/select/${paramsUUID}`)
      .then((res) => setFlight(res.data.data))
      .catch(() => (window.location.href = "/"));
  }, [paramsUUID]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavbarLandingPage />
      <Toaster position="top-right" reverseOrder={false} />

      <main className="pt-[4.5rem]">
        {/* Checkout Header */}
        <div className="bg-blue-600 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">
              Complete Your Booking
            </h1>
            <p className="text-blue-100 mt-2">
              Youre just a few steps away from your trip to{" "}
              {flight?.kota_tujuan.split("(")[0]}
            </p>
          </div>
        </div>

        {/* Checkout Progress */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <span className="text-sm mt-2 font-medium">Flights</span>
            </div>

            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full ${
                  activeStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                }`}
                style={{ width: activeStep >= 2 ? "100%" : "0%" }}
              ></div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span className="text-sm mt-2 font-medium">Add-ons</span>
            </div>

            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full ${
                  activeStep >= 3 ? "bg-blue-600" : "bg-gray-200"
                }`}
                style={{ width: activeStep >= 3 ? "100%" : "0%" }}
              ></div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        {/* Main Checkout Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                {/* Flight Summary - Always visible */}
                <div className="border-b pb-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Flight Summary
                  </h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="px-2 py-1 text-xs font-normal bg-blue-50 text-blue-700 border border-blue-200 rounded-full mr-2">
                          {flight?.no_penerbangan}
                        </span>
                        <span className="text-sm text-gray-500">
                          {flight?.airlines.name}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="mr-4">
                          <p className="text-lg font-bold">
                            {flight &&
                              `${new Date(
                                flight?.waktu_keberangkatan
                              ).getHours()}:${new Date(
                                flight?.waktu_keberangkatan
                              ).getMinutes()}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight?.kota_keberangkatan}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight &&
                              new Date(
                                flight.waktu_keberangkatan
                              ).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                          </p>
                        </div>
                        <div className="flex flex-col items-center mx-2">
                          <div className="text-xs text-gray-500 mb-1">
                            {flight &&
                              timeArrival(
                                flight.waktu_keberangkatan,
                                flight.waktu_kedatangan
                              )}
                          </div>
                          <div className="w-20 flex items-center">
                            <div className="h-[2px] flex-1 bg-gray-300"></div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400 mx-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                            <div className="h-[2px] flex-1 bg-gray-300"></div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-bold">
                            {flight &&
                              `${new Date(
                                flight.waktu_kedatangan
                              ).getHours()}:${new Date(
                                flight.waktu_kedatangan
                              ).getMinutes()}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight?.kota_tujuan}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight &&
                              new Date(
                                flight.waktu_kedatangan
                              ).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {activeStep === 1 && (
                  <div className="mb-6">
                    <label
                      htmlFor="totalOrang"
                      className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Total Orang
                    </label>
                    <input
                      id="totalOrang"
                      type="number"
                      placeholder="Total Orang"
                      value={totalOrang}
                      onChange={(e) => {
                        if (Number(e.target.value) > 0) {
                          setTotalOrang(Number(e.target.value));
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {flight && totalOrang > flight.kursi_tersedia && (
                      <p className="text-red-500 text-sm mt-2">
                        Kursi Yang Tersedia Hanya {flight.kursi_tersedia}
                      </p>
                    )}
                  </div>
                )}

                {/* Step 3: Payment */}
                {activeStep === 3 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Payment Details
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                          Payment Method
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-colors
                              ${
                                paymentMethod === "credit-card"
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }
                            `}
                            onClick={() => setPaymentMethod("credit-card")}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-gray-500 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                  />
                                </svg>
                                <span className="font-medium">Credit Card</span>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border ${
                                  paymentMethod === "credit-card"
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-300"
                                } flex items-center justify-center`}
                              >
                                {paymentMethod === "credit-card" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-colors
                              ${
                                paymentMethod === "bank-transfer"
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }
                            `}
                            onClick={() => setPaymentMethod("bank-transfer")}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-gray-500 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                  />
                                </svg>
                                <span className="font-medium">
                                  Bank Transfer
                                </span>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border ${
                                  paymentMethod === "bank-transfer"
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-300"
                                } flex items-center justify-center`}
                              >
                                {paymentMethod === "bank-transfer" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-colors
                              ${
                                paymentMethod === "e-wallet"
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }
                            `}
                            onClick={() => setPaymentMethod("e-wallet")}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-gray-500 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="font-medium">E-Wallet</span>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border ${
                                  paymentMethod === "e-wallet"
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-300"
                                } flex items-center justify-center`}
                              >
                                {paymentMethod === "e-wallet" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Credit Card Form */}
                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter name as it appears on card"
                            />
                          </div>
                        </div>
                      )}

                      {/* Bank Transfer Instructions */}
                      {paymentMethod === "bank-transfer" && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 mb-4">
                            Please transfer the total amount to the following
                            bank account:
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bank Name:</span>
                              <span className="font-medium">
                                Bank Central Asia (BCA)
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Account Number:
                              </span>
                              <span className="font-medium">1234567890</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Account Name:
                              </span>
                              <span className="font-medium">
                                PT FlightBooker Indonesia
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-4">
                            Please complete the payment within 24 hours. Your
                            booking will be confirmed once payment is verified.
                          </p>
                        </div>
                      )}

                      {/* E-Wallet Options */}
                      {paymentMethod === "e-wallet" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-blue-500 transition-colors">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                <span className="text-blue-600 font-bold">
                                  GP
                                </span>
                              </div>
                              <span className="text-sm">GoPay</span>
                            </div>
                            <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-blue-500 transition-colors">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                <span className="text-green-600 font-bold">
                                  OV
                                </span>
                              </div>
                              <span className="text-sm">OVO</span>
                            </div>
                            <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-blue-500 transition-colors">
                              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                <span className="text-purple-600 font-bold">
                                  DN
                                </span>
                              </div>
                              <span className="text-sm">DANA</span>
                            </div>
                            <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-blue-500 transition-colors">
                              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                                <span className="text-red-600 font-bold">
                                  LP
                                </span>
                              </div>
                              <span className="text-sm">LinkAja</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">
                            You will be redirected to the selected e-wallet
                            service to complete your payment.
                          </p>
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="terms"
                            className="ml-2 text-sm text-gray-700"
                          >
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {activeStep > 1 ? (
                    <button
                      onClick={handlePrevStep}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {activeStep < 3 ? (
                    <button
                      onClick={() => handleNextStep(flight?.kursi_tersedia ?? 0)}
                      className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${totalOrang > (flight?.kursi_tersedia ?? 0) ? 'opacity-50 cursor-not-allowed': ''}`}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleCompleteBooking}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Complete Booking
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between pb-4 border-b">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="font-medium">
                      {flight && formatPrice(Number(flight.harga))}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Tickets</span>
                    <span className="font-medium">{totalOrang}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">{formatPrice(0)}</span>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-blue-600">
                      {flight && formatPrice(calculateTotal() * totalOrang)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Booking Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flight</span>
                      <span className="font-medium">
                        {flight?.no_penerbangan}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">
                        {flight &&
                          new Date(
                            flight.waktu_keberangkatan
                          ).toLocaleDateString("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers</span>
                      <span className="font-medium">{totalOrang} Adult</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Secure payment
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Free cancellation within 24 hours
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Instant confirmation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
