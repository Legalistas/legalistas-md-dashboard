"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import links from "@/config/menu";
import { FaChevronDown, FaHome } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-0 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <img
            width={180}
            height={32}
            src={"/images/logo/logo-dark.svg"}
            alt="Logo"
            className="lg:text-center"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <IoMdClose className="h-8 w-8" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-0 px-4 py-4 lg:mt-2 lg:px-6">
          <div>
            <h3 className="mb-2 ml-0 text-xs font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {links.map((link, index) => (
                <li key={index}>
                  {/* Verifica si el enlace es para mostrar un título o un enlace normal */}
                  {link.href === "title" ? (
                    <h3 className="mb-2 ml-0 mt-2 text-xs font-semibold uppercase text-bodydark2">
                      {link.text}
                    </h3>
                  ) : // Verifica si el enlace es colapsable
                  link.isCollapse ? (
                    <div>
                      {/* Renderiza el menú colapsable si isCollapse es verdadero */}
                      {link.isCollapse && (
                        <SidebarLinkGroup
                          activeCondition={
                            pathname === link.key || pathname.includes(link.key)
                          }
                        >
                          {(handleClick, open) => {
                            return (
                              <React.Fragment>
                                <Link
                                  href="#"
                                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                    (pathname === link.key ||
                                      (pathname.startsWith(link.key + "/") &&
                                        pathname !== link.key + "/")) &&
                                    "bg-graydark dark:bg-meta-4"
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    sidebarExpanded
                                      ? handleClick()
                                      : setSidebarExpanded(true);
                                  }}
                                >
                                  <link.icon />
                                  {link.text}
                                  <FaChevronDown
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                      open && "rotate-180"
                                    }`}
                                  />
                                </Link>

                                {/* <!-- Dropdown Menu Start --> */}
                                <div
                                  className={`translate transform overflow-hidden ${
                                    !open && "hidden"
                                  }`}
                                >
                                  <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                    {link.collapse.map((sublink, subindex) => (
                                      <li key={subindex}>
                                        <Link
                                          href={sublink.href}
                                          className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                                        >
                                          {sublink.text}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {/* <!-- Dropdown Menu End --> */}
                              </React.Fragment>
                            );
                          }}
                        </SidebarLinkGroup>
                      )}
                    </div>
                  ) : (
                    // Renderiza el enlace normal si no es colapsable
                    <Link
                      href={link.href}
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        (pathname === link.key ||
                          (pathname.startsWith(link.key + "/") &&
                            pathname !== link.key + "/")) &&
                        "bg-graydark dark:bg-meta-4"
                      }`}
                    >
                      <link.icon />
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
