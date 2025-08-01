"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import { BarChart, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

const Applayout = ({ children }) => {
  const { isLoaded } = useUser();
  const pathname = usePathname();
  return (
    <>
      {!isLoaded && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="flex flex-col h-screen bg-blue-50 md:flex-row">
        <aside className="hidden md:block w-64 bg-white">
          <nav className="mt-8">
            <ul>
              {navItems.map((item) => {
                return (
                  <li key={item.href}>
                    <Link
                      className={`${
                        pathname === item.href ? "bg-blue-300" : ""
                      } flex items-center px-4 py-4 text-gray-700 hover:bg-gray-100`}
                      key={item.href}
                      href={item.href}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex justify-center md:justify-start items-center mb-4">
            <h2 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold md:pt-0 text-center md:text-left">
              {navItems.find((item) => item.href === pathname).label}
            </h2>
          </header>
          {children}
        </main>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
          <ul className="flex flex-row items-center justify-center">
            {navItems.map((item) => {
              return (
                <li key={item.href}>
                  <Link
                    className={`${
                      pathname === item.href ? "text-blue-600" : "text-gray-600"
                    } flex flex-col items-center py-2 px-4`}
                    key={item.href}
                    href={item.href}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Applayout;
