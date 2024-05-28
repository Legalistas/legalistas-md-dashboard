import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserTable from "@/components/Users/UserTable";

const Users = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Miembros" />
      <div className="flex flex-col gap-10">
        <UserTable />
      </div>
    </DefaultLayout>
  );
};

export default Users;
