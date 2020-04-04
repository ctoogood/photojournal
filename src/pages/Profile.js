import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

import CollectionList from "../components/collections/CollectionList";
import { IconButton, Dialog } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import AddCollection from "../components/collections/AddCollection";

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

const Profile = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };
  return (
    <section className="profile__main">
      <Dialog className={classes.dialog} open={open} onClose={handleClose}>
        <AddCollection />
      </Dialog>
      <h1 style={{ textAlign: "left" }}>My Collections</h1>
      <IconButton onClick={openDialog} className={classes.icon}>
        <Add color="primary" />
      </IconButton>
      <CollectionList />
    </section>
  );
};

export default Profile;
