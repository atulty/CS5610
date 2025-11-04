/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useEffect, useState } from "react";
import CourseNavigation from "./navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { cid } = useParams() as { cid: string };

  // Redux sources of truth (matches Piyush)
  const { courses } = useSelector((s: any) => s.coursesReducer);
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentsReducer);

  const course = courses?.find((c: any) => String(c._id) === String(cid));
  const [showNav, setShowNav] = useState(false);

  // Auth + authorization (students must be enrolled in this course)
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    if (currentUser.role === "STUDENT") {
      const isEnrolled = enrollments?.some(
        (e: any) =>
          e.user === currentUser._id && String(e.course) === String(cid)
      );
      if (!isEnrolled) router.push("/Dashboard");
    }
  }, [cid, currentUser, enrollments, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNav((v) => !v)}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className={showNav ? "d-block d-md-block" : "d-none d-md-block"}>
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
