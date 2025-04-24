"use client";
import { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import toast, { Toaster } from "react-hot-toast";
import useMe from "@/store/me";
import AddAirlines from "@/components/modal/AddAirlines";
import AirlinesTable from "@/components/table/AirlinesTable";
import { IAirlines } from "@/types/airlines";
import EditAirlines from "@/components/modal/EditAirlines";

const Page: React.FC = () => {
  const [airlines, setAirlines] = useState<IAirlines[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<IAirlines>();
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { user } = useMe();

  const initialData = useCallback(async () => {
    setErrorMessage({});
    setLoading(true);

    try {
      const response = await axios.get("/api/airlines/all");
      if (response.status === 200 && response.data.data.length !== 0) {
        setAirlines(response.data.data);
      } else {
        setErrorMessage({ error: "Tidak memiliki data maskapai" });
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
  }, []);

  const onEdit = (data: IAirlines) => {
    setIsEdit(true);
    setSelectedAirlines(data);
  };

  const handleDelete = async (uuid: string) => {
    const isConfirm = window.confirm("Anda yakin ingin menghapus?");

    if (isConfirm) {
      console.log({ uuid });

      try {
        const response = await axios.delete(`/api/airlines/delete/${uuid}`);

        if (response.status === 200) {
          toast.success("Berhasil Delete Maskapai");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        const err = ErrorAxios(error);

        if (typeof err === "object") {
          setErrorMessage(err as Record<string, string>);
        } else {
          setErrorMessage({ error: err });
        }
      }
    }
  };

  useEffect(() => {
    initialData();
  }, [initialData]);

  return (
    <LayoutDashboard>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Airlines</h1>
          {user && user.role === "Admin" && (
            <button
              className="mr-2 rounded bg-green-500 hover:bg-green-600 px-6 py-2 text-white"
              onClick={() => setIsAdd(true)}
            >
              Create
            </button>
          )}
        </div>
        <AirlinesTable
          initialValues={airlines}
          loading={loading}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
        {errorMessage && <p className="text-center">{errorMessage.error}</p>}
      </div>
      {isAdd && (
        <AddAirlines
          isOpen={isAdd}
          loading={loading}
          onClose={() => setIsAdd(false)}
        />
      )}
      {isEdit && selectedAirlines && (
        <EditAirlines
          initialValue={selectedAirlines}
          isOpen={isEdit}
          loading={loading}
          onClose={() => setIsEdit(false)}
        />
      )}
    </LayoutDashboard>
  );
};

export default Page;
