import React from "react";
import TempLoader from "./TempLoader";

interface StatsCardProps {
  title: string;
  value: string;
  loading: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, loading }) => {
  return (
    <div className="card p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">{title}</h3>
      {loading ? (
        <TempLoader />
      ) : (
        <p className="text-2xl font-bold mt-2">{value}</p>
      )}
    </div>
  );
};

export default StatsCard;
