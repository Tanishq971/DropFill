"use client";
import React, { useEffect, useState } from "react";
import {  getFormContentById } from "@/actions/form";
import FormSubmissionPageContent from "@/components/FormSubmissionPageContent";
import { FormElementInstance } from "@/components/FormElements";

const page =  ({ params }: { params: Promise<{ shareUrl: string }> }) => {
  const [formContent, setFormContent] = useState<FormElementInstance[]>();
  const [formColor , setFormColor ] = useState<string> ("bg-gray-200")
  const {shareUrl} = React.use(params)
  const formId = shareUrl.split("_")[2];

  useEffect(() => {
    async function fetchForm() {
      const form = await getFormContentById(Number(formId));
      if (!form) throw new Error("Form content not found");
      const formData = JSON.parse(form.content) as FormElementInstance[];
      setFormColor(form.formColor)
      setFormContent(formData);
    }

    fetchForm()
  }, [formId]);
  //   console.log(form.content)
  if(!formContent) return <></>
  console.log(formContent);
  return <FormSubmissionPageContent formContent={formContent } formColor = {formColor} formId = {formId}></FormSubmissionPageContent>;
};

export default page;
