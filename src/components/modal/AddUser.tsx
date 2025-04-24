"use client";
import { USER } from "@/types/user";
import FormComponent from "../form/FormComponent";
import InputField from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface IEditUserProps {
  isOpen: boolean;
  handleSubmit: (data: USER) => void;
  onClose: () => void;
  errorMessage: Record<string, string>;
  loading: boolean;
  title: string;
}

export default function AddUser({
  isOpen,
  handleSubmit,
  onClose,
  loading,
  errorMessage,
  title,
}: IEditUserProps) {
  if (!isOpen) return null;

  const initialValues: USER = {
    name: "",
    username: "",
    email: "",
    role: "User",
    password: "",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add {title}</h2>
        <FormComponent<USER>
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isCancel={true}
          buttonLoading={loading}
          onClose={onClose}
        >
          {({ formData, handleChange }) => (
            <>
              <InputField
                label="Name"
                name="name"
                onChange={handleChange}
                value={formData?.name}
                required
                errors={errorMessage?.name}
                inputStyle="w-full"
                placeholder="Masukkan Nama"
              />
              <InputField
                label="Username"
                name="username"
                onChange={handleChange}
                value={formData?.username as string}
                errors={errorMessage?.username}
                required
                inputStyle="w-full"
                placeholder="Masukkan username"
              />
              <InputField
                label="Email"
                name="email"
                onChange={handleChange}
                value={formData?.email}
                required
                errors={errorMessage?.email}
                type="email"
                inputStyle="w-full"
                placeholder="Masukkan Nama"
              />
              <InputField
                label="Password"
                name="password"
                onChange={handleChange}
                value={formData?.password as string}
                errors={errorMessage?.password}
                required
                type="password"
                inputStyle="w-full"
                placeholder="Masukkan Nama"
              />
              <SelectField
                label="Role"
                name="role"
                value={formData?.role}
                onChange={handleChange}
                options={[
                  { value: "Admin", label: "Admin" },
                  { value: "User", label: "User" },
                  { value: "Maskapai", label: "Maskapai" },
                ]}
                required
              />
            </>
          )}
        </FormComponent>
      </div>
    </div>
  );
}
