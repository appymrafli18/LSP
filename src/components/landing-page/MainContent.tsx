"use client";
import Image from "next/image";
import React from "react";
import supporting from "@/assets/supportimg.webp";
import { Bookmark, LibraryBig, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => (
  <header
    className="bg-blue-600 text-white rounded h-[50vh] bg-cover bg-center relative mt-16 md:mt-20 mb-40 z-0"
    style={{ backgroundImage: "url(assets/pexels-pixabay-62623.jpg)" }}
  >
    <div className="absolute inset-0 bg-black opacity-40"></div>

    <div className="relative z-1 flex items-center justify-center h-full flex-col px-4">
      <h1 className="text-4xl font-bold mb-4">Cari Penerbangan Anda</h1>
      <p className="mb-6">Pesan penerbangan Anda dengan mudah di sini</p>
      <SearchFlight />
    </div>
  </header>
);

const SearchFlight = () => {
  const router = useRouter();

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const tanggal = formData.get("tanggal") as string;

    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (tanggal) params.append("tanggal", tanggal);

    router.push(`/suclog/search-flights?${params.toString()}`);
  };
  return (
    <div className="w-full max-w-4xl text-left bg-white rounded-lg shadow-lg p-6 text-gray-800 absolute -bottom-24">
      <div className="bg-white p-6 shadow-lg rounded-xl">
        <form
          action="POST"
          onSubmit={handleSubmitForm}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">From</label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="City or Airport"
                name="from"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">To</label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="City or Airport"
                name="to"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <input
                type="date"
                name="tanggal"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
            >
              Explore More
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Supporting = () => {
  const features = [
    {
      number: "01",
      title: "Travel requirements for USA",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. At!",
    },
    {
      number: "02",
      title: "Travel Insurance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. At!",
    },
    {
      number: "03",
      title: "Services at your arrival",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. At!",
    },
  ];

  return (
    <div>
      <div className="my-8">
        <h1 className="text-2xl font-bold mb-4">Find Help with Booking</h1>
        <p className="text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit.
        </p>
      </div>

      <div className="flex md:flex-row flex-col-reverse justify-center space-x-20 mx-auto">
        <div className="side-left gap-y-2 md:max-w-[75%]">
          <div className="text-left">
            {features.map((feat, index) => (
              <div key={index} className="my-4">
                <h1 className="font-bold text-sm bg-blue-500 text-white w-fit px-2 py-1 rounded-full text-center">
                  {feat.number}
                </h1>
                <h1 className="font-bold text-xl my-4">{feat.title}</h1>
                <p className="text-sm">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="side-right">
          <Image src={supporting} alt="supporting" className="max-w-fit" />
        </div>
      </div>
    </div>
  );
};

const MemoriesSupport = () => {
  const memoriesList = [
    {
      id: 1,
      title: "Book Now",
      icon: <LibraryBig size={24} color="white" />,
      backgroundIcon: "bg-blue-500",
      description:
        "Lorem ipsum, dolor sit amet elit. Dignissimos provident quod.",
    },
    {
      id: 2,
      title: "Safety",
      icon: <ShieldCheck size={24} color="white" />,
      backgroundIcon: "bg-orange-500",
      description:
        "Lorem ipsum, dolor sit amet elit. Dignissimos provident quod.",
    },
    {
      id: 3,
      title: "Save More",
      icon: <Bookmark size={24} color="white" />,
      backgroundIcon: "bg-yellow-500",
      description:
        "Lorem ipsum, dolor sit amet elit. Dignissimos provident quod.",
    },
  ];

  return (
    <div className="mt-6 bg-gray-300">
      <div className="mx-auto max-w-[70%] flex flex-col">
        <div className="flex justify-between items-center flex-col md:flex-row p-6 min-w-full gap-y-4">
          <h1 className="font-bold text-xl md:text-2xl">
            Make Memories of World
          </h1>
          <button className="bg-blue-500 rounded-full text-xs font-normal px-4 py-2 text-white hover:bg-blue-600">
            View All
          </button>
        </div>
        <div className="flex justify-between items-center p-6 min-w-full md:mt-6 gap-y-4 md:space-x-4 md:flex-row flex-col">
          {memoriesList.map((mem, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-slate-100 rounded-lg max-w-[280px] px-4 py-20"
            >
              <div className={`p-4 rounded-full ${mem.backgroundIcon}`}>
                {mem.icon}
              </div>
              <h1 className="font-bold my-8">{mem.title}</h1>
              <p className="text-sm text-center">{mem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  return (
    <div>
      <main className="container mx-auto p-6 text-center">
        <Header />
        <Supporting />
      </main>

      <main className="text-center">
        <MemoriesSupport />
      </main>
    </div>
  );
};

export default MainContent;
