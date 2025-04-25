import React from "react";
import TempLoader from "./TempLoader";

interface StatsCardProps {
  title: string;
  value: string;
  loading: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({title, value, loading}) => {
  return (
    <div
      className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.07)] border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 group">
      {/* Decorative elements */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-blue-500/10 dark:bg-blue-500/20"></div>
      <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-blue-500/5 dark:bg-blue-500/10"></div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 relative z-10 mb-2 flex items-center">
        <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{title}</span>
      </h3>

      {loading ? (
        <TempLoader/>
      ) : (
        <div className="relative z-10">
          <p
            className="text-3xl font-bold mt-3 text-gray-900 dark:text-white tracking-tight group-hover:scale-105 transition-transform duration-300">{value}</p>
          <div
            className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mt-3 group-hover:w-24 transition-all duration-300"></div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;