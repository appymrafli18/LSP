"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
import AddFlight from "@/components/modal/AddFlight";
import DetailFlight from "@/components/modal/DetailFlight";
import EditFlight from "@/components/modal/EditFlight";
import FlightTable from "@/components/table/FlightTable";
import {ErrorAxios} from "@/lib/axios-error";
import {FLIGHT, SelectFlight} from "@/types/flight";
import axios from "axios";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import useMe from "@/store/me";

const Page: React.FC = () => {
  const [data, setData] = useState<FLIGHT[]>([]);
  const {user} = useMe();
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [selectedData, setSelectedData] = useState<SelectFlight>();
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const initialData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/flights/all");

      if (response.data.data.length > 0) {
        setData(response.data.data);
      } else {
        setErrorMessage({error: "Flight not found"});
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

  const onEdit = (data: FLIGHT) => {
    setIsEdit(true);
    axios
      .get(`/api/flights/select/${data.uuid}`)
      .then((response) => setSelectedData(response.data.data));
  };

  const onDetail = (data: FLIGHT) => {
    setIsDetail(true);
    axios
      .get(`/api/flights/select/${data.uuid}`)
      .then((response) => setSelectedData(response.data.data));
  };

  const onDelete = (uuid: string) => {
    axios.delete(`/api/flights/delete/${uuid}`).then(() => {
      toast.success("Berhasil Delete Flight");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  const onAdd = () => {
    if (errorMessage && errorMessage.error == "Airlines not found") {
      window.location.href = "/dashboard/profile";
      return;
    }
    setIsAdd(true);
  };

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    const no_penerbangan = formData.get("no-penerbangan");

    try {
      if (no_penerbangan) params.append("no_penerbangan", no_penerbangan as string);
      let response;

      if (no_penerbangan) {
        response = await axios.get(`/api/flights/filter?${params.toString()}`);
      } else {
        response = await axios.get("/api/flights/all");
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
      setData([]);
      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>);
      } else {
        setErrorMessage({error: err});
      }
    }
  }

  useEffect(() => {
    initialData();
  }, [initialData]);

  return (
    <LayoutDashboard>
      <div className="p-6">
        <Toaster position="top-right" reverseOrder={false}/>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Flights</h1>

          <div className="flex gap-2 items-center mb-4">
            <form className="flex gap-2 items-center" onSubmit={handleSubmitForm}>
              <input type="text" name="no-penerbangan" placeholder="Nomor Penerbangan ..."
                     className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search
              </button>
            </form>
            {
              user?.role === "Maskapai" && <button
                    onClick={onAdd}
                    className="mr-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
                >
                    Create
                </button>
            }
          </div>
        </div>
        <FlightTable
          initialValues={data}
          errorMessage={errorMessage}
          loading={loading}
          onEdit={onEdit}
          role={user?.role}
          onDelete={onDelete}
          onDetail={onDetail}
        />

        {isAdd && (
          <AddFlight
            isOpen={isAdd}
            onClose={() => setIsAdd(false)}
            loading={loading}
          />
        )}
        {selectedData && isEdit && (
          <EditFlight
            isOpen={isEdit}
            initialValues={selectedData}
            onClose={() => setIsEdit(false)}
            loading={loading}
          />
        )}
        {selectedData && isDetail && (
          <DetailFlight
            onClose={() => setIsDetail(false)}
            isOpen={isDetail}
            flight={selectedData}
            loading={loading}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
