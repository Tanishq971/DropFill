"use client"

import {Dispatch, ReactNode , SetStateAction, createContext , useState} from "react" 
import { FormElementInstance } from "../FormElements"
type DesignerContextType = {
    elements:FormElementInstance[];
    addElement : (index:number , element: FormElementInstance) =>void;
    removeElement:(id:string)=>void;
    setElements:Dispatch<SetStateAction<FormElementInstance[]>>
    selectedElement:FormElementInstance|null;
    setSelectedElement:Dispatch<SetStateAction<FormElementInstance | null>>;
    updateElement:(id:string , element:FormElementInstance)=>void;
    formColor:string;
    setFormColor:Dispatch<SetStateAction<string | "bg-gray-200">>
}

export const DesignerContext = createContext<DesignerContextType | null>(null)
export default function DesignerContextProvider({children}:{
 children:ReactNode
}){
    const [elements , setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement  , setSelectedElement] = useState<FormElementInstance | null>(null);
    const [formColor , setFormColor] = useState<string>("bg-gray-200")
    const addElement = (index:number , element:FormElementInstance)=>{
        setElements((prev)=>{
            const newElements = [...prev]
             newElements.splice(index , 0 , element);
            return newElements;
        })
    }

    const removeElement = (id:string)=>{
        console.log("removing elements")
       setElements((prev)=> prev.filter((element)=>element.id !== id))
    }
   
    const updateElement = (id:string , element:FormElementInstance)=>{
        setElements((prev)=>{
          const newElements = [...prev];
          const index = newElements.findIndex(el=>el.id === id);
          newElements[index] = element;
          return newElements;
        })
    }
    return (<DesignerContext.Provider value={{elements,formColor , setFormColor , setElements,addElement , removeElement , selectedElement , setSelectedElement , updateElement}}>
           {children }
    </DesignerContext.Provider>)
}