import React, { useContext } from 'react';
import { DesignerContext } from '../context/DesignerContext';

const useDesigner = () => {
    const context = useContext(DesignerContext)
    if(!context){
        throw new Error("Nothing in use Designer ")
    }
    return context;
}


export default useDesigner;