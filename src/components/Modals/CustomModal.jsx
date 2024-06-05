import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const CustomModal = ({
  isOpen,
  onOpenChange,
  children,
  title,
  size,
  modalPlacement,
}) => {
  return (
    <>
      <Modal
        backdrop="opaque"
        size={size}
        placement={modalPlacement}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          body: "py-6",
          backdrop: "backdrop-blur-sm hover:backdrop-blur-lg",
          base: "border-[#D1D5DB] bg-[#ffffff] dark:bg-[#1F2937] text-[#1F2937]", // Gris claro y texto gris oscuro
          header: "border-b-[1px] border-[#D1D5DB]", // Gris medio
          footer: "border-t-[1px] border-[#D1D5DB]", // Gris medio
          closeButton: "hover:bg-[#E5E7EB] active:bg-[#D1D5DB]", // Gris claro y medio
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-[0px]">
                <h3 className="text-[1.3rem] font-bold"> {title}</h3>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
