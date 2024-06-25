import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import AddNoteIcon from "@/components/Icons/AddNoteIcon";
import CopyDocumentIcon from "@/components/Icons/CopyDocumentIcon";
import EditDocumentIcon from "@/components/Icons/EditDocumentIcon";
import DeleteDocumentIcon from "@/components/Icons/DeleteDocumentIcon";

const CauseActions = ({ iconClasses }) => {
  return (
    <div className="flex justify-end space-x-2">
      <Dropdown>
        {/* Important: Dropdown needs to be a named export for it to work */}
        <DropdownTrigger>
          <Button variant="bordered">Open Menu</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownSection title="Actions" showDivider>
            <DropdownItem
              key="new"
              shortcut="⌘N"
              description="Create a new file"
              startContent={<AddNoteIcon className={iconClasses} />}
            >
              New file
            </DropdownItem>
            <DropdownItem
              key="copy"
              shortcut="⌘C"
              description="Copy the file link"
              startContent={<CopyDocumentIcon className={iconClasses} />}
            >
              Copy link
            </DropdownItem>
            <DropdownItem
              key="edit"
              shortcut="⌘⇧E"
              description="Allows you to edit the file"
              startContent={<EditDocumentIcon className={iconClasses} />}
            >
              Edit file
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger zone">
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              description="Permanently delete the file"
              startContent={
                <DeleteDocumentIcon
                  className={cn(iconClasses, "text-danger")}
                />
              }
            >
              Delete file
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
