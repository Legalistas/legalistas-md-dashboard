"use client";

import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/simple-datatables.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Providers } from "./providers";
import { DragDropContext } from "@hello-pangea/dnd";
import SessionWrapper from "@/components/SessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <SessionWrapper>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Providers>
            <AuthProvider>
              <div className="dark:bg-boxdark-2 dark:text-bodydark">
                {loading ? <Loader /> : children}
              </div>
            </AuthProvider>
          </Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
