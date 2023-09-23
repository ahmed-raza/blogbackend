import { useEffect, useState } from "react";
import "./App.css";
import { Container, Header, Menu, MenuItem } from "semantic-ui-react";
import { getPosts } from "./utils/posts";
import Posts from "./components/Posts";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <>
      <Menu>
        <Container>
          <MenuItem key={1} link={true}>
            Login
          </MenuItem>
          <MenuItem key={2} link={true}>
            Register
          </MenuItem>
        </Container>
      </Menu>
      <Container text>
        <Header as="h2">Welcome to the Blog</Header>
        {posts && <Posts posts={posts}></Posts>}
      </Container>
    </>
  );
}

export default App;
