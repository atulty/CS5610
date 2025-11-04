/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import EnrollmentControls from "./EnrollmentControls";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const courses = useSelector((s: any) => s.coursesReducer.courses);
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentsReducer);

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  // Auth guard
  useEffect(() => {
    if (!currentUser) router.push("/Account/Signin");
  }, [currentUser, router]);
  if (!currentUser) return null;

  // Which courses to show
  const visibleCourses =
    showAllCourses || currentUser.role !== "STUDENT"
      ? courses
      : courses.filter((c: any) =>
          enrollments?.some(
            (en: any) => en.user === currentUser._id && en.course === c._id
          )
        );

  const canEditCourses =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          {currentUser.role === "STUDENT" && !showAllCourses
            ? "My Courses"
            : "All Courses"}{" "}
          ({visibleCourses.length})
        </h2>

        {currentUser.role === "STUDENT" && (
          <Button
            variant="primary"
            onClick={() => setShowAllCourses((v) => !v)}
          >
            {showAllCourses ? "Enrollments" : "All Courses"}
          </Button>
        )}
      </div>

      <hr />

      {/* Course management (Faculty/Admin only) */}
      {canEditCourses && (
        <>
          <h5 className="mt-2">
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            rows={3}
            as="textarea"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: any) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={c.image}
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>

                    <div className="d-flex justify-content-between align-items-center">
                      <button className="btn btn-primary">Go</button>

                      {canEditCourses && (
                        <div>
                          <button
                            id="wd-delete-course-click"
                            className="btn btn-danger"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(c._id));
                            }}
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            className="btn btn-warning ms-2"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(c);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Enrollment controls for students */}
                    <EnrollmentControls
                      courseId={c._id}
                      showAllCourses={showAllCourses}
                    />
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
