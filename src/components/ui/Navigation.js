import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, MenuItem, Modal } from "semantic-ui-react";
import { getAccessToken } from "../../utils/auth";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { removeAccessToken } from "../../utils/auth";
import { getUser } from "../../utils/user";

const Navigation = () => {
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");

  useEffect(() => {
    if (accessToken) {
      getUser().then((data) => {
        if (data.first_name !== "" || data.last_name !== "") {
          setName(data.first_name + " " + data.last_name);
        } else {
          setName(data.username);
        }
      });
    }
  }, [accessToken]);

  const handleLogout = () => {
    removeAccessToken();
    window.location.reload();
  };

  return (
    <>
      <Menu>
        <Container>
          <MenuItem key={1} as={Link} to="/">
            Home
          </MenuItem>
          {accessToken ? (
            <>
              <MenuItem key={1} as={Link} to="/my-account">
                {name}
              </MenuItem>
              <MenuItem key={2} link={true} onClick={handleLogout}>
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                key={1}
                link={true}
                onClick={() => {
                  setOpen(true);
                  setMode("login");
                }}
              >
                Login
              </MenuItem>
              <MenuItem
                key={2}
                link={true}
                onClick={() => {
                  setOpen(true);
                  setMode("register");
                }}
              >
                Register
              </MenuItem>
            </>
          )}
        </Container>
      </Menu>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>
          {mode === "login" ? "Login" : "Register Account"}
        </Modal.Header>
        <Modal.Content>
          {mode === "login" ? (
            <Login onLogin={(access) => setAccessToken(access)} />
          ) : (
            <Register />
          )}
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Navigation;
