/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { deleteAssignment, setAssignments } from "./reducer";
import * as client from "../../client";

import AssignmentControls from "./FormControlButton";
import GroupControlButtons from "./ControlButton";
import AssignmentControlButtons from "./AssignmentControl";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // Source of truth: Redux
  const assignments = useSelector(
    (s: any) => s.assignmentsReducer.assignments
  ) as any[];

  // Filter to current course (preserve your String(...) safety)
  const courseAssignments = assignments.filter(
    (a: any) => String(a.course) === String(cid)
  );

  // 🔄 NEW: fetch assignments from server for this course
  const fetchAssignments = async () => {
    try {
      const serverAssignments = await client.findAssignmentsForCourse(
        cid as string
      );
      dispatch(setAssignments(serverAssignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    if (cid) {
      fetchAssignments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  // Delete from server, then use your existing Redux deleteAssignment
  const handleDeleteAssignment = async (assignmentId: string) => {
    const ok = window.confirm(
      "Are you sure you want to remove this assignment?"
    );
    if (!ok) return;

    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
      alert("Failed to delete assignment. Please try again.");
    }
  };

  const handleEditAssignment = (assignmentId: string) => {
    // go to editor in edit mode (your behavior)
    router.push(`/Courses/${cid}/Assignments/${assignmentId}?edit=true`);
  };

  return (
    <div id="wd-assignments">
      {/* Your header controls, now wired to server-backed data */}
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0">
        <ListGroupItem className="wd-assignment-group p-0 mb-0 fs-5 border-gray">
          <div className="wd-assignment-header p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoChevronDown className="me-2" />
              <span className="fw-bold">ASSIGNMENTS</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="wd-assignment-percentage me-3">
                40% of Total
              </span>
              <GroupControlButtons />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {courseAssignments.map((crsAmt: any) => (
              <ListGroupItem
                key={crsAmt._id}
                className="wd-assignment-item p-3 ps-1 d-flex align-items-start"
              >
                <BsGripVertical className="me-2 fs-3 mt-1" />
                <FaFileAlt className="me-2 mt-1 text-success" />

                <div className="flex-grow-1">
                  {/* Link to read-only view (your route) */}
                  <Link
                    href={`/Courses/${crsAmt.course}/Assignments/${crsAmt._id}`}
                    className="text-decoration-none"
                  >
                    <strong className="text-dark">{crsAmt._id}</strong>
                  </Link>

                  <div className="text-muted small mt-1">
                    {/* ✅ Preserve your display style: red title, then dates/points */}
                    {crsAmt.title && (
                      <>
                        <span className="text-danger">{crsAmt.title}</span>
                        <span className="mx-1">|</span>
                      </>
                    )}
                    {crsAmt.availableFrom && (
                      <>
                        <span>
                          <strong>Not available until</strong>{" "}
                          {crsAmt.availableFrom}
                        </span>
                        <span className="mx-1">|</span>
                        <br />
                      </>
                    )}
                    {crsAmt.dueDate && (
                      <>
                        <span>
                          <strong>Due</strong> {crsAmt.dueDate}
                        </span>
                        <span className="mx-1">|</span>
                      </>
                    )}
                    <span>{crsAmt.points ?? 100} pts</span>
                  </div>
                </div>

                {/* Your existing control component, but now server-backed */}
                <AssignmentControlButtons
                  assignmentId={crsAmt._id}
                  deleteAssignment={handleDeleteAssignment}
                  editAssignment={handleEditAssignment}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
