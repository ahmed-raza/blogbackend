import React, { useRef, useState } from "react";
import { Button, Form, Input, Loader, Message } from "semantic-ui-react";
import { register } from "../../utils/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [disable, setDisable] = useState(false);
  const [inline_messages, setInlineMessages] = useState({});
  const [messages, setMessages] = useState([]);
  const [hasError, setHasError] = useState(false);
  const testRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    setInlineMessages({});
    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password2", password2);
    register(formData).then((data) => {
      setDisable(false);
      if (data.status === 400) {
        setInlineMessages(data.data);
        if (data.data.non_field_errors) {
          setHasError(true);
          setMessages(data.data.non_field_errors);
        }
      }
      if (data.status === 201) {
        window.location.reload();
      }
    });
  };

  return (
    <Form error={hasError} ref={testRef}>
      {messages && <Message error header="Error" content={messages} />}
      <Form.Field
        error={
          inline_messages.username && {
            content: inline_messages.username[0],
            pointing: "below",
          }
        }
        control={Input}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Form.Field
        control={Input}
        error={
          inline_messages.email && {
            content: inline_messages.email[0],
            pointing: "below",
          }
        }
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      ></Form.Field>
      <Form.Field>
        <input
          type="text"
          id="first_name"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <input
          type="text"
          id="last_name"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          type="password"
          placeholder="Password"
          error={
            inline_messages.password && {
              content: inline_messages.password[0],
              pointing: "below",
            }
          }
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          type="password"
          placeholder="Confirm Password"
          error={
            inline_messages.password2 && {
              content: inline_messages.password2[0],
              pointing: "below",
            }
          }
          onChange={(e) => setPassword2(e.target.value)}
        />
      </Form.Field>
      <Button type="submit" onClick={handleSubmit} disabled={disable}>
        Register
      </Button>
      <Loader active={!disable} inline />
    </Form>
  );
};

export default Register;
