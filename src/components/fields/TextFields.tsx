"use client"; // Required for client-side hooks

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  submitValueType,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "This is a text field",
  required: false,
  placeholder: "Enter text here",
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().min(2).max(50),
  required: z.boolean().default(false).optional(),
  placeholder: z.string().min(2).max(50),
});

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement, currentValue) => {
    const element = formElement as customAttributes;
    if (element.extraAttributes.required) {
      return currentValue.trim().length > 0; // Trim to ignore spaces
    }
    return true;
  },
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
  const { label, placeholder, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full text-gray-600">
      <Label className="font-bold">
        {label}
        {required && <span className="text-red-600 font-bold"> *</span>}
      </Label>
      <Input
        disabled
        readOnly
        placeholder={placeholder}
        className="text-gray-600"
      />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
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
      label: extraAttributes.label,
      helperText: extraAttributes.helperText,
      required: extraAttributes.required,
      placeholder: extraAttributes.placeholder,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(value: propertiesFormType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: value.label,
        placeholder: value.placeholder,
        helperText: value.helperText,
        required: value.required,
      },
    });
    console.log("form Submitted", element, value);
  }

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Sample Text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  placeholder={element.extraAttributes.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {element.extraAttributes.helperText}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  placeholder={element.extraAttributes.helperText}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {element.extraAttributes.helperText}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>Required</FormLabel>
              <FormControl>
                <Input
                  type="checkbox"
                  checked={field.value ?? false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
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
  submitValue,
  isInvalid,
}: {
  elementInstance: FormElementInstance;
  submitValue?: submitValueType;
  isInvalid?: boolean;
}) {
  const element = elementInstance as customAttributes;
  const { label, placeholder, helperText, required } = element.extraAttributes;
  const [value, setValue] = useState("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid, required, value]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 w-full bg-gray-50 p-4 rounded-2xl shadow-2xl"
      )}
    >
      <Label className={cn(error && "text-red-600" , "font-bold")}>
        {label}
        {required && <span className="text-red-600 font-bold " > *</span>}
      </Label>
      <Input
        placeholder={placeholder}
        className={cn("text-gray-600", error && "border-3 border-red-500")}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          if (submitValue) {
            const valid = TextFieldFormElement.validate(element, newValue);
            setError(!valid);
            submitValue(element.id, newValue);
          }
          console.log("component", newValue);
        }}
        onBlur={() => {
          if (!submitValue) return;
          const valid = TextFieldFormElement.validate(element, value);
          setError(!valid);
          if (valid) {
            submitValue(element.id, value);
          }
        }}
        value={value}
      />
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-600 font-semibold"
          )}
        >
          {helperText}
        </p>
      )}
      {error && (
        <p className="text-red-600 text-[0.8rem] font-semibold">This field is required</p>
      )}
    </div>
  );
}