import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MakeClient from "@/components/Customers/MakeClient";

const UsersCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Miembros / Crear" />
      <div className="flex flex-col gap-10">
        <MakeClient />
      </div>
    </DefaultLayout>
  );
};

export default UsersCreate;
