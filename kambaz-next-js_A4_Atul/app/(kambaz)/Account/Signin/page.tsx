"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";
import { Form, Container, Button } from "react-bootstrap";

type Creds = { username: string; password: string };

export default function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<Creds>({
    username: "",
    password: "",
  });

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();

    const user = (db as any).users?.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    dispatch(setCurrentUser(user));
    router.push("/Dashboard");
  };

  return (
    <Container
      id="wd-signin-screen"
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ width: "350px" }}>
        <h3 className="mb-4">Sign in</h3>

        <Form onSubmit={handleSignin}>
          <Form.Control
            id="wd-username"
            className="wd-username mb-2"
            placeholder="username"
            size="lg"
            value={credentials.username}
            onChange={(e) =>
              setCredentials((c) => ({ ...c, username: e.target.value }))
            }
          />

          <Form.Control
            id="wd-password"
            className="wd-password mb-2 mt-1"
            placeholder="password"
            type="password"
            size="lg"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((c) => ({ ...c, password: e.target.value }))
            }
          />

          <Button id="wd-signin-btn" type="submit" className="w-100 mb-2 mt-2">
            Sign in
          </Button>
        </Form>

        <Link
          id="wd-signup-link"
          href="/Account/Signup"
          className="text-decoration-none"
        >
          Sign up
        </Link>
      </div>
    </Container>
  );
}
