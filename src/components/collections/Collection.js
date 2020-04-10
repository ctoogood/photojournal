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
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  CardActions,
} from "@material-ui/core";
import { MoreVert as MoreVertIcon, Delete, Edit } from "@material-ui/icons";
import EditCollection from "./EditCollection";
import { deleteCollection, deletePost } from "../../graphql/mutations";

import "./collections.scss";
import { listPosts } from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  media: {
    height: "250px",
    overflow: "hidden",
  },
  content: {
    textAlign: "left",
    fontWeight: "lighter",
    position: "relative",
    height: "150px",
  },
  settings: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const Collection = (props) => {
  const classes = useStyles();
  const userId = Auth.user.username;
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

  const removeCollection = async () => {
    try {
      const collectionPosts = await API.graphql(
        graphqlOperation(listPosts, {
          filter: { collectionId: { eq: props.collection.id } },
        })
      );
      const results = collectionPosts.data.listPosts.items;
      await API.graphql(
        graphqlOperation(deleteCollection, {
          input: { id: props.collection.id },
        })
      );
      await results.forEach(async (post) => {
        await API.graphql(
          graphqlOperation(deletePost, { input: { id: post.id } })
        );
        Storage.remove(post.original.key, { level: "private" })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
        Storage.remove(post.thumbnail.key, { level: "private" })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
        Storage.remove(post.large.key, { level: "private" })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      props.onSnack("Collection Deleted");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="collection__card">
      <Dialog open={open} onClose={handleClose}>
        <EditCollection onClose={handleClose} collection={props.collection} />
      </Dialog>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={removeCollection}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete Collection" />
        </MenuItem>
        <MenuItem onClick={openDialog}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit Collection Details" />
        </MenuItem>{" "}
      </Menu>
      <Card className={classes.root}>
        <Link to={`/profile/${userId}/${props.collection.id}`}>
          {props.collection.coverPhoto ? (
            <CardMedia className={classes.media}>
              <S3Image
                className="collection__image"
                level="private"
                imgKey={props.collection.coverPhoto.key}
              />
            </CardMedia>
          ) : null}
        </Link>
        <CardContent className={classes.content}>
          <Link to={`/profile/${userId}/${props.collection.id}`}>
            <Typography gutterBottom variant="h6">
              {props.collection.name}
            </Typography>
            <Typography gutterBottom variant="body1">
              <em>{props.collection.description}</em>
            </Typography>
          </Link>
          <CardActions>
            <IconButton
              className={classes.settings}
              aria-label="settings"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </section>
  );
};

export default Collection;
