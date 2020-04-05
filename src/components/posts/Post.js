import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { makeStyles } from "@material-ui/styles";

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  IconButton,
  CardHeader,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
} from "@material-ui/core";
import {
  MoreVert as MoreVertIcon,
  Delete,
  Edit,
  PhotoAlbum,
} from "@material-ui/icons";

import "./posts.scss";
import { deletePost, updateCollection } from "../../graphql/mutations";
import EditPost from "./EditPost";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

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

  const removePost = async () => {
    try {
      await API.graphql(
        graphqlOperation(deletePost, { input: { id: post.id } })
      );
      Storage.remove(post.image.key, { level: "private" })
        .then((result) => console.log(post.image.key, result))
        .catch((err) => console.log(err));

      alert("Post deleted");
    } catch (e) {
      console.log(e);
    }
  };

  const setCover = async () => {
    try {
      await API.graphql(
        graphqlOperation(updateCollection, {
          input: {
            id: post.collectionId,
            coverPhoto: {
              key: post.image.key,
              bucket: post.image.bucket,
              region: post.image.region,
            },
          },
        })
      );
      alert("Cover Image Changed");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="post__card">
      <Dialog open={open} onClose={handleClose}>
        <EditPost post={post} />
      </Dialog>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={removePost}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete Post" />
        </MenuItem>
        <MenuItem onClick={openDialog}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit Post" />
        </MenuItem>
        <MenuItem onClick={setCover}>
          <ListItemIcon>
            <PhotoAlbum />
          </ListItemIcon>
          <ListItemText primary="Set As Cover Image" />
        </MenuItem>
      </Menu>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
        />

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
                {date}
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
