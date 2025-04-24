import React from "react";
import Link from "next/link";
import {USER} from "@/types/user";
import Image from "next/image";
import {
  Bookmark,
  DollarSign,
  Fan,
  LayoutDashboard,
  PlaneTakeoff,
  TableProperties,
} from "lucide-react";

const listSidebar = [
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard size={18}/>,
    allowedRoles: ["Admin", "Maskapai"],
  },
  {
    url: "/dashboard/users",
    title: "Users",
    icon: <TableProperties size={18}/>,
    allowedRoles: ["Admin"],
  },
  {
    url: "/dashboard/manage-airlines",
    title: "Airlines",
    icon: <Fan size={18}/>,
    allowedRoles: ["Admin"],
  },
  {
    url: "/dashboard/manage-flight",
    title: "Flight",
    icon: <PlaneTakeoff size={18}/>,
    allowedRoles: ["Admin", "Maskapai"],
  },
  {
    url: "/dashboard/manage-booking",
    title: "Booking",
    icon: <Bookmark size={18}/>,
    allowedRoles: ["Admin", "Maskapai"],
  },
  {
    url: "/dashboard/manage-payment",
    title: "Payments",
    icon: <DollarSign size={18}/>,
    allowedRoles: ["Admin"],
  },
];

const Sidebar: React.FC<{ user?: USER | null }> = ({user}) => {
  return (
    <div className="w-64 min-h-screen p-4 border">
      <div className="flex items-center mb-4">
        <Image
          alt="logo"
          src={`/logo-eticketing-no-bg.png`}
          width={50}
          height={50}
        />
        <h1 className="text-2xl font-bold">E-Ticketing</h1>
      </div>
      <p className="ml-2 mb-4 opacity-50 text-sm">Menu</p>
      <ul>
        {listSidebar
          .filter((item) => user?.role && item.allowedRoles.includes(user.role))
          .map((values, index) => (
            <li className="my-2 px-4 hover:bg-gray-200 rounded" key={index}>
              <Link
                href={values.url}
                className="items-center gap-x-2 text-base p-2 rounded flex"
              >
                {values?.icon}
                {values.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
