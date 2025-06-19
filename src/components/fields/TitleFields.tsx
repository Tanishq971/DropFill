"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import {  MdViewHeadline } from "react-icons/md";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {cn} from "@/lib/utils"
import { FaHeading } from "react-icons/fa";

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "Title Field",
};

const propertiesSchema = z.object({
   title:z.string()
});

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: FaHeading,
    label: "Title Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate:(formElement , currentValue)=>{
    return true
  }
};

type customAttributes = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as customAttributes;
  const { title, color } = element.extraAttributes;
  const fontSizeClass = title.length > 30 ? "text-lg" : title.length > 15 ? "text-xl" : "text-2xl";
  return (
    <div className="flex items-center justify-start w-full h-full px-4 py-2 text-gray-600 dark:text-gray-100">
      <p
        className={cn(
          "leading-tight truncate w-full font-semibold",
          fontSizeClass,
          color ? `text-${color}` : ""
        )}
        title={title}
      >
        {title}
      </p>
    </div>
  );
}
type propertiesFormType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as customAttributes;
  const { updateElement } = useDesigner();

  const form = useForm<propertiesFormType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title:extraAttributes.title
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(value: propertiesFormType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
         title:value.title
      },
    });
    console.log("form Submitted", element, value);
  }

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder={"Sample Text"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as customAttributes;
  const { title} = element.extraAttributes;
  return (
    <div className="flex text-2xl text-white flex-col gap-2 w-full ">
          {title}
    </div>
  );
}
