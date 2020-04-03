import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./posts.scss";

const Post = ({ post }) => {
  console.log(Auth);
  const userId = Auth.user.username;
  return (
    <section className="post__card">
      <Card>
        <Link to={`/profile/${userId}/${post.collectionId}/${post.id}`}>
          <CardContent>
            <Typography variant="h5">{post.caption}</Typography>
          </CardContent>
        </Link>
      </Card>
    </section>
  );
};

export default Post;
