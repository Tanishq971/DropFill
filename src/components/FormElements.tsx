import { TextFieldFormElement } from "./fields/TextFields";
import { TitleFieldFormElement } from "./fields/TitleFields";
import { SpaceFieldFormElement } from "./fields/SpaceField";

export type ElementsType = "TextField" | "TitleField" | "SpaceField"

export type submitValueType = (id:string , value:string)=>void

export type FormElement = {
    type: ElementsType;
    designerButtonElement:{
    icon: any;
    label: string;
    }
    construct: (id:string)=>FormElementInstance;
    designerComponent: React.FC<{elementInstance:FormElementInstance}>;
    formComponent: React.FC<{elementInstance:FormElementInstance , submitValue?:(id:string , value:string)=>void , isInValid?:boolean}>;
    propertiesComponent: React.FC<{elementInstance:FormElementInstance}>;
    validate:(FormElement:FormElementInstance , currentValue:string) =>boolean
};

type FormElementsType = {
    [key in ElementsType] : FormElement;
}

export type FormElementInstance = {
    id:string ;
    type:ElementsType;
    extraAttributes?: Record<string, any>;
}


export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SpaceField: SpaceFieldFormElement
}