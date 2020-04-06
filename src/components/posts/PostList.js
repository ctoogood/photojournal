import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { API, graphqlOperation, Auth, Cache } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";

import {
  CircularProgress,
  IconButton,
  Dialog,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { getCollection, collectionByDate } from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import Post from "./Post";
import "./posts.scss";
import AddPost from "./AddPost";

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  dialog: {
    padding: "2rem",
  },
}));

const PostsList = () => {
  const classes = useStyles();
  const { collectionid } = useParams();
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [thisCollection, setThisCollection] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const setCache = useCallback(
    (value) => {
      Cache.setItem(location.pathname, value);
    },
    [location]
  );

  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
  };

  const getPosts = useCallback(async () => {
    try {
      const response = await API.graphql(
        graphqlOperation(collectionByDate, {
          collectionId: collectionid,
          sortDirection: "DESC",
        })
      );
      const list = response.data.collectionByDate.items;
      setPosts(list);
      const collection = await API.graphql(
        graphqlOperation(getCollection, { id: collectionid })
      );
      const collectionData = collection.data.getCollection;
      setThisCollection(collectionData);
      setCache(collectionData);
      setIsLoading(false);
      console.log(Cache);
    } catch (e) {
      console.log(e);
    }
  }, [collectionid, setCache]);

  useEffect(() => {
    getPosts();
    getUser();
  }, [getPosts]);

  useEffect(() => {
    let subscription;
    async function createSubscription() {
      const user = await Auth.currentAuthenticatedUser();
      subscription = API.graphql(
        graphqlOperation(subscriptions.onCreatePost, { owner: user.username })
      ).subscribe({
        next: (data) => {
          const post = data.value.data.onCreatePost;
          setPosts((posts) => [...posts, post]);
        },
      });
    }
    createSubscription();
    return () => subscription.unsubscribe();
  }, [posts]);

  useEffect(() => {
    let deleted;
    async function deleteSubscription() {
      const user = await Auth.currentAuthenticatedUser();
      deleted = API.graphql(
        graphqlOperation(subscriptions.onDeletePost, { owner: user.username })
      ).subscribe({
        next: (deleteData) => {
          const post = deleteData.value.data.onDeletePost;
          setPosts(posts.filter((item) => item.id !== post.id));
        },
      });
    }
    deleteSubscription();
    return () => deleted.unsubscribe();
  }, [posts]);

  return (
    <section className="postsList__main">
      {isLoading ? null : (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to={`/profile/${user.username}`}>
            Profile
          </Link>
          <Typography color="textPrimary">{thisCollection.name}</Typography>
        </Breadcrumbs>
      )}
      <Dialog className={classes.dialog} open={open} onClose={handleClose}>
        <AddPost onClose={handleClose} collection={collectionid} />
      </Dialog>
      {isLoading ? null : (
        <>
          <h1>{thisCollection.name}</h1>
          <div className="postsList__add">
            <IconButton onClick={openDialog}>
              <AddIcon color="primary" />
            </IconButton>
            <p>Add Post</p>
          </div>
        </>
      )}
      <section className="postsList__grid">
        {isLoading ? (
          <CircularProgress />
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </section>
    </section>
  );
};

export default PostsList;
