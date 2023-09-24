import React, { useRef, useState } from "react";
import { Button, Form, Input, Loader, Message } from "semantic-ui-react";
import { login } from "../../utils/auth";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inline_messages, setInlineMessages] = useState({});
  const [messages, setMessages] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [disable, setDisable] = useState(false);
  const testRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInlineMessages({});
    setMessages([]);
    setHasError(false);
    setDisable(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    login(formData).then(({ data, status }) => {
      setDisable(false);
      if (status === 400) {
        setInlineMessages(data);
      }
      if (status === 401) {
        setHasError(true);
        setMessages(data.detail);
      }
      if (status === 200) {
        onLogin(data.access);
        window.location.reload();
      }
    });
  };

  return (
    <Form error={hasError} ref={testRef}>
      <Message error header="Error" content={messages} />
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
      <Button type="submit" onClick={handleSubmit} disabled={disable}>
        Login
      </Button>
      <Loader active={!disable} inline />
    </Form>
  );
};

export default Login;
