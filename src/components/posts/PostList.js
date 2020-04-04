import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";

import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { listPosts, getCollection } from "../../graphql/queries";
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

  const [posts, setPosts] = useState([]);
  const [thisCollection, setThisCollection] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const getPosts = useCallback(async () => {
    try {
      const response = await API.graphql(
        graphqlOperation(listPosts, {
          filter: { collectionId: { eq: collectionid } },
        })
      );
      const list = response.data.listPosts.items;
      setPosts(list);
      const collection = await API.graphql(
        graphqlOperation(getCollection, { id: collectionid })
      );
      const collectionData = collection.data.getCollection;
      setThisCollection(collectionData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [collectionid]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="postsList__main">
      <Dialog className={classes.dialog} open={open} onClose={handleClose}>
        <AddPost collection={collectionid} />
      </Dialog>
      {isLoading ? null : (
        <>
          <h1>{thisCollection.name}</h1>
          <IconButton onClick={handleClick} className={classes.icon}>
            <AddIcon color="primary" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={openDialog}>Add Post</MenuItem>
          </Menu>
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
