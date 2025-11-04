"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Container, Button } from "react-bootstrap";
import { FormEvent } from "react";

export default function Signup() {
  const router = useRouter();

  const handleSignup = (event: FormEvent) => {
    event.preventDefault();
    // Redirect after signup
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
              defaultValue="john"
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="wd-password">
            <Form.Control
              placeholder="password"
              type="password"
              size="lg"
              defaultValue="password"
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
