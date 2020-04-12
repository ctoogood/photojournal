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
  IconButton,
} from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import {
  getPost,
  getCollection,
  collectionByDate,
} from "../../graphql/queries";
import "./posts.scss";
import { S3Image } from "aws-amplify-react";

const useStyles = makeStyles(() => ({
  root: {},
  imageContainer: {
    border: "1rem solid white",
    position: "relative",
  },
  breadcrumbs: {
    marginLeft: "0.5rem",
  },
  arrow: {
    color: "#FFFFFF",
    "&:hover": {
      color: "black",
    },
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0.5)",
    "&:hover": {
      color: "white",
    },
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
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

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
      const postList = await API.graphql(
        graphqlOperation(collectionByDate, {
          collectionId: collectionid,
          sortDirection: "DESC",
        })
      );
      const allPosts = postList.data.collectionByDate.items;
      const thisPost = allPosts.findIndex((i) => i.id === postid);
      const nextPostIndex = thisPost + 1;
      if (allPosts.length > nextPostIndex) {
        const nextPostId = allPosts[nextPostIndex].id;
        setNext(nextPostId);
      }
      const prevPostIndex = thisPost - 1;
      if (prevPostIndex >= 0) {
        const prevPostId = allPosts[prevPostIndex].id;
        setPrev(prevPostId);
      }
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
                <section className="postDetail__arrows">
                  {prev ? (
                    <Link
                      className="postDetail__arrows__left"
                      to={`/profile/${user.username}/${collectionid}/${prev}`}
                    >
                      <IconButton className={classes.icon}>
                        <ArrowBackIosIcon className={classes.arrow} />
                      </IconButton>
                    </Link>
                  ) : null}
                  {next ? (
                    <Link
                      className="postDetail__arrows__right"
                      to={`/profile/${user.username}/${collectionid}/${next}`}
                    >
                      <IconButton className={classes.icon}>
                        <ArrowForwardIosIcon className={classes.arrow} />
                      </IconButton>
                    </Link>
                  ) : null}
                </section>
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
