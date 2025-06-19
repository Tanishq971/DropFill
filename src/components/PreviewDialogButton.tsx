import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { cn } from "@/lib/utils";
const PreviewDialogButton = () => {
  const {elements , formColor} = useDesigner()
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Preview</Button>
      </DialogTrigger>
      <DialogContent
        className={cn(`
       w-screen h-screen max-h-screen max-w-screen flex flex-col flex-grow p-0 gap-0` , formColor )}
      >
        <div className="px-4 py-2 border-b ">
          <p className="text-lg font-bold text-white">Form Preview</p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to your users
          </p>
        </div>
        <div className="bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] flex flex-col flex-grow items-center justify-center">
           <div className="max-w-[620px] flex flex-col gap-4 flex-grow   h-full w-full p-8 overflow-y-auto rounded-2xl  ">
            {
              elements.map((elem) =>{
                const FormElementPreview = FormElements[elem.type].designerComponent
                return <div className="text-white">
                     <FormElementPreview elementInstance={elem}></FormElementPreview>
                </div>
              })
            }
           </div>
          
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogButton;
