"use client";
import { SelectFlight } from "@/types/flight";
import FormComponent from "../form/FormComponent";
import InputField from "../input/InputField";
import getCurrentDateTime from "@/lib/nowDate";
import { useState } from "react";
import { ErrorAxios } from "@/lib/axios-error";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface IEditFlightProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  initialValues: SelectFlight;
}

export default function EditFlight({
  isOpen,
  onClose,
  loading,
  initialValues,
}: IEditFlightProps) {
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

  const handleSubmit = async (data: SelectFlight) => {
    const updateData = {
      no_penerbangan: data.no_penerbangan,
      kota_keberangkatan: data.kota_keberangkatan,
      kota_tujuan: data.kota_tujuan,
      waktu_keberangkatan: getCurrentDateTime(data.waktu_keberangkatan),
      waktu_kedatangan: getCurrentDateTime(data.waktu_kedatangan),
      harga: data.harga,
      kapasitas_kursi: data.kapasitas_kursi,
      kursi_tersedia: data.kursi_tersedia,
    };
    try {
      const response = await axios.put(
        `/api/flights/update/${data.uuid}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Berhasil Mengubah Data Flight");
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
        <h2 className="text-lg font-semibold mb-4">Edit Flight</h2>

        <FormComponent<SelectFlight>
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
                value={formData.waktu_keberangkatan.slice(0, 16)}
                onChange={handleChange}
                required
                type="datetime-local"
                inputStyle="w-full"
                placeholder="Masukkan Waktu Keberangkatan"
              />
              <InputField
                label="Waktu Kedatangan"
                name="waktu_kedatangan"
                value={formData.waktu_kedatangan.slice(0, 16)}
                onChange={handleChange}
                required
                type="datetime-local"
                inputStyle="w-full"
                placeholder="Masukkan Waktu Kedatangan"
              />
              <InputField
                label="Harga"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Harga"
              />
              <InputField
                label="Kapasitas Kursi"
                name="kapasitas_kursi"
                value={formData.kapasitas_kursi}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Kapasitas Kursi"
              />
              <InputField
                label="Kursi Tersedia"
                name="kursi_tersedia"
                value={formData.kursi_tersedia}
                onChange={handleChange}
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
