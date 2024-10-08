import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

const initialFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function AuthPage() {
  const [formToDisplay, setFormToDisplay] = useState("signin");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormData);
  const { signIn, signUp } = useAuth();

  const handleToggleDisplayedForm = () =>
    setFormToDisplay((currForm: string) =>
      currForm === "signin" ? "signup" : "signin"
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formToDisplay === "signin") handleSignIn();
    else handleSignUp();
  };

  const handleSignIn = async () => {
    const { username, password } = formData;
    try {
      await signIn(username, password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors({ ...initialFormData, ...error.error });
    }
  };
  const handleSignUp = async () => {
    const { username, email, password, confirmPassword } = formData;
    try {
      await signUp(username, email, password, confirmPassword);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors({ ...initialFormData, ...error.error });
    }
  };

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const headingText = formToDisplay === "signin" ? "Sign In" : "Create Account";

  return (
    <Container as="main">
      <h1 className="text-center">{headingText}</h1>
      <Row className="d-flex justify-content-center">
        <Form className="col-6" onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="username">Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <Form.Text className="text-danger">{errors.username}</Form.Text>
          </Form.Group>
          {formToDisplay === "signup" && (
            <Form.Group className="mb-2">
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            </Form.Group>
          )}
          <Form.Group className="mb-2">
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          </Form.Group>
          {formToDisplay === "signup" && (
            <Form.Group className="mb-2">
              <Form.Label htmlFor="confirmPassword">
                Confirm Password:
              </Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <Form.Text className="text-danger">
                {errors.confirmPassword}
              </Form.Text>
            </Form.Group>
          )}
          <Form.Group className="mb-2 mt-2">
            <Button type="submit" className="btn-primary">
              {formToDisplay === "signin" ? "Sign In" : "Create Account"}
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Label
              id="form-switch-toggle"
              className=" d-flex justify-content-center gap-2 align-items-baseline"
            >
              Sign In
              <Form.Check
                className="ms-2"
                type="switch"
                name="form-switch-toggle"
                id="toggle-form"
                onChange={handleToggleDisplayedForm}
              />
              Create Account
            </Form.Label>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}

export default AuthPage;
