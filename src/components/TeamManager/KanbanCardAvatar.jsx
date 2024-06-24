import { Avatar, AvatarGroup, Tooltip } from "@nextui-org/react";
const KanbanCardAvatar = ({ task }) => {
  return (
    <AvatarGroup isBordered className="cursor-pointer z-0">
      <Tooltip content={task.sellerName}>
        {task.sellerAvatar === null ? (
          <Avatar size="sm" name={task.sellerName} src={task.sellerAvatar} />
        ) : (
          <Avatar
            size="sm"
            name={task.sellerName}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        )}
      </Tooltip>
      <Tooltip content={task.internalLawyerName}>
        {task.internalLawyerAvatar === null ? (
          <Avatar size="sm" name={task.internalLawyerName} />
        ) : (
          <Avatar
            size="sm"
            name={task.internalLawyerName}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        )}
      </Tooltip>
      <Tooltip content={task.externalLawyerName}>
        {task.externalLawyerAvatar === null ? (
          <Avatar size="sm" name={task.externalLawyerName} />
        ) : (
          <Avatar
            size="sm"
            name={task.externalLawyerName}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        )}
      </Tooltip>
    </AvatarGroup>
  );
};

export default KanbanCardAvatar;
