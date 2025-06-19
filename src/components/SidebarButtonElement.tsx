"use client";
import React from "react";
import { Button } from "./ui/button";
import { FormElement } from "./FormElements";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarButtonElement = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      className={cn(
        "flex flex-col gap-2 h-[120px] w-full items-center justify-center cursor-grab bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
        draggable.isDragging && "opacity-50"
      )}
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
      <p className="text-sm font-medium">{label}</p>
    </Button>
  );
};

export default SidebarButtonElement;

export const SidebarButtonElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      className={cn(
        "flex flex-col gap-2 h-[120px] w-full items-center justify-center cursor-grab bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 shadow-md opacity-90 transition-colors",
        draggable.isDragging && "ring-2 ring-blue-400 dark:ring-blue-500"
      )}
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
      <p className="text-sm font-medium">{label}</p>
    </Button>
  );
};