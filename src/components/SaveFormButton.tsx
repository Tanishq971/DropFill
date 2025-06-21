"use client";
import React, { startTransition, useTransition } from "react";
import { Button } from "./ui/button";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ToastContentProps } from "react-toastify";

const SaveFormButton = () => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition(); //important hook and useful also
  const params = useParams();
  async function updateFormContent() {
    try {
      const id = params.id;
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(Number(id), jsonElements);
      toast.success(SplitButtons, {
        className: "p-0 w-[500px] border border-purple-600/40 ",
      });
    } catch (e) {
      toast.error("Something went wrong")
    }
  }

  return (
    <Button
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      Save
    </Button>
  );
};

export default SaveFormButton;

function SplitButtons({ closeToast }: ToastContentProps) {
  return (
    // using a grid with 3 columns
    <div className="flex items-center justify-center w-full">
      <p className="text-md">form saved successfully</p>
    </div>
  );
}
