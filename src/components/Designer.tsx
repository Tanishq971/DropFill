"use client";

import Designersidebar from "./Designersidebar";
import {
  useDndMonitor,
  useDndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ElementsType, FormElementInstance, FormElements } from "./FormElements";
import { useState } from "react";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";


const Designer = () => {
  const { elements, addElement, removeElement ,formColor} = useDesigner();
  const objectjson = JSON.stringify(elements)
  // console.log(elements)
  // console.log ("stringified----->" , JSON.stringify(elements))
  // console.log ("Parsed----->" , JSON.parse(objectjson))
  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      // console.log("Active:", active);
      // console.log("Over:", over);

      if (!active || !over) return;

      const isDesignerButtonElement = active?.data?.current?.isDesignerButtonElement;
      const isDesignerElement = active?.data?.current?.isDesignerElement;

      // Case 1: Dropping a new element from the sidebar onto the main drop area
      const isOverDesignerDropArea = over.data?.current?.isDesignerDropArea;
      if (isDesignerButtonElement && isOverDesignerDropArea) {
        const type = active.data?.current?.type as ElementsType;
        const newElement = FormElements[type].construct(idGenerator());
        addElement(elements.length, newElement);
        console.log("Added new element:", newElement);
        return;
      }

      // Case 2: Dropping a new element from the sidebar onto an existing element
      const isDroppingOverTopHalf = over.data?.current?.isTopHalfDroppable;
      const isDroppingOverBottomHalf = over.data?.current?.isBottomHalfDroppable;
      if (isDesignerButtonElement && (isDroppingOverTopHalf || isDroppingOverBottomHalf)) {
        const type = active.data?.current?.type as ElementsType;
        const newElement = FormElements[type].construct(idGenerator());
        const overId = over.data?.current?.elementId;
        let overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          console.error("Over element not found:", overId);
          return;
        }
        if (isDroppingOverBottomHalf) {
          overElementIndex += 1; // Insert after the over element
        }
        addElement(overElementIndex, newElement);
        console.log("Added new element at index:", overElementIndex, newElement);
        return;
      }

      // Case 3: Reordering an existing element
      if (isDesignerElement && (isDroppingOverTopHalf || isDroppingOverBottomHalf)) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;
        const activeElementIndex = elements.findIndex((el) => el.id === activeId);
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        console.log("Active element index:", activeElementIndex);
        console.log("Over element index:", overElementIndex);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          console.error("Element not found:", { activeId, overId });
          return;
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);
        let newOverElementIndex = overElementIndex;
        if (isDroppingOverBottomHalf) {
          newOverElementIndex += 1; // Insert after the over element
        }
        // Adjust index if the active element was before the over element
        if (activeElementIndex < overElementIndex && !isDroppingOverBottomHalf) {
          newOverElementIndex -= 1;
        }
        addElement(newOverElementIndex, activeElement);
        console.log("Reordered element to index:", newOverElementIndex, activeElement);
      }
    },
  });

  // Make the main area droppable
  const droppable = useDroppable({
    id: "main-designer-component-id",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div ref={droppable.setNodeRef} className="text-white flex w-full h-full">
      <div className="p-4 w-full">
        <div
          className={cn(
            "bg-gray-300 text-white max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-white ring-inset" , formColor
          )}
        >
          {elements.length > 0 && (
            <div className="flex flex-col text-background w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
          {!droppable.isOver && (
            <p className="text-3xl text-white flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
        </div>
      </div>
      <Designersidebar />
    </div>
  );
};

export default Designer;

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [ismouseOver, setIsmouseOver] = useState<boolean>(false);
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const { active } = useDndContext();
  const isDragging = active?.id === element.id + "-drag-handler";

  const droppable = useDroppable({
    id: `${element.id}-top`,
    data: {
      elementId: element.id,
      isTopHalfDroppable: true,
    },
  });

  const droppable2 = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      isBottomHalfDroppable: true,
      elementId: element.id,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const DesignerElement = FormElements[element.type].designerComponent;

  if (isDragging) return null;

  if(element.type === "SpaceField"){
    return <div className="w-full bg-transparent h-3"> 
    </div>
  }

  return (
    <div
      onMouseEnter={() => setIsmouseOver(true)}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedElement(element);
      }}
      onMouseLeave={() => setIsmouseOver(false)}
      {...draggable.listeners}
      {...draggable.attributes}
      ref={draggable.setNodeRef}
      className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset cursor-grab text-white bg-white"
    >
      <div
        ref={droppable.setNodeRef}
        className={cn("absolute w-full h-1/2 rounded-t-md")}
      />
      <div
        ref={droppable2.setNodeRef}
        className={cn("absolute w-full h-1/2 bottom-0 rounded-b-md")}
      />
      {ismouseOver && (
        <>
          <div
            className="absolute right-0 rounded-r-md h-full pointer-events-auto"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="bg-red-500 px-10 w-[90px] hover:bg-red-600 flex justify-center h-full border rounded-md rounded-l-none"
              onClick={(event) => {
                event.stopPropagation();
                console.log("Clicked delete button for element:", element.id);
                removeElement(element.id);
              }}
            >
              <TrashIcon height={30} width={30} />
            </Button>
          </div>
        </>
      )}
      {droppable.isOver && (
        <div className="absolute top-0 w-full rounded-md rounded-b-none bg-white/90 h-[7px]" />
      )}
      {droppable2.isOver && (
        <div className="absolute bottom-0 w-full rounded-md rounded-t-none bg-white h-[7px]" />
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-white px-4 py-2 pointer-events-none",
          ismouseOver && "opacity-50"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}

export function DesignerElementWrapperOverlay({ element }: { element: FormElementInstance }) {
  const [ismouseOver, setIsmouseOver] = useState<boolean>(false);
  const { removeElement } = useDesigner();
  const droppable = useDroppable({
    id: `${element.id}-top`,
    data: {
      elementId: element.id,
      isTopHalfDroppable: true,
    },
  });

  const droppable2 = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      isBottomHalfDroppable: true,
      elementId: element.id,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return <div />;

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      onMouseEnter={() => setIsmouseOver(true)}
      onMouseLeave={() => setIsmouseOver(false)}
      {...draggable.listeners}
      {...draggable.attributes}
      ref={draggable.setNodeRef}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset cursor-grab"
    >
      <div
        ref={droppable.setNodeRef}
        className={cn("absolute w-full h-1/2 rounded-t-md")}
      />
      <div
        ref={droppable2.setNodeRef}
        className={cn("absolute w-full h-1/2 bottom-0 rounded-b-md")}
      />
      {ismouseOver && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="animate-pulse text-muted-foreground">
              click here for properties or drag to move
            </p>
          </div>
          <div
            className="absolute right-0 rounded-r-md h-full pointer-events-auto z-10"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="bg-red-500 px-10 w-[90px] hover:bg-red-600 flex justify-center h-full border rounded-md rounded-l-none"
              onClick={(event) => {
                event.stopPropagation();
                console.log("Clicked delete button in overlay for element:", element.id);
                removeElement(element.id);
              }}
            >
              <TrashIcon height={30} width={30} />
            </Button>
          </div>
        </>
      )}
      {droppable.isOver && (
        <div className="absolute top-0 w-full rounded-md rounded-b-none bg-primary h-[7px]" />
      )}
      {droppable2.isOver && (
        <div className="absolute bottom-0 w-full rounded-md rounded-t-none bg-primary h-[7px]" />
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-gray-800/40 px-4 py-2 pointer-events-none",
          droppable.isOver && "border-t-4 border-t-foreground",
          droppable2.isOver && "border-b-4 border-b-foreground"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}