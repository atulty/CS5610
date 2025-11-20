import Link from "next/link";
import * as db from "../Database";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";

export default function Dashboard() {
  const defaultCourses = [
    {
      _id: "HTML",
      name: "CS1010 HTML",
      image: "/images/html.jpg",
      description: "Structure of Web Pages with HTML Tags",
    },
    {
      _id: "CSS",
      name: "CS1020 CSS",
      image: "/images/css.jpg",
      description: "Styling Web Pages with Cascading Style Sheets",
    },
    {
      _id: "JavaScript",
      name: "CS1030 JavaScript",
      image: "/images/javascript.jpg",
      description: "Programming the Web with JavaScript",
    },
    {
      _id: "TypeScript",
      name: "CS1040 TypeScript",
      image: "/images/typescript.jpg",
      description: "Strongly Typed JavaScript for Large Applications",
    },
    {
      _id: "Redux",
      name: "CS1050 Redux",
      image: "/images/redux.jpg",
      description: "State Management for Web Applications",
    },
    {
      _id: "NextJS",
      name: "CS1060 Next.js",
      image: "/images/nextjs.jpg",
      description: "Full Stack Web Development with Next.js",
    },
    {
      _id: "GraphQL",
      name: "CS1070 GraphQL",
      image: "/images/graphql.jpg",
      description: "API Query Language for Modern Apps",
    },
    {
      _id: "Docker",
      name: "CS1080 Docker",
      image: "/images/docker.jpg",
      description: "Containerization for Developers",
    },
    {
      _id: "Kubernetes",
      name: "CS1090 Kubernetes",
      image: "/images/kubernetes.jpg",
      description: "Orchestrating Containers at Scale",
    },
    {
      _id: "CICD",
      name: "CS1100 CI/CD Pipelines",
      image: "/images/cicd.jpg",
      description: "Continuous Integration and Deployment",
    },
  ];

  // Use db.courses when available, otherwise fall back to defaultCourses.
  const courses =
    db && Array.isArray(db.courses) && db.courses.length
      ? db.courses
      : defaultCourses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image}
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
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
