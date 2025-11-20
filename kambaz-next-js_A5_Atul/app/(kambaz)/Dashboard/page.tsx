/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourses,
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";
import EnrollmentControls from "./EnrollmentControls";
import * as client from "../Courses/client";

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

  // 🔐 Auth guard
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    }
  }, [currentUser, router]);

  // 🌗 Load showAllCourses preference from sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.sessionStorage.getItem("showAllCourses");
    if (saved !== null) {
      setShowAllCourses(JSON.parse(saved));
    }
  }, []);

  // 🌗 Persist showAllCourses to sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(
      "showAllCourses",
      JSON.stringify(showAllCourses)
    );
  }, [showAllCourses]);

  // 🌐 Fetch courses from server
  const fetchCourses = async () => {
    try {
      const fetchedCourses = await client.findMyCourses();
      dispatch(setCourses(fetchedCourses));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // ⛳️ IMPORTANT: early return AFTER all hooks
  if (!currentUser) {
    return null;
  }

  const canEditCourses =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  // ➕ Create course on server, then update Redux
  const handleAddCourse = async () => {
    try {
      const newCourse = {
        ...course,
        image: course.image || "/images/reactjs.jpg",
      };
      const created = await client.createCourse(newCourse);
      dispatch(addNewCourse(created));

      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      });

      await fetchCourses();
    } catch (error: any) {
      if (error?.response?.status === 401) {
        console.error("Authentication error: Please sign in again");
        router.push("/Account/Signin");
      } else {
        console.error("Error creating course:", error);
        alert("Failed to create course. Please try again.");
      }
    }
  };

  // 🗑️ Delete course
  const handleDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(deleteCourse(courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
    }
  };

  // ✏️ Update course
  const handleUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(updateCourse(course));
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  // 🎯 Which courses to show
  const visibleCourses =
    showAllCourses || currentUser.role !== "STUDENT"
      ? courses
      : courses.filter((c: any) =>
          enrollments?.some(
            (en: any) => en.user === currentUser._id && en.course === c._id
          )
        );

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
              onClick={handleAddCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={handleUpdateCourse}
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
                    src={c.image || "/images/reactjs.jpg"}
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
                              handleDeleteCourse(c._id);
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
