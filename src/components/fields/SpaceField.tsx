"use client";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { TbBracketsAngle } from "react-icons/tb";

const type: ElementsType = "SpaceField";

const extraAttributes = {
  height: 32, // Default height in pixels (adjustable via properties)
};

const propertiesSchema = z.object({
  height: z.number().min(8).max(200).default(32), // Allow customizing height
});

export const SpaceFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: TbBracketsAngle,
    label: "Space Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
   validate:(formElement , currentValue)=>{
    return true
  }
};

type CustomAttributes = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomAttributes;
  //   const { height } = element.extraAttributes;

  return <div className="w-full bg-transparent h-3"></div>;
}

type PropertiesFormType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomAttributes;
  const { height } = element.extraAttributes;

  const applyChanges = (values: PropertiesFormType) => {
    // Placeholder for updating height (requires form state management)
    console.log("Applying height:", values.height);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <Label>Height (px)</Label>
      <Input
        type="number"
        value={height}
        min={8}
        max={200}
        onChange={(e) => applyChanges({ height: Number(e.target.value) })}
        className="text-gray-900 dark:text-gray-100"
      />
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomAttributes;

  return <div className="w-full bg-transparent h-3"></div>;
}
