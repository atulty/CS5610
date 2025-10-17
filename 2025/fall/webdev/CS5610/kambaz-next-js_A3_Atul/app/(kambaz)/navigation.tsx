"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    // POINT Courses to Dashboard for now:
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  const isActive = (path: string): boolean =>
    typeof pathname === "string" && pathname.startsWith(path);

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        id="wd-neu-link"
        as="a"
        href="https://www.northeastern.edu/"
        target="_blank"
        rel="noopener noreferrer"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Account"
        action
        className={`d-flex flex-column align-items-center justify-content-center py-3 border-0 ${
          isActive("/Account") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            isActive("/Account") ? "text-danger" : "text-white"
          }`}
        />
        <div className="small mt-1">Account</div>
      </ListGroupItem>

      {links.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.path);
        return (
          <ListGroupItem
            key={link.label} // unique key (avoid duplicate-key warnings)
            as={Link}
            href={link.path}
            action
            className={`d-flex flex-column align-items-center justify-content-center py-3 border-0 ${
              active ? "bg-white text-danger" : "bg-black text-white"
            }`}
          >
            <Icon className={`fs-1 ${active ? "text-danger" : "text-white"}`} />
            <div className="small mt-1">{link.label}</div>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
