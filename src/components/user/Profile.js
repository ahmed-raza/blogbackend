import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Header, Input } from "semantic-ui-react";
import { getUser, updateUser } from "../../utils/user";
import Messages from "../ui/Messages";

const Profile = () => {
  const testRef = useRef();
  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUser().then((data) => {
      setUserId(data.id);
      setUsername(data.username);
      setEmail(data.email);
      setFirstName(data.first_name);
      setLastName(data.last_name);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage("");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    updateUser(user_id, formData).then(({ data, status }) => {
      if (status === 400 || status === 401) {
        setErrors(data);
      }
      if (status === 200) {
        setMessage(data.message);
      }
    });
  };

  return (
    <>
      <Header as="h1">My Account</Header>
      <Messages message={message} show={message && true} />
      <Form ref={testRef}>
        <Form.Field
          error={errors.username}
          control={Input}
          label="Username"
          className="six wide"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Field
          error={errors.email}
          control={Input}
          label="Email"
          className="six wide"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Field
          error={errors.first_name}
          control={Input}
          label="First Name"
          className="six wide"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Form.Field
          error={errors.last_name}
          control={Input}
          label="First Name"
          className="six wide"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button type="submit" className="olive basic" onClick={handleUpdate}>
          Update
        </Button>
      </Form>
    </>
  );
};

export default Profile;
