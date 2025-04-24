import React from "react";
import FormComponent from "./form/FormComponent";
import InputField from "./input/InputField";
import { SelectField } from "./input/SelectField";

interface UserFormData {
  name: string;
  username: string;
  payment: string;
  password: string;
  role: string;
  [key: string]: string;
}

const UseFormer = () => {
  const initialValues: UserFormData = {
    name: "",
    payment: "",
    role: "",
    password: "",
    username: "",
  };

  const handleFormSubmit = (data: UserFormData) => {
    console.log("Form submitted:", data);
    // Logika submit form disini
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">User Form</h1>

      <FormComponent<UserFormData>
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        submitLabel="Simpan User"
      >
        {({ formData, handleChange }) => (
          <>
            <InputField
              label="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="payment"
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              required
            />
            <InputField
              label="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <SelectField
              label="role"
              name="role"
              onChange={handleChange}
              value={formData.role}
              options={[
                {
                  label: "USER LABEL",
                  value: "USER VALUE",
                },
                {
                  label: "ADMIN LABEL",
                  value: "ADMIN VALUE",
                },
                {
                  label: "MASKAPAI LABEL",
                  value: "MASKAPAI VALUE",
                },
              ]}
              required
            />
          </>
        )}
      </FormComponent>
    </div>
  );
};

export default UseFormer;
