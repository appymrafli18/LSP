"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
import PaymentsTable from "@/components/table/PaymentsTable";
import toast, { Toaster } from "react-hot-toast";
// import useMe from "@/store/me";
import { useCallback, useEffect, useState } from "react";
import { PAYMENT } from "@/types/payment";
import { ErrorAxios } from "@/lib/axios-error";
import axios from "axios";

const Page: React.FC = () => {
  // const { user } = useMe();
  const [data, setData] = useState<PAYMENT[]>();
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectStatus, setSelectStatus] = useState<string>("Pending");

  const initialValues = useCallback(async () => {
    setLoading(true);
    setErrorMessage({});
    try {
      const response = await axios.get(`/api/payments/all/${selectStatus}`);

      if (response.status === 200) {
        console.log(response);
        setData(response.data.data);

        if (response.data.data.length === 0) {
          setErrorMessage({ error: `Tidak memiliki data pembayaran` });
        }
      }
    } catch (error) {
      const err = ErrorAxios(error);

      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>);
      } else {
        setErrorMessage({ error: err });
      }
    } finally {
      setLoading(false);
    }
  }, [selectStatus]);

  const onConfirm = async (uuid: string) => {
    try {
      const response = await axios.put(`/api/payments/update/${uuid}`, {
        status: "Confirmed",
      });

      if (response.status === 200) {
        toast.success("Berhasil Konfirmasi Pembayaran");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = async (uuid: string) => {
    try {
      const response = await axios.put(`/api/payments/update/${uuid}`, {
        status: "Cancelled",
      });

      if (response.status === 200) {
        toast.success("Berhasil Batalkan Pembayaran");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initialValues();
  }, [initialValues]);

  return (
    <LayoutDashboard>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Payments</h1>
          <select
            name="type"
            value={selectStatus}
            onChange={(e) => setSelectStatus(e.target.value)}
            className="block p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500"
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {data && (
          <PaymentsTable
            initialValues={data}
            errorMessage={errorMessage}
            loading={loading}
            onConfirm={onConfirm}
            onCancel={onCancel}
            selectStatus={selectStatus}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
