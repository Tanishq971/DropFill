"use client";
import React from "react";
import { Form } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const FormCard = ({ form }: { form: Form }) => {
  const router = useRouter();

  return (
    <div
      key={form.id}
      className="group flex h-[240px] flex-col rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg ring-1 ring-gray-100 transition-all hover:border-blue-400 hover:shadow-xl transform "
    >
      {/* Only this part clickable — not the whole card */}
      <div
        className="w-full h-full cursor-pointer"
        onClick={() => {
          router.push(`/form/${form.id}`);
        }}
      >
        <h1 className="text-lg font-semibold text-gray-900 truncate">
          {form.name}
        </h1>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {form.description}
        </p>
      </div>

      {/* Button area stays unaffected */}
      <Button
        className="mt-auto w-full rounded-md bg-gray-50 p-4 text-xs text-gray-500 z-10"
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click
          router.push(`/builder/${form.id}`);
        }}
      >
        Edit
      </Button>
      
      <div className="absolute inset-0 border-t-4 border-blue-600 opacity-10" />
    </div>
  );
};

export default FormCard;
