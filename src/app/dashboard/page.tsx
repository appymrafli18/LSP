"use client";
import Dashboard from "@/components/Dashboard";
import LayoutDashboard from "@/components/LayoutDashboard";
import React from "react";

const Page: React.FC = () => {
  return (
    <LayoutDashboard>
      <Dashboard />
    </LayoutDashboard>
  );
};

export default Page;
