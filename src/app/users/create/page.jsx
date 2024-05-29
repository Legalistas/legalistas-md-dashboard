import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserMake from "@/components/Users/UserMake";

const UsersCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Miembros / Crear" />
      <div className="flex flex-col gap-10">
        <UserMake />
      </div>
    </DefaultLayout>
  );
};

export default UsersCreate;
