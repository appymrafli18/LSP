import { USER } from "@/types/user";
import FormComponent from "../form/FormComponent";
import InputField from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface IEditUserProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (data: USER) => void;
  loading: boolean;
  initialValue: USER | null;
  title: string;
}

export default function EditUser({
  isOpen,
  onClose,
  handleSubmit,
  loading,
  initialValue,
  title,
}: IEditUserProps) {
  if (!isOpen) return null;
  if (initialValue === null) return null;

  const initialValues: USER = {
    id: initialValue.id,
    uuid: initialValue.uuid,
    name: initialValue.name,
    email: initialValue.email,
    role: initialValue.role,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit {title}</h2>
        <FormComponent<USER>
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={onClose}
          submitLabel="Simpan"
          buttonLoading={loading}
          isCancel={true}
        >
          {({ formData, handleChange }) => (
            <>
              <InputField
                label="Name"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                placeholder="Your Name . . ."
                required
                inputStyle="w-full"
              />
              <InputField
                label="Email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder="Your Email . . ."
                required
                inputStyle="w-full"
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
