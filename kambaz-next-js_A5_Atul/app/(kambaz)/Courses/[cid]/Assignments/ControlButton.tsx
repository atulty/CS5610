"use client";
import { FaCheckCircle } from "react-icons/fa";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlus, FaTrash, FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";

type GroupControlButtonsProps = {
  groupId?: string;
  deleteGroup?: (groupId: string) => void;
  editGroup?: (groupId: string) => void;
};

export default function GroupControlButtons({
  groupId,
  deleteGroup = () => console.warn("deleteGroup() not implemented"),
  editGroup = () => console.warn("editGroup() not implemented"),
}: GroupControlButtonsProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const handleDelete = () => {
    if (groupId) deleteGroup(groupId);
    else console.warn("No groupId provided for deleteGroup");
  };

  const handleEdit = () => {
    if (groupId) editGroup(groupId);
    else console.warn("No groupId provided for editGroup");
  };

  return (
    <div className="float-end d-flex align-items-center gap-2">
      {canEdit && (
        <>
          <FaPencil
            onClick={handleEdit}
            className="text-primary cursor-pointer"
            title="Edit group"
          />
          <FaTrash
            onClick={handleDelete}
            className="text-danger cursor-pointer"
            title="Delete group"
          />
        </>
      )}
      <FaCheckCircle className="text-success" title="Completed" />
      <FaPlus className="fs-4 cursor-pointer" title="Add" />
      <IoEllipsisVertical
        className="fs-4 cursor-pointer"
        title="More options"
      />
    </div>
  );
}
