"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { Metadata } from "next";
import GuestLayout from "@/layouts/GuestLayout";
import LoginForm from "@/components/FormElements/Login";
import { useSession } from 'next-auth/react';

// export const metadata: Metadata = {
//   title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Signin Page TailAdmin Dashboard Template",
// };

const titles = [
  "Tu espacio legal te espera. Entra con tu usuario y contraseña.",
  "¡Defiende la justicia desde tu escritorio! Inicia sesión para acceder a tu plataforma legal.",
  "Comunidad legal a tu alcance. Únete y colabora con otros profesionales del derecho.",
  "El derecho en tus manos. Inicia sesión y toma el control de tu práctica legal",
];

const SignIn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 5000); // Cambia el tiempo en milisegundos según tu preferencia

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);
  return (
    <GuestLayout>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <img
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={200}
                  height={80}
                />
                <img
                  className="dark:hidden"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={200}
                  height={80}
                />
              </Link>

              <div className="w-full overflow-hidden px-4 text-center">
                <div className="max-w-full overflow-hidden px-4 text-center ">
                  <motion.p
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    {titles[currentIndex]}
                  </motion.p>
                </div>
              </div>

              <span className="mt-15 inline-block">
                <img
                  src="/images/illustration/legalistas-login.png"
                  alt="Legalistas Login"
                  width={350}
                  height={350}
                />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Acceso al sistema
              </h2>

              <LoginForm />
              
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default SignIn;
