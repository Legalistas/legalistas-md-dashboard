import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CrmPipeline = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="CRM - Embudo" />
        <div className="flex flex-col gap-10"></div>
      </DefaultLayout>
    </>
  );
};

export default CrmPipeline;
