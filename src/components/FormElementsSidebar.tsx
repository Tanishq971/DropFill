"use client";
import SidebarButtonElement from "./SidebarButtonElement";
import { FormElements } from "./FormElements";
import { cn } from "@/lib/utils";
import useDesigner from "./hooks/useDesigner";

const FormElementsSidebar = () => {
  const { setFormColor } = useDesigner();
  console.log(FormElements.TitleField);

  return (
    <div className="flex flex-col gap-4 mx-2 p-4  text-gray-900  border-r border-gray-200 dark:border-gray-700 h-screen">
      <div className="w-full">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Properties
        </h1>
        <div className="mt-3 flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={cn(
                `w-8 h-8 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition`,
                color
              )}
              onClick={() => setFormColor(color)}
            ></button>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <SidebarButtonElement formElement={FormElements.TitleField} />
          <SidebarButtonElement formElement={FormElements.SpaceField} />
          <SidebarButtonElement formElement={FormElements.TitleField} />
          <SidebarButtonElement formElement={FormElements.TitleField} />
        </div>
      </div>
      <div className="w-full bg-gray-300 dark:bg-gray-700 h-0.5"></div>
      <div className="w-full">
        <h2 className="text-md font-semibold text-gray-700 dark:text-gray-300">
          Elements
        </h2>
        <div className="mt-2 space-y-2">
          <SidebarButtonElement formElement={FormElements.TextField} />
        </div>
      </div>
    </div>
  );
};

export default FormElementsSidebar;

const colors = ["bg-[#51e2f5]", "bg-[#9df9ef]", "bg-[#edf756]", "bg-[#ffa8B6]"];