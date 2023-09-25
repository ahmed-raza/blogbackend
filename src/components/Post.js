import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const Post = ({ post }) => {
  return (
    <Card>
      <Image src={process.env.REACT_APP_API_BASE_URL + post.image} wrapped />
      <Card.Content>
        <Card.Header>{post.title}</Card.Header>
        <Card.Description>{post.short_description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          <Icon name="user"></Icon>
          {post.user.username}
        </p>
        <p>
          <Icon name="calendar"></Icon>
          {post.created_at}
        </p>
      </Card.Content>
    </Card>
  );
};

export default Post;
