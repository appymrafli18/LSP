"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
// import toast, { Toaster } from "react-hot-toast";
import BookingTable from "@/components/table/BookingTable";
import {ErrorAxios} from "@/lib/axios-error";
import {BOOKING} from "@/types/booking";
import axios from "axios";
import React, {FormEvent, useCallback, useEffect, useState} from "react";

const Page: React.FC = () => {
    const [data, setData] = useState<BOOKING[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

    const initialData = useCallback(async () => {
      setLoading(true);
      setErrorMessage({});
      try {
        const response = await axios.get("/api/bookings/all");

        if (response.status === 200 && response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setData([]);
        }
      } catch (error) {
        const err = ErrorAxios(error);

        if (typeof err === "object") {
          setErrorMessage(err as Record<string, string>);
        } else {
          setErrorMessage({error: err});
        }
      } finally {
        setLoading(false);
      }
    }, []);

    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const params = new URLSearchParams();
      const no_penerbangan = formData.get("no-penerbangan");
      const no_booking = formData.get("no-booking");

      try {
        if (no_penerbangan) params.append("no_penerbangan", no_penerbangan as string);
        if (no_booking) params.append("no_booking", no_booking as string);
        let response;

        if (no_penerbangan || no_booking) {
          response = await axios.get(`/api/bookings/filter?${params.toString()}`);
        } else {
          response = await axios.get("/api/bookings/all");
        }

        if (response.status === 200 && response.data.data.length > 0) {
          setData(response.data.data);
          setErrorMessage({});
        } else {
          setData([]);
          setErrorMessage({error: response.data.message});
        }
      } catch (error) {
        const err = ErrorAxios(error);
        if (typeof err === "object") {
          setErrorMessage(err as Record<string, string>);
        } else {
          setErrorMessage({error: err});
        }
      }
    }

    useEffect(() => {
      initialData().catch(error => console.log(error));
    }, [initialData]);

    return (
      <LayoutDashboard>
        <div>{/* <Toaster position="top-right" reverseOrder={false} /> */}</div>
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Bookings</h1>
            <form onSubmit={handleSubmitForm} className="flex gap-2 items-center mb-4">
              <input type="text" name="no-penerbangan" placeholder="Nomor Penerbangan ..."
                     className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <input type="text" name="no-booking" placeholder="Nomor Booking ..."
                     className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
            </form>
          </div>

          <BookingTable
            initialValues={data}
            loading={loading}
            errorMessage={errorMessage}
          />
        </div>
      </LayoutDashboard>
    );
  }
;

export default Page;
