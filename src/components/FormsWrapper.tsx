import React from "react";
import { getForms } from "@/actions/form";

const FormsWrapper = async () => {
  const forms = await getForms();
  if (!forms.length) {
    return <div>No forms created yet!</div>;
  }
  return (
    <div className="flex flex-grow">
      {forms.map((form) => {
        return (
          <div className=" flex flex-col gap-5 border-2 border-blue px-5">
            <h1>{form.name}</h1>
            <p>{form.description}</p>
            <div className="w-full">for stats</div>
          </div>
        );
      })}
    </div>
  );
};

export default FormsWrapper;
