import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";

import "./posts.scss";
import { S3Image } from "aws-amplify-react";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    maxHeight: "200px",
    height: "100%",
    overflow: "hidden",
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const userId = Auth.user.username;
  return (
    <section className="post__card">
      <Card className={classes.root}>
        <Link to={`/profile/${userId}/${post.collectionId}/${post.id}`}>
          <CardActionArea>
            <CardMedia className={classes.media}>
              <S3Image
                className="post__image"
                level="private"
                imgKey={post.image.key}
              />
            </CardMedia>
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h5">
                {post.caption}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                {post.date}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                {post.location}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </section>
  );
};

export default Post;
