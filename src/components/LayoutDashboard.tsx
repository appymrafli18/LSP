"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useMe from "@/store/me";
import { useRouter } from "next/navigation";

const LayoutDashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, setUser } = useMe();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setUser();
      setLoading(true);
    } else {
      if (user.role === "User") router.push("/");
      setLoading(false);
    }
  }, [user, setUser, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) return (window.location.href = "/login");

  if (user.role !== "User") {
    return (
      <div className="flex min-h-screen">
        <Sidebar user={user} />
        <div className="flex-1 overflow-x-hidden">
          <Navbar user={user} />
          {children}
        </div>
      </div>
    );
  }
};

export default LayoutDashboard;
