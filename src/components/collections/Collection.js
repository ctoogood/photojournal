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
import { deleteCollection } from "../../graphql/mutations";

import "./collections.scss";
import { listPosts } from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  media: {
    maxHeight: "300px",
    height: "100%",
    overflow: "hidden",
  },
  content: {
    textAlign: "left",
    fontWeight: "lighter",
    position: "relative",
  },
  settings: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const Collection = ({ collection }) => {
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
          filter: { collectionId: { eq: collection.id } },
        })
      );
      const results = collectionPosts.data.listPosts.items;
      await API.graphql(
        graphqlOperation(deleteCollection, { input: { id: collection.id } })
      );
      await results.forEach((post) => {
        Storage.remove(post.image.key, { level: "private" })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      alert("Collection deleted");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="collection__card">
      <Dialog open={open} onClose={handleClose}>
        <EditCollection onClose={handleClose} collection={collection} />
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
        <Link to={`/profile/${userId}/${collection.id}`}>
          {collection.coverPhoto ? (
            <CardMedia className={classes.media}>
              <S3Image
                className="collection__image"
                level="private"
                imgKey={collection.coverPhoto.key}
              />
            </CardMedia>
          ) : null}
        </Link>
        <CardContent className={classes.content}>
          <Link to={`/profile/${userId}/${collection.id}`}>
            <Typography gutterBottom variant="h6">
              {collection.name}
            </Typography>
            <Typography gutterBottom variant="body1">
              <em>{collection.description}</em>
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
