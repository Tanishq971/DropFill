import React from 'react';
import useDesigner from './hooks/useDesigner';
import { Button } from './ui/button';
import { MdAddCircleOutline } from 'react-icons/md';
import { FormElementInstance , FormElements } from './FormElements';
import { RxCross1 } from "react-icons/rx";

const PropertiesFormSidebar = () => {
    const {selectedElement , setSelectedElement} = useDesigner();

    return <div className='flex flex-col p-2 bg-gray-200 text-gray-600 '>
        <div className="flex justify-between items-center">
            <p className='text-sm  '>Element Properties</p>
            <Button className='bg-gray-200 hover:bg-gray-200 shadow-none text-black font-bold'  onClick={()=>setSelectedElement(null)}>
               <RxCross1 height={20}></RxCross1>
            </Button>
        </div>
        <PropertiesForm element = {selectedElement}></PropertiesForm>
    </div>;
}



export default PropertiesFormSidebar;

function PropertiesForm({element} : {element:FormElementInstance | null}){
    if(!element) return null;
    console.log("current element-->" , element)
    let CurrElement = FormElements[element.type].propertiesComponent
    
    return <CurrElement elementInstance={element}></CurrElement>
}