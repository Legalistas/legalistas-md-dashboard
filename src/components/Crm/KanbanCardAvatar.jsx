import { Avatar, AvatarGroup, Tooltip } from "@nextui-org/react";
const KanbanCardAvatar = ({ lead }) => {
  return (
    <AvatarGroup isBordered className="cursor-pointer z-0">
      <Tooltip content={lead.sellerName}>
        {lead.sellerAvatar === null ? (
          <Avatar size="sm" name={lead.sellerName} src={lead.sellerAvatar} />
        ) : (
          <Avatar
            size="sm"
            name={lead.sellerName}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        )}
      </Tooltip>
      <Tooltip content={lead.internalLawyerName}>
        {lead.internalLawyerAvatar === null ? (
          <Avatar size="sm" name={lead.internalLawyerName} />
        ) : (
          <Avatar
            size="sm"
            name={lead.internalLawyerName}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        )}
      </Tooltip>
      <Tooltip content={lead.externalLawyerName}>
        {lead.externalLawyerAvatar === null ? (
          <Avatar size="sm" name={lead.externalLawyerName} />
        ) : (
          <Avatar
            size="sm"
            name={lead.externalLawyerName}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        )}
      </Tooltip>
    </AvatarGroup>
  );
};

export default KanbanCardAvatar;
