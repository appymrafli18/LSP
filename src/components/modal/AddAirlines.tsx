"use client";

import { ErrorAxios } from "@/lib/axios-error";
import FormComponent from "../form/FormComponent";
import InputField from "../input/InputField";
import axios from "axios";
import { SelectField } from "../input/SelectField";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useMe from "@/store/me";

interface IDataAirlines {
  name: string;
  logo: File;
  userId: string;
}

interface IAddAirlinesProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
}

interface IOption {
  value: string;
  label: string;
}

export default function AddAirlines({
  isOpen,
  loading,
  onClose,
}: IAddAirlinesProps) {
  const [option, setOption] = useState<IOption[]>([]);
  const { user } = useMe();
  const [error, setError] = useState<Record<string, string>>({});

  const initialValues: IDataAirlines = {
    name: "",
    logo: new File([], ""),
    userId: "",
  };

  const handleSubmit = async (data: IDataAirlines) => {
    // console.log("submitted:", data);

    try {
      const response = await axios.post("/api/airlines/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Berhasil Menambahkan Data Maskapai");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      const err = ErrorAxios(error);

      console.log(err);

      if (typeof err === "object") {
        setError(err as Record<string, string>);
      } else {
        setError({ error: err });
      }
    }
  };

  useEffect(() => {
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
  }, [option.length, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md bg-white">
        <h2 className="text-lg font-semibold mb-4">Add Airlines</h2>
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
                value={user?.name}
                disable={true}
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
                // required
                type="file"
              />
              {user && user.role === "Admin" && (
                <SelectField
                  label="Maskapai"
                  name="userId"
                  onChange={handleChange}
                  value={formData?.userId}
                  options={option}
                />
              )}
              {error.error && <p className="text-red-500">{error.error}</p>}
            </>
          )}
        </FormComponent>
      </div>
    </div>
  );
}
