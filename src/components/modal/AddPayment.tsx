"use client";

import { IPayment } from "@/types/payment";
import { ChangeEvent, useState } from "react";

interface IAddPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: IPayment) => void;
  loading: boolean;
  bookingId: string;
}

export default function AddPayment({
  isOpen,
  onClose,
  onSave,
  loading,
  bookingId,
}: IAddPaymentProps) {
  const [value, setValue] = useState<IPayment>({
    bookingId: bookingId,
    payment_method: "",
  });

  if (!isOpen) return null;

  const onChangeValues = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--card)] rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-[var(--text)]">
          Add Payment
        </h2>
        <div>
          <label className="text-sm font-medium">Payment Method</label>
          <select
            onChange={(e) => onChangeValues(e)}
            name="payment_method"
            value={value.payment_method}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Payment Method</option>
            <option value="DANA">DANA</option>
            <option value="OVO">OVO</option>
            <option value="GOPAY">GOPAY</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            disabled={loading || !value.payment_method}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              (loading || !value.payment_method) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onSave(value)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 