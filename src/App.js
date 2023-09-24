import { useEffect, useState } from "react";
import "./App.css";
import { Container, Header, Menu, MenuItem, Modal } from "semantic-ui-react";
import { getPosts } from "./utils/posts";
import Posts from "./components/Posts";
import Register from "./components/auth/Register";
import { getAccessToken, removeAccessToken } from "./utils/auth";
import { getUser } from "./utils/user";
import Login from "./components/auth/Login";

function App() {
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
    if (accessToken) {
      getUser().then((data) => setUser(data));
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
          {accessToken ? (
            <>
              <MenuItem key={1} link={true}>
                {user.username}
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
      <Container text>
        <Header as="h2">Welcome to the Blog</Header>
        {posts && <Posts posts={posts}></Posts>}
      </Container>
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
            <Register onRegister={(user) => setUser(user)} />
          )}
        </Modal.Content>
      </Modal>
    </>
  );
}

export default App;
