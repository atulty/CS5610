/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { courses, enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const getInitialEnrollments = () => {
  // Only access sessionStorage on the client
  if (typeof window !== "undefined") {
    const storedEnrollments = sessionStorage.getItem("enrollments");
    return storedEnrollments ? JSON.parse(storedEnrollments) : enrollments;
  }
  return enrollments;
};

const initialState = {
  courses,
  enrollments: getInitialEnrollments(),
};

const makeNewCourse = (course: any) => ({
  _id: course._id || uuidv4(), // use server ID if present, otherwise generate
  name: course.name,
  number: course.number,
  startDate: course.startDate,
  endDate: course.endDate,
  department: course.department,
  credits: course.credits,
  description: course.description,
  image: course.image,
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // 🔹 Piyush: replace full course list (e.g., from server)
    setCourses: (state, { payload }) => {
      state.courses = payload;
    },

    // 🔹 Atul: existing addNewCourse (kept)
    addNewCourse: (state, { payload: course }) => {
      const newCourse = makeNewCourse(course);
      state.courses = [...state.courses, newCourse] as any;
    },

    // 🔹 Piyush: addCourse – same behavior, just alternate name
    addCourse: (state, { payload: course }) => {
      const newCourse = makeNewCourse(course);
      state.courses = [...state.courses, newCourse] as any;
    },

    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course: any) => course._id !== courseId
      );
    },

    // ✅ Use Atul’s signature: payload is the course object directly
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },

    // 🔹 Piyush: mark a course as being edited
    editCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : c
      ) as any;
    },

    // 🔹 Piyush: enroll with persistence
    enroll: (state, { payload: { user, course } }) => {
      const newEnrollment = {
        _id: uuidv4(),
        user: user._id,
        course: course._id,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "enrollments",
          JSON.stringify(state.enrollments)
        );
      }
    },

    // 🔹 Piyush: unenroll with persistence
    unenroll: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (e: { user: any; course: any }) =>
          !(e.course === course._id && e.user === user._id)
      );
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "enrollments",
          JSON.stringify(state.enrollments)
        );
      }
      // optional debug log from Piyush; keep or remove as you like
      console.log(
        "After unenroll:",
        JSON.stringify(state.enrollments, null, 2)
      );
    },
  },
});

export const {
  setCourses,
  addNewCourse,
  addCourse,
  deleteCourse,
  updateCourse,
  editCourse,
  enroll,
  unenroll,
} = coursesSlice.actions;

export default coursesSlice.reducer;
