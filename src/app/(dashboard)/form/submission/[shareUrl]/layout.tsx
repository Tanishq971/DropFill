import React, { ReactNode } from "react";

import DesignerContextProvider from "@/components/context/DesignerContext";
import ToastProvider from "@/components/ToastProvider";
import nextAppLoader from "next/dist/build/webpack/loaders/next-app-loader";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <main className="flex w-full fllex-grow">
            {children}
      </main>
    </div>
  );
};

export default layout;
