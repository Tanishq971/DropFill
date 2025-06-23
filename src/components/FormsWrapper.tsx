import React from "react";
import { getForms } from "@/actions/form";
import FormCard from "@/components/FormCard";



const FormsWrapper = async () => {
  const forms = await getForms();
  if (!forms.length) {
    return (
      <div className="col-span-full py-12 text-center text-gray-500">
        No forms created yet!
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
     
      {forms.map((form) => {
        return <FormCard  key={form.id} form={form} />;
      })}
    </div>
  );
};

export default FormsWrapper;