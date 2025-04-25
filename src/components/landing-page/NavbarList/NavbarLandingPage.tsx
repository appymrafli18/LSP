"use client";
import React, {useCallback, useEffect, useState} from "react";
import {Menu, X} from "lucide-react";
import axios from "axios";
import {ErrorAxios} from "@/lib/axios-error";
import Link from "next/link";
import useMe from "@/store/me";

const NavbarLandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useMe();

  const checkLogin = useCallback(() => {
    if (!user) {
      setUser();
    }
  }, [user, setUser]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      const err = ErrorAxios(error);
      console.log(err);
    }
  };

  if (user && user.role !== "User") {
    window.location.href = "/dashboard";
  }

  return (
    <nav className="bg-blue-600 p-4 shadow-md fixed top-0 right-0 left-0 z-[100]">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="text-white text-2xl font-bold">E Ticketing</div>

        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Home
          </Link>
          <a
            href="#about"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            About
          </a>
          <a
            href="#services"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Contact
          </a>
        </div>

        <div className="hidden md:flex space-x-4">
          {user ? (
            <>
              <Link
                href="/suclog/my-tickets"
                className="text-white border border-white px-2 py-1 hover:bg-white hover:text-black rounded border-transparent transition-all duration-300 flex items-center justify-center"
              >
                My Tickets
              </Link>
              <button
                className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-600 border border-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-600"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center py-4 min-h-screen">
          <Link
            href="/"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Home
          </Link>
          <a
            href="#about"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            About
          </a>
          <a
            href="#services"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Contact
          </a>

          {user ? (
            <>
              <Link
                href="/suclog/my-tickets"
                className="text-white border w-full border-white px-2 py-1 hover:bg-white hover:text-black rounded border-transparent transition-all duration-300 flex items-center justify-center"
              >
                My Tickets
              </Link>
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 w-full text-center rounded mt-2 bg-red-500 hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white px-4 py-2 w-full border-white border text-center rounded mt-2 hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavbarLandingPage;
