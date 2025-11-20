/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Container, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>({
    username: "john", // preserves your defaultValue
    password: "password",
  });

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    router.push("/Account/Profile");
  };

  return (
    <Container
      id="wd-signup-screen"
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ width: "350px" }}>
        <h3 className="mb-4">Sign up</h3>

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-2" controlId="wd-username">
            <Form.Control
              placeholder="username"
              size="lg"
              value={user.username ?? ""}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="wd-password">
            <Form.Control
              placeholder="password"
              type="password"
              size="lg"
              value={user.password ?? ""}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="wd-verify-password">
            <Form.Control
              placeholder="verify password"
              type="password"
              size="lg"
            />
          </Form.Group>

          <Button
            id="wd-signup-btn"
            type="submit"
            variant="primary"
            className="w-100 mb-2"
          >
            Sign up
          </Button>
        </Form>

        <Link
          id="wd-signin-link"
          href="/Account/Signin"
          className="text-decoration-none"
        >
          Sign in
        </Link>
      </div>
    </Container>
  );
}
