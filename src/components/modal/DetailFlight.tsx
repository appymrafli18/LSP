import React from "react";
import DetailModal from "./DetailModal";
import { SelectFlight } from "@/types/flight";
import convertToRupiah from "@/lib/converterRupiah";
import Image from "next/image";

interface DetailFlightProps {
  isOpen: boolean;
  onClose: () => void;
  flight: SelectFlight;
  loading?: boolean;
}

const DetailFlight: React.FC<DetailFlightProps> = ({
  isOpen,
  onClose,
  flight,
  loading = false,
}) => {
  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Flight Details"
      loading={loading}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Flight Number</p>
            <p className="font-medium text-gray-900">{flight.no_penerbangan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Airlines</p>
            <div className="flex items-center gap-2">
              <Image
                src={`/img-airlines/${flight.airlines.logo}`}
                alt="Logo"
                className="w-8 h-8 object-contain text-center"
                width={20}
                height={20}
              />
              <p className="font-medium text-gray-900">
                {flight.airlines.name}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="font-medium text-gray-900">
              {flight.kota_keberangkatan}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="font-medium text-gray-900">{flight.kota_tujuan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Departure Time</p>
            <p className="font-medium text-gray-900">
              {new Date(flight.waktu_keberangkatan).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Arrival Time</p>
            <p className="font-medium text-gray-900">
              {new Date(flight.waktu_kedatangan).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium text-gray-900">
              {convertToRupiah(Number(flight.harga))}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Seat Capacity</p>
            <p className="font-medium text-gray-900">
              {flight.kapasitas_kursi}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Available Seats</p>
            <p className="font-medium text-gray-900">{flight.kursi_tersedia}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-medium text-gray-900">
              {new Date(flight.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Updated At</p>
            <p className="font-medium text-gray-900">
              {new Date(flight.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* {flight.bookings && flight.bookings.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Bookings</h3>
            <div className="space-y-3">
              {flight.bookings.map((booking, index) => (
                <div key={index}>
                  <div className="bg-gray-100 p-3 rounded-lg border">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Passenger Name</p>
                        <p className="font-medium text-gray-900">
                          {booking.user?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Booking</p>
                        <p className="font-medium text-gray-900">
                          {booking.user?.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Seats Booked</p>
                        <p className="font-medium text-gray-900">
                          {booking.jumlah_kursi}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="font-medium text-gray-900">
                          {convertToRupiah(Number(booking.total_harga))}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium text-gray-900">
                          {booking.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Booking Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(booking.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < flight.bookings.length - 1 && (
                    <hr className="my-3 border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </DetailModal>
  );
};

export default DetailFlight;
