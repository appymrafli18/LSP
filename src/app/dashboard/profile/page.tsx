"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
import { USER } from "@/types/user";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import toast, { Toaster } from "react-hot-toast";
import useMe from "@/store/me";
import FormComponent from "@/components/form/FormComponent";
import InputField from "@/components/input/InputField";
import Image from "next/image";
import AddAirlines from "@/components/modal/AddAirlines";
import EditAirlines from "@/components/modal/EditAirlines";
import { IAirlines } from "@/types/airlines";

const Page: React.FC = () => {
  const { user } = useMe();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState<Record<"add" | "edit", boolean>>();
  const [initialValue, setInitialValue] = useState<IAirlines>();

  const handleShowModal = (values: "edit" | "add") => {
    setShowModal({
      add: values === "add",
      edit: values === "edit",
    });
  };

  const initialProfile = {
    name: user?.name,
    username: user?.username,
    email: user?.email,
  };

  useEffect(() => {
    if (user && user.role === "Maskapai") {
      axios
        .get(`/api/airlines/all`)
        .then((response) => setInitialValue(response.data.data[0]))
        .catch((err) => {
          const errs = ErrorAxios(err);
          if (typeof errs === "object") {
            setErrorMessage(errs as Record<string, string>);
          } else {
            setErrorMessage({ error: errs });
          }
        });
    }
  }, [user]);

  const handleSubmit = async (data: Partial<USER>) => {
    setLoading(true);
    setErrorMessage({});

    try {
      const response = await axios.put(`/api/user/update/me`, data);
      if (response.status === 200) {
        toast.success("Profile updated successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
  };

  const handleClose = (values: "add" | "edit") => {
    setShowModal({
      add: values === "add" ? false : showModal?.add || false,
      edit: values === "edit" ? false : showModal?.edit || false,
    });
  };

  return (
    <LayoutDashboard>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-16 px-8 pb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Profile Settings
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Manage your account settings and preferences
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Role
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {user?.role}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <FormComponent
                  initialValues={initialProfile}
                  onSubmit={handleSubmit}
                  buttonLoading={loading}
                  submitLabel="Save Changes"
                  buttonStyle="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                >
                  {({ formData, handleChange }) => (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="Full Name"
                          name="name"
                          onChange={handleChange}
                          value={formData.name}
                          errors={errorMessage?.name}
                          required
                          inputStyle="w-full"
                          placeholder="Enter your full name"
                        />
                        <InputField
                          label="Username"
                          name="username"
                          onChange={handleChange}
                          value={formData.username}
                          errors={errorMessage?.username}
                          required
                          inputStyle="w-full"
                          placeholder="Enter your username"
                        />
                      </div>
                      <InputField
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        errors={errorMessage?.email}
                        required
                        type="email"
                        inputStyle="w-full"
                        placeholder="Enter your email"
                      />
                    </div>
                  )}
                </FormComponent>
                {/* Airlines Information */}
                {user && user.role === "Maskapai" && (
                  <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Airlines Information
                      </h2>

                      {initialValue ? (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                          onClick={() => handleShowModal("edit")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit Airlines
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                          onClick={() => handleShowModal("add")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Tambah Airlines
                        </button>
                      )}
                    </div>
                    {initialValue && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={`/img-airlines/${initialValue.logo}`}
                              alt={`${initialValue.name}`}
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Nama Maskapai: {initialValue.name}
                            </h3>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Dibuat:{" "}
                                {new Date(
                                  initialValue.createdAt
                                ).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Terakhir di Update:{" "}
                                {new Date(
                                  initialValue.updatedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* Airlines Information */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {user && user.role === "Maskapai" && showModal && showModal.add && (
        <AddAirlines
          isOpen={showModal.add}
          onClose={() => handleClose("add")}
          loading={false}
        />
      )}
      {user && user.role === "Maskapai" && showModal && showModal.edit && (
        <EditAirlines
          isOpen={showModal.edit}
          onClose={() => handleClose("edit")}
          loading={false}
          initialValue={initialValue as IAirlines}
        />
      )}
    </LayoutDashboard>
  );
};

export default Page;
