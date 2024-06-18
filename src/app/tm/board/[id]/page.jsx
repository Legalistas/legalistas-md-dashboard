import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

function page() {
  return (
    <div>
        {/* Aca se muestra la tabla especifica por id */}
        <DefaultLayout>
            <Breadcrumb pageName="Teams " />
            
        </DefaultLayout>
    </div>
  )
}

export default page