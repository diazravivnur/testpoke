import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { API } from "../../config/Api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const users = { email, password, name };
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify(users);
      const response = await API.post("/regist", body, config);
      console.log(response);
      if (response.data.status === "Success") {
        setMessage("Email successfully registered");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister(e);
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>{" "}
        {message && (
          <div className="alert alert-info py-1">
            <small>{message}</small>
          </div>
        )}
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="Full name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onSubmit={handleRegister}>
        Submit
      </Button>
    </Form>
  );
};

export default Register;
