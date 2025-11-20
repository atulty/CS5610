/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Card, FormGroup } from "react-bootstrap";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams() as { cid: string; aid: string };
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Source of truth: Redux
  const assignments = useSelector(
    (s: any) => s.assignmentsReducer.assignments
  ) as any[];

  const isNew = aid === "new";
  const existing = assignments.find(
    (a: any) =>
      String(a._id) === String(aid) && String(a.course) === String(cid)
  );

  // Allow ?edit=true to enter edit mode for an existing assignment
  const isEditQuery = searchParams.get("edit") === "true";
  const [isEditMode, setIsEditMode] = useState<boolean>(isNew || isEditQuery);

  // Local form state (controlled inputs). Defaults mirror your original UI.
  const [assignment, setAssignment] = useState<any>({
    _id: existing?._id ?? (isNew ? "" : aid),
    title: existing?.title ?? (isNew ? "New Assignment" : existing?._id ?? ""),
    course: cid,
    description:
      existing?.description ??
      `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
* Your full name and section
* Links to each of the lab assignments
* Link to the Kambaz application
* Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`,
    points: existing?.points ?? 100,
    group: existing?.group ?? "ASSIGNMENTS",
    displayGradeAs: existing?.displayGradeAs ?? "Percentage",
    submissionType: existing?.submissionType ?? "Online",
    // date fields split (editor* are yyyy-mm-dd as in your screen)
    editorDueDate: existing?.editorDueDate ?? "",
    editorAvailableFrom: existing?.editorAvailableFrom ?? "",
    editorAvailableUntil: existing?.editorAvailableUntil ?? "",
  });

  const handleSave = () => {
    const payload = {
      ...assignment,
      course: cid,
      // compose friendly strings like Piyush did
      dueDate: assignment.editorDueDate
        ? `${assignment.editorDueDate} at 11:59pm`
        : "",
      availableFrom: assignment.editorAvailableFrom
        ? `${assignment.editorAvailableFrom} at 12:00am`
        : "",
      availableUntil: assignment.editorAvailableUntil
        ? `${assignment.editorAvailableUntil} at 11:59pm`
        : "",
    };

    if (isNew) {
      dispatch(addAssignment(payload));
    } else {
      dispatch(updateAssignment(payload));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <Row className="mb-3">
        <Col>
          <FormGroup>
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control
              type="text"
              id="wd-name"
              size="lg"
              value={assignment.title}
              onChange={(e) =>
                setAssignment((a: any) => ({ ...a, title: e.target.value }))
              }
              disabled={!isEditMode}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Control
              as="textarea"
              id="wd-description"
              rows={8}
              value={assignment.description}
              onChange={(e) =>
                setAssignment((a: any) => ({
                  ...a,
                  description: e.target.value,
                }))
              }
              disabled={!isEditMode}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-points">Points</Form.Label>
        </Col>
        <Col md={9}>
          <Form.Control
            type="number"
            id="wd-points"
            value={assignment.points}
            onChange={(e) =>
              setAssignment((a: any) => ({
                ...a,
                points: parseInt(e.target.value || "0", 10),
              }))
            }
            disabled={!isEditMode}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
        </Col>
        <Col md={9}>
          <Form.Select
            id="wd-group"
            value={assignment.group}
            onChange={(e) =>
              setAssignment((a: any) => ({ ...a, group: e.target.value }))
            }
            disabled={!isEditMode}
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-display-grade-as">
            Display Grade as
          </Form.Label>
        </Col>
        <Col md={9}>
          <Form.Select
            id="wd-display-grade-as"
            value={assignment.displayGradeAs}
            onChange={(e) =>
              setAssignment((a: any) => ({
                ...a,
                displayGradeAs: e.target.value,
              }))
            }
            disabled={!isEditMode}
          >
            <option>Percentage</option>
            <option>Points</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
        </Col>
        <Col md={9}>
          <Card className="p-3">
            <Form.Select
              id="wd-submission-type"
              className="mb-3"
              value={assignment.submissionType}
              onChange={(e) =>
                setAssignment((a: any) => ({
                  ...a,
                  submissionType: e.target.value,
                }))
              }
              disabled={!isEditMode}
            >
              <option>Online</option>
              <option>On Paper</option>
              <option>External Tool</option>
            </Form.Select>

            <div>
              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <Form.Check
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
                className="mb-2"
                disabled={!isEditMode}
              />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                className="mb-2"
                defaultChecked
                disabled={!isEditMode}
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
                className="mb-2"
                disabled={!isEditMode}
              />
              <Form.Check
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
                className="mb-2"
                disabled={!isEditMode}
              />
              <Form.Check
                type="checkbox"
                id="wd-file-upload"
                label="File Uploads"
                disabled={!isEditMode}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label>Assign</Form.Label>
        </Col>
        <Col md={9}>
          <Card className="p-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
              <div className="wd-assign-to-container">
                <span className="wd-assign-tag">
                  Everyone{" "}
                  <button className="wd-remove-tag" disabled={!isEditMode}>
                    ×
                  </button>
                </span>
              </div>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-due-date"
                    value={
                      assignment.editorDueDate
                        ? `${assignment.editorDueDate}T23:59`
                        : ""
                    }
                    onChange={(e) =>
                      setAssignment((a: any) => ({
                        ...a,
                        editorDueDate: e.target.value.split("T")[0],
                      }))
                    }
                    disabled={!isEditMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="wd-available-from">
                    Available From
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-available-from"
                    value={
                      assignment.editorAvailableFrom
                        ? `${assignment.editorAvailableFrom}T00:00`
                        : ""
                    }
                    onChange={(e) =>
                      setAssignment((a: any) => ({
                        ...a,
                        editorAvailableFrom: e.target.value.split("T")[0],
                      }))
                    }
                    disabled={!isEditMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-available-until"
                    value={
                      assignment.editorAvailableUntil
                        ? `${assignment.editorAvailableUntil}T23:59`
                        : ""
                    }
                    onChange={(e) =>
                      setAssignment((a: any) => ({
                        ...a,
                        editorAvailableUntil: e.target.value.split("T")[0],
                      }))
                    }
                    disabled={!isEditMode}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end gap-2 mb-4">
        {isEditMode ? (
          <>
            <Button variant="secondary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => router.push(`/Courses/${cid}/Assignments`)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => setIsEditMode(true)}>
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Assignments`)}
            >
              Done
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
