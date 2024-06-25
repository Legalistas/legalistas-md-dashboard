import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Customers from "@/components/Customers/Customers";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

function page() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Clientes" />
            <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                <Customers />
            </div>
        </DefaultLayout>
    )
}

export default page