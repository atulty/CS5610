"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink
          href="/Labs"
          as={Link}
          className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}
        >
          Labs
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab1"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}
        >
          Lab 1
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab2"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}
        >
          Lab 2
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab3"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}
        >
          Lab 3
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab4"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab4") ? "active" : ""}`}
        >
          Lab 4
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab5"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab5") ? "active" : ""}`}
        >
          Lab 5
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/" as={Link}>
          Kambaz
        </NavLink>
      </NavItem>

      {/* ------------------------------ */}
      {/* NEW REQUIRED DELIVERABLE LINKS */}
      {/* ------------------------------ */}

      <NavItem>
        <NavLink href="https://github.com/atulty/CS5610/tree/a5/kambaz-next-js_A5_Atul">
          A5 Frontend Repo
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="https://github.com/atulty/kambaz-node-server-app">
          A5 Backend Repo
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="https://kambaz-node-server-app-zy2i.onrender.com">
          Render Server Root
        </NavLink>
      </NavItem>
    </Nav>
  );
}
