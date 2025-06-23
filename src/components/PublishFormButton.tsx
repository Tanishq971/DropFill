"use client"
import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDesigner from "./hooks/useDesigner";
import { useParams } from "next/navigation";
import { UpdateFormContent , publishForm , GetFormById } from "@/actions/form";
import { redirect, usePathname } from 'next/navigation'


const PublishFormButton = () => {
  const {elements, formColor} = useDesigner();
  
  const params = useParams();
  const pathname = usePathname()
  
  async function submitForm(){
      const id = Number(params.id)
      const formContent = JSON.stringify(elements)
      const form = await GetFormById(id)
      const currentDate = Date.now();
      
      const shareUrl = form.name + "_" + currentDate.toString()+"_"+form.id.toString()
      const p_form = await publishForm(id , formContent , shareUrl , formColor)
      const url = p_form.shareUrl
      redirect(`/form/submission/${url}`)

  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-pink-300">Publish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Publish form</AlertDialogTitle>
          <AlertDialogDescription>
            {" "}
            This cannot be undone , are you sure you want to publish this form?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={submitForm}>Publish</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PublishFormButton;
