import { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";
import { getPosts } from "../utils/posts";
import Posts from "./Posts";

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <>
      <Container>
        <Header as="h2">Welcome to the Blog</Header>
        {posts && <Posts posts={posts}></Posts>}
      </Container>
    </>
  );
};

export default Main;
