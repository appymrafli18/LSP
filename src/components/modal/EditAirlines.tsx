"use client";

import { ErrorAxios } from "@/lib/axios-error";
import FormComponent from "../form/FormComponent";
import InputField from "../input/InputField";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IAirlines } from "@/types/airlines";
import useMe from "@/store/me";

interface IDataAirlines {
  name: string;
  logo: File;
  uuid: string;
  userId: string;
}

interface IEditAirlinesProps {
  isOpen: boolean;
  loading: boolean;
  initialValue: IAirlines;
  onClose: () => void;
}

interface IOption {
  value: string;
  label: string;
}

export default function EditAirlines({
  isOpen,
  loading,
  onClose,
  initialValue,
}: IEditAirlinesProps) {
  const [option, setOption] = useState<IOption[]>([]);
  const [error, setError] = useState<Record<string, string>>({});
  const { user } = useMe();

  const initialValues: IDataAirlines = {
    name: initialValue?.name,
    uuid: initialValue?.uuid,
    logo: new File([], ""),
    userId: initialValue?.user?.id?.toString(),
  };

  const handleSubmit = async (data: IDataAirlines) => {
    const { uuid, ...withoutUUID } = data;

    try {
      const response = await axios.put(
        `/api/airlines/update/${uuid}`,
        withoutUUID,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Berhasil Mengubah Data Maskapai");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      const err = ErrorAxios(error);

      if (typeof err === "object") {
        setError(err as Record<string, string>);
      } else {
        setError({ error: err });
      }
    }
  };

  useEffect(() => {
    const getAllMaskapai = () => {
      if (user && user.role === "Admin") {
        axios
          .get("/api/user/all/Maskapai")
          .then((res) => {
            const mappedData = res.data.data.map(
              (item: { id: number; name: string }) => ({
                value: item.id.toString(),
                label: item.name,
              })
            );
            setOption(mappedData);
            if (option.length === 0) return null;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    getAllMaskapai();
  }, [option.length, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md bg-white">
        <h2 className="text-lg font-semibold mb-4">Edit Airlines</h2>
        <FormComponent<IDataAirlines>
          isCancel={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={onClose}
          submitLabel="Save"
          buttonLoading={loading}
        >
          {({ formData, handleChange }) => (
            <>
              <InputField
                label="Name"
                name="name"
                onChange={handleChange}
                value={formData?.name}
                inputStyle="w-full"
                placeholder="Masukkan Nama Airlines"
                required
              />
              <InputField
                label="Logo"
                name="logo"
                onChange={handleChange}
                inputStyle="w-full"
                placeholder="Masukkan Nama Airlines"
                type="file"
              />
              {error.error && <p className="text-red-500">{error.error}</p>}
            </>
          )}
        </FormComponent>
      </div>
    </div>
  );
}
