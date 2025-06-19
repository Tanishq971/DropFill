import React from 'react';
import FormElementsSidebar from './FormElementsSidebar';
import useDesigner from './hooks/useDesigner';
import PropertiesFormSidebar from './PropertiesFormSidebar';




const Designersidebar = () => {
  const {selectedElement} = useDesigner()
    return <aside className='w-[400px]  max-w-[400px] m-2 rounded-xl  flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-gray-200 overflow-y-auto h-full '>
      {!selectedElement && <FormElementsSidebar/>}
      {selectedElement && <PropertiesFormSidebar/>}
      
    </aside>;
}

 

export default Designersidebar;