"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

export default function GroupControlButtons({
  groupId,
  deleteGroup,
  editGroup,
}: {
  groupId: string;
  deleteGroup: (groupId: string) => void;
  editGroup: (groupId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  return (
    <div className="float-end d-flex align-items-center gap-2">
      {canEdit && (
        <>
          <FaPencil
            onClick={() => editGroup(groupId)}
            className="text-primary"
            title="Edit group"
          />
          <FaTrash
            onClick={() => deleteGroup(groupId)}
            className="text-danger"
            title="Delete group"
          />
        </>
      )}
      <FaCheckCircle className="text-success" />
      <FaPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
