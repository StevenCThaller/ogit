import React, { ChangeEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
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

    if (formToDisplay === "signIn") handleSignIn();
    else handleSignUp();
  };

  const handleSignIn = async () => {
    const { username, password } = formData;
    try {
      await signIn(username, password);
    } catch (error) {}
  };
  const handleSignUp = async () => {
    const { username, email, password, confirmPassword } = formData;
    try {
      await signUp(username, email, password, confirmPassword);
      await handleSignIn();
    } catch (error) {}
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormData((currFormData) => ({
      ...currFormData,
      [e.currentTarget.name]: e.currentTarget.value,
    }));

  const headingText = formToDisplay === "signin" ? "Sign In" : "Create Account";

  return (
    <Container as="main">
      <h1>{headingText}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Form.Text className="danger">{errors.username}</Form.Text>
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
            />
            <Form.Text className="danger">{errors.email}</Form.Text>
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
          <Form.Text className="danger">{errors.password}</Form.Text>
        </Form.Group>
        {formToDisplay === "signup" && (
          <Form.Group className="mb-2">
            <Form.Label htmlFor="confirmPassword">Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <Form.Text className="danger">{errors.confirmPassword}</Form.Text>
          </Form.Group>
        )}
        <Form.Group className="mb-2 mt-2">
          <Button type="submit" className="btn-primary">
            {formToDisplay === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center gap-2 align-items-baseline">
          <Form.Text>Sign In</Form.Text>
          <Form.Check
            className="ms-2"
            type="switch"
            id="toggle-form"
            onChange={handleToggleDisplayedForm}
          />
          <Form.Text>Create Account</Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default AuthPage;
