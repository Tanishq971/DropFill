"use client"
import React from 'react';
import { Active , DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { set } from 'zod';
import { useState } from 'react';
import { ElementsType } from './FormElements';
import { SidebarButtonElementDragOverlay } from './SidebarButtonElement';
import { FormElements } from './FormElements';
import { DesignerElementWrapperOverlay } from './Designer';
import useDesigner from './hooks/useDesigner';
const DragOverlayWrapper = () => {
    const [draggedItem , setDraggedItem] = useState<Active | null>(null);
    const {elements} = useDesigner()
    useDndMonitor({
        onDragStart:(event)=>{
            console.log("Drag started", event);
            setDraggedItem(event.active);
        },
        onDragCancel:()=>{
            setDraggedItem(null);
        },
        onDragEnd : ()=>{
            setDraggedItem(null);
        }
    })
  
    let node = <div className='text-white'>No Drag overlay</div>
    const isSidebarButtonElement = draggedItem?.data?.current?.isDesignerButtonElement

    if(isSidebarButtonElement){
        const type = draggedItem?.data?.current?.type as ElementsType
        node = <SidebarButtonElementDragOverlay formElement = {FormElements[type]}/>
    }

    const isDraggableFormComponent = draggedItem?.data?.current?.isDesignerElement
    if(isDraggableFormComponent){
        const elementId = draggedItem?.data?.current?.elementId
        const element = elements.find((el)=>el.id === elementId)
        if(!element){ 
            node = <div>No element found</div>
        }else{
            const DesignerElementComponent = FormElements[element.type].designerComponent
         node = <div className='flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 bg-opacity-80 '>
             <DesignerElementComponent elementInstance={element}></DesignerElementComponent>
         </div>
        }

    }
    return <DragOverlay>
         {node}
    </DragOverlay>;
}

export default DragOverlayWrapper;