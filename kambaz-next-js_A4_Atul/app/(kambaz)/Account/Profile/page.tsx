"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { Form, Container, Button } from "react-bootstrap";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [profile, setProfile] = useState<any>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });

  // Load profile or protect route
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile({
      username: currentUser.username ?? "",
      password: currentUser.password ?? "",
      firstName: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      dob: currentUser.dob ?? "",
      email: currentUser.email ?? "",
      role: currentUser.role ?? "USER",
    });
  }, [currentUser, router]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  return (
    <Container
      id="wd-profile-screen"
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ width: "350px" }}>
        <h3 className="mb-4">Profile</h3>

        <Form>
          <Form.Control
            id="wd-username"
            className="wd-username mb-2"
            placeholder="username"
            size="lg"
            value={profile.username}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, username: e.target.value }))
            }
          />

          <Form.Control
            id="wd-password"
            className="wd-password mb-2"
            placeholder="password"
            type="password"
            size="lg"
            value={profile.password}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, password: e.target.value }))
            }
          />

          <Form.Control
            id="wd-firstname"
            className="mb-2"
            placeholder="First Name"
            size="lg"
            value={profile.firstName}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, firstName: e.target.value }))
            }
          />

          <Form.Control
            id="wd-lastname"
            className="mb-2"
            placeholder="Last Name"
            size="lg"
            value={profile.lastName}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, lastName: e.target.value }))
            }
          />

          <Form.Control
            id="wd-dob"
            className="mb-2"
            type="date"
            size="lg"
            value={profile.dob}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, dob: e.target.value }))
            }
          />

          <Form.Control
            id="wd-email"
            className="mb-2"
            type="email"
            placeholder="Email"
            size="lg"
            value={profile.email}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, email: e.target.value }))
            }
          />

          <Form.Select
            id="wd-role"
            className="mb-3"
            size="lg"
            value={profile.role}
            onChange={(e) =>
              setProfile((p: any) => ({ ...p, role: e.target.value }))
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form>

        <Button
          id="wd-signout-btn"
          variant="danger"
          className="w-100 text-decoration-none"
          onClick={signout}
        >
          Sign out
        </Button>
      </div>
    </Container>
  );
}
