import React from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { listCollections, listPosts } from "../../graphql/queries";
import { deleteCollection, deletePost } from "../../graphql/mutations";

const DeleteAccount = () => {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAll = async () => {
    try {
      const getCollections = await API.graphql(
        graphqlOperation(listCollections)
      );
      const collectionsList = getCollections.data.listCollections.items;
      const getPosts = await API.graphql(graphqlOperation(listPosts));
      const postsList = getPosts.data.listPosts.items;

      await collectionsList.forEach(async (collection) => {
        await API.graphql(
          graphqlOperation(deleteCollection, { input: { id: collection.id } })
        );
      });

      await postsList.forEach(async (post) => {
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
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ marginTop: "50vh", borderTop: "1px solid black" }}>
      <h1>Delete Your Account</h1>
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#C44F4F",
          color: "white",
          fontSize: "0.7rem",
        }}
        onClick={handleClickOpen}
      >
        Delete Your Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Your Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete your account and all of the
            associated data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAccount;
