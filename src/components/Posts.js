import React from "react";
import Post from "./Post";
import { Grid } from "semantic-ui-react";

const Posts = ({ posts }) => {
  return (
    <div>
      <Grid columns={3} divided>
        <Grid.Row>
          {posts &&
            posts.map((post) => {
              return (
                <Grid.Column key={post.id}>
                  <Post key={post.id} post={post}></Post>
                </Grid.Column>
              );
            })}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Posts;
