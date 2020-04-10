import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Breadcrumbs,
} from "@material-ui/core";

import { getPost, getCollection } from "../../graphql/queries";
import "./posts.scss";
import { S3Image } from "aws-amplify-react";

const useStyles = makeStyles(() => ({
  root: {},
  imageContainer: {
    border: "1rem solid white",
  },
  breadcrumbs: {
    marginLeft: "0.5rem",
  },
}));

const PostDetail = () => {
  const { postid, collectionid } = useParams();
  const classes = useStyles();

  const [post, setPost] = useState({});
  const [thisCollection, setThisCollection] = useState({});
  const [imageKey, setImageKey] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const newDate = new Date(post.date);
  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][newDate.getMonth()];
  const date = `${newDate.getDate()} ${month} ${newDate.getFullYear()}`;

  const thisPost = useCallback(async () => {
    setLoading(true);
    try {
      const postData = await API.graphql(
        graphqlOperation(getPost, { id: postid })
      );
      const postResult = postData.data.getPost;
      setPost(postResult);
      setImageKey(postResult.large.key);
      const collection = await API.graphql(
        graphqlOperation(getCollection, { id: collectionid })
      );
      const collectionData = collection.data.getCollection;
      setThisCollection(collectionData);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [postid, collectionid]);

  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
  };

  useEffect(() => {
    thisPost();
    getUser();
  }, [thisPost]);

  return (
    <section className="postDetail__main">
      {loading ? null : (
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
          <Link color="inherit" to={`/profile/${user.username}`}>
            Profile
          </Link>
          <Link
            color="inherit"
            to={`/profile/${user.username}/${collectionid}`}
          >
            {thisCollection.name}
          </Link>
          <Typography color="textPrimary">{post.title}</Typography>
        </Breadcrumbs>
      )}
      <section className="postDetail__card">
        {loading ? (
          <CircularProgress />
        ) : (
          <Card>
            <CardActionArea>
              <CardMedia className={classes.imageContainer}>
                <S3Image
                  className="postDetail__image"
                  level="private"
                  imgKey={imageKey}
                />
              </CardMedia>
              <CardContent>
                <Typography color="textPrimary" variant="h6">
                  {post.title}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  {post.caption}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  {date}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  {post.location}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </section>
    </section>
  );
};

export default PostDetail;
