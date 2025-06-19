import React from 'react';
import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';


const BuilderPage = async ({params} : {params:{
     id:string
    }}) => {
    
    const form  = await GetFormById(Number(params.id));
    if(!form) return <div>Form not made</div>

    return <FormBuilder form={form}>
         
    </FormBuilder>;
}


export default BuilderPage;


