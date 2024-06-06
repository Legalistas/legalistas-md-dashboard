import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CausesTable from "@/components/Causes/CausesTable";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const Causes = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gestor de causas" />
      <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <CausesTable />
      </div>
    </DefaultLayout>
  );
};

export default Causes;
