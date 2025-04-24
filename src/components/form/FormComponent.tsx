"use client";
import React, { useState } from "react";

interface IChildren<T> {
  formData: T;
  handleChange: (event: IEventChange) => void;
}

interface IProps<T> {
  initialValues: T;
  onSubmit: (data: T) => void;
  children: ({ formData, handleChange }: IChildren<T>) => React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  buttonStyle?: string;
  isCancel?: boolean;
  onClose?: () => void;
  buttonLoading?: boolean;
}

type IEventChange = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export default function FormComponent<T>({
  initialValues,
  onSubmit,
  children,
  buttonStyle,
  buttonLoading,
  isCancel = false,
  onClose,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
}: IProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (event: IEventChange) => {
    const { name, type, files, value } = event.target as HTMLInputElement;

    const fieldValue = type === "file" ? files?.[0] : value;

    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {children({ formData, handleChange })}

      <div className="mt-4 flex justify-end items-center">
        {isCancel && (
          <button
            type="submit"
            disabled={buttonLoading}
            onClick={onClose}
            className={`px-4 py-2 mr-4 bg-red-500 text-white rounded ${buttonStyle} ${
              buttonLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-600"
            }`}
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          disabled={buttonLoading}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${buttonStyle} ${
            buttonLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
