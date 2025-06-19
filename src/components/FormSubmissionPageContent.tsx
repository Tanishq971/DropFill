"use client";

import React, { useCallback, useState, useRef } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { submitResponse } from "@/actions/form";

const FormSubmissionPageContent = ({
  formContent,
  formColor,
  formId,
}: {
  formContent: FormElementInstance[];
  formColor: string;
  formId: string;
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, startTransition] = useTransition();
  const [responded, setResponded] = useState(false);
  const submitValue = useCallback((id: string, value: string) => {
    formValues.current[id] = value;
    //clear errors of the specific field
    setFormErrors((prev) => ({ ...prev, [id]: false }));
  }, []);

  const validateForm = () => {
    console.log("At validateForm");
    const errors: { [key: string]: boolean } = {};

    // Validate all fields
    for (const field of formContent) {
      const actualValue = formValues.current[field.id] || "";
      console.log(`Field ${field.id}:`, actualValue);
      const valid = FormElements[field.type].validate(field, actualValue);
      console.log(`Field ${field.id} valid:`, valid);
      if (!valid) {
        errors[field.id] = true;
      }
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const submitForm = async () => {
    const isValid = validateForm();
    if (!isValid) {
      console.log("Form not submitted due to validation errors");
      return;
    }

    try {
      const response = JSON.stringify(formValues.current);
      await submitResponse(Number(formId), response);
      setResponded(true);
    } catch (err) {
      console.log("there is some error");
    }
    console.log("Form submission triggered", formValues.current);
  };

  if(responded){
    return <div className="w-screen flex items-center justify-center text-6xl text-gray-600 font-bold h-screen bg-gray-50 ">
         Your Response has been recorded 
      </div>
  }

  return (
    <div className={cn("flex w-full h-screen items-center justify-center")}>
      <div
        className={cn(
          "max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8  overflow-y-auto border shadow-xl shadow-blue-200 rounded-xl",
          formColor
        )}
      >
        {formContent?.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInValid={formErrors[element.id] || false}
            />
          );
        })}
        <Button onClick={() => startTransition(submitForm)} disabled={loading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormSubmissionPageContent;
