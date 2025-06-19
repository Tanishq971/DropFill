"use client";
import React , {useEffect} from "react";
import { Form } from "@prisma/client";
import PreviewDialogButton from "./PreviewDialogButton";
import SaveFormButton from "./SaveFormButton";
import PublishFormButton from "./PublishFormButton";
import Designer from "./Designer";
import { DndContext, useSensor , MouseSensor , useSensors, TouchSensor} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner";
import { redirect, usePathname } from 'next/navigation'



const FormBuilder = ({ form }: { form: Form }) => {
  const {setElements} = useDesigner();
  const mouseSensor = useSensor(MouseSensor , {
    activationConstraint:{
      distance:20 // after 10px distance is consideerd drag other wise it should be considered as touch  
    }
  })
    const pathname = usePathname()
  
  console.log(pathname);
  const touchSensor = useSensor(TouchSensor , {
    activationConstraint:{
      delay:300, //delay od 300 ms
      tolerance:5 // 5 px tolerance
    }
  })
   
  useEffect(()=>{
     const elem = JSON.parse(form.content)
     setElements(elem)
  } , [form , setElements])
  const sensors = useSensors(mouseSensor)
  return (
    <DndContext sensors={sensors}>
      <main className="relative flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
          </div>
        </div>
        {/* //dotted background with a height of 200px */}
        <div
          className="flex flex-grow  items-center justify-center relative overflow-y-auto h-screen bg-gray-50 dark:bg-gray-800
           bg-[radial-gradient(rgba(128,128,128,0.6)_1px,transparent_1px)] bg-[length:20px_20px]"
        >
          <Designer ></Designer>
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
