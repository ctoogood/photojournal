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
        <AddCollection onClose={handleClose} />
      </Dialog>
      <h1 style={{ textAlign: "left" }}>My Collections</h1>
      <div className="profile__add">
        <IconButton onClick={openDialog}>
          <Add color="primary" />
        </IconButton>
        <p>Add Collection</p>
      </div>

      <CollectionList />
    </section>
  );
};

export default Profile;
