"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ListGroupItem } from "react-bootstrap";
import { courses } from "../../Database";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();
  const course = courses.find((c) => c._id === cid);

  const cidParam = course?._id ?? cid ?? "1234";

  const links = [
    { label: "Home", path: "Home" },
    { label: "Modules", path: "Modules" },
    { label: "Piazza", path: "Piazza" },
    { label: "Zoom", path: "Zoom" },
    { label: "Assignments", path: "Assignments" },
    { label: "Quizzes", path: "Quizzes" },
    { label: "Grades", path: "Grades" },
    { label: "People", path: "People/Table" },
  ];

  const makeHref = (linkPath: string): string =>
    `/Courses/${cidParam}/${linkPath}`;

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = makeHref(link.path);
        const active =
          typeof pathname === "string" &&
          (pathname === href || pathname.startsWith(href + "/"));

        return (
          <ListGroupItem
            key={link.label}
            as={Link}
            href={href}
            className={`list-group-item border-0 ${
              active ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </ListGroupItem>
        );
      })}
    </div>
  );
}
