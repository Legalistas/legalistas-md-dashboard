"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ImagesTwo from "@/components/Images/ImagesTwo";

const Images: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Images" />

      <div className="flex flex-col gap-7.5">
        <ImagesTwo />
      </div>
    </>
  );
};

export default Images;
