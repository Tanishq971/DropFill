"use client"
import React, { ReactNode } from "react";
import { Providers } from "../../providers";
import DesignerContextProvider from "@/components/context/DesignerContext";
import ToastProvider from "@/components/ToastProvider";
import nextAppLoader from "next/dist/build/webpack/loaders/next-app-loader";
import Navbar from "@/components/Navbar";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
     <Navbar></Navbar>
      <main className="flex w-full fllex-grow">
        <DesignerContextProvider>
          <Providers>
            {children}
            <ToastProvider />
          </Providers>
        </DesignerContextProvider>
      </main>
    </div>
  );
};

export default layout;
