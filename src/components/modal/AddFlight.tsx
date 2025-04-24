"use client";
import { FLIGHT } from "@/types/flight";
import FormComponent from "../form/FormComponent";
import InputField from "../input/InputField";
import getCurrentDateTime from "@/lib/nowDate";
import { useState } from "react";
import { ErrorAxios } from "@/lib/axios-error";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface IAddFlightProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

export default function AddFlight({
  isOpen,
  onClose,
  loading,
}: IAddFlightProps) {
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

  const initialValues: FLIGHT = {
    no_penerbangan: "",
    kota_keberangkatan: "",
    kota_tujuan: "",
    waktu_keberangkatan: getCurrentDateTime().slice(0, 16),
    waktu_kedatangan: getCurrentDateTime().slice(0, 16),
    harga: 1,
    kapasitas_kursi: 1,
    kursi_tersedia: 1,
  };

  const handleSubmit = async (data: FLIGHT) => {
    console.log("submitted:", data);

    const flightData = {
      ...data,
      waktu_keberangkatan: getCurrentDateTime(data.waktu_keberangkatan),
      waktu_kedatangan: getCurrentDateTime(data.waktu_kedatangan),
    };

    try {
      const response = await axios.post("/api/flights/create", flightData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Berhasil Menambahkan Data Flight");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      const err = ErrorAxios(error);

      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>);
      } else {
        setErrorMessage({ error: err });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md bg-white">
        <h2 className="text-lg font-semibold mb-4">Tambah Flight</h2>

        <FormComponent<FLIGHT>
          initialValues={initialValues}
          buttonLoading={loading}
          onClose={onClose}
          onSubmit={handleSubmit}
          isCancel={true}
          submitLabel="Simpan"
        >
          {({ formData, handleChange }) => (
            <>
              <InputField
                label="No Penerbangan"
                name="no_penerbangan"
                value={formData.no_penerbangan}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Nomor Penerbangan"
              />
              <InputField
                label="Kota Keberangkatan"
                name="kota_keberangkatan"
                value={formData.kota_keberangkatan}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Kota Keberangkatan"
              />
              <InputField
                label="Kota Tujuan"
                name="kota_tujuan"
                value={formData.kota_tujuan}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Kota Tujuan"
              />
              <InputField
                label="Waktu Keberangkatan"
                name="waktu_keberangkatan"
                value={formData.waktu_keberangkatan}
                onChange={handleChange}
                required
                type="datetime-local"
                inputStyle="w-full"
                placeholder="Masukkan Waktu Keberangkatan"
              />
              <InputField
                label="Waktu Kedatangan"
                name="waktu_kedatangan"
                value={formData.waktu_kedatangan}
                onChange={handleChange}
                required
                type="datetime-local"
                inputStyle="w-full"
                placeholder="Masukkan Waktu Kedatangan"
              />
              <InputField
                label="Harga"
                name="harga"
                type="number"
                value={formData.harga}
                min="1"
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Harga"
              />
              <InputField
                label="Kapasitas Kursi"
                name="kapasitas_kursi"
                type="number"
                value={formData.kapasitas_kursi}
                onChange={handleChange}
                min="1"
                required
                inputStyle="w-full"
                placeholder="Masukkan Kapasitas Kursi"
              />
              <InputField
                label="Kursi Tersedia"
                name="kursi_tersedia"
                type="number"
                value={formData.kursi_tersedia}
                onChange={handleChange}
                min="1"
                required
                inputStyle="w-full"
                placeholder="Masukkan Kursi Tersedia"
              />
              {errorMessage && (
                <p className="text-left text-red-500">{errorMessage.error}</p>
              )}
            </>
          )}
        </FormComponent>
      </div>
    </div>
  );
}
