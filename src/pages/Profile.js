import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

import CollectionList from "../components/collections/CollectionList";
import { IconButton, Dialog } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import AddCollection from "../components/collections/AddCollection";
import SimpleSnackbar from "../components/snack/Snackbar";

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
  const [success, setSuccess] = useState(false);

  const closeHandle = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const collectionAdd = () => {
    setSuccess(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  return (
    <section className="profile__main">
      <SimpleSnackbar
        open={success}
        onClose={handleClose}
        message="Collection Added!"
      />
      <Dialog className={classes.dialog} open={open} onClose={closeHandle}>
        <AddCollection
          className={classes.add}
          onClose={closeHandle}
          onAdd={collectionAdd}
        />
      </Dialog>
      <h1 style={{ textAlign: "left", marginLeft: "0.5rem" }}>
        My Collections
      </h1>
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
