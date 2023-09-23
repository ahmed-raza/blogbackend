import React from "react";
import { Card, Icon } from "semantic-ui-react";

const Post = ({ post }) => {
  return (
    <Card>
      <Card.Content header={post.title} />
      <Card.Content description={post.short_description} />
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
