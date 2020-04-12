import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";

import { CircularProgress, Button } from "@material-ui/core";

import { collectionByName } from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import Collection from "./Collection";
import SimpleSnackbar from "../snack/Snackbar";
import "./collections.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
    marginBottom: "3rem",
    margin: "auto",
    color: "#FFFFFF",
    width: "max-content",
    backgroundColor: "#4fa1c4",
    "&:hover": {
      color: "#4fa1c4",
    },
  },
}));

const CollectionList = () => {
  const classes = useStyles();
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [nextToken, setNextToken] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const limit = 9;

  const getCollections = async () => {
    setIsLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(collectionByName, {
          owner: user.username,
          sortDirection: "ASC",
          limit: limit,
        })
      );
      const list = response.data.collectionByName.items;
      setCollections(list);
      setNextToken(response.data.collectionByName.nextToken);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  useEffect(() => {
    let subscription;
    async function createSubscription() {
      const user = await Auth.currentAuthenticatedUser();
      subscription = API.graphql(
        graphqlOperation(subscriptions.onCreateCollection, {
          owner: user.username,
        })
      ).subscribe({
        next: (data) => {
          const collection = data.value.data.onCreateCollection;
          setCollections((collections) => [...collections, collection]);
        },
      });
    }
    createSubscription();
    return () => subscription.unsubscribe();
  }, [collections]);

  useEffect(() => {
    let deleted;
    async function deleteSubscription() {
      const user = await Auth.currentAuthenticatedUser();
      deleted = API.graphql(
        graphqlOperation(subscriptions.onDeleteCollection, {
          owner: user.username,
        })
      ).subscribe({
        next: (deleteData) => {
          const collection = deleteData.value.data.onDeleteCollection;
          setCollections(
            collections.filter((item) => item.id !== collection.id)
          );
        },
      });
    }
    deleteSubscription();
    return () => deleted.unsubscribe();
  }, [collections]);

  const snack = (msg) => {
    setSuccess(true);
    setMessage(msg);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const fetchMore = async () => {
    if (nextToken) {
      setIsFetching(true);
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(collectionByName, {
          owner: user.username,
          nextToken,
          sortDirection: "ASC",
          limit: limit,
        })
      );
      const list = response.data.collectionByName.items;
      setCollections(collections.concat(list));
      setNextToken(response.data.collectionByName.nextToken);
      console.log(response.data.collectionByName.nextToken);
      setIsFetching(false);
    }
  };

  return (
    <>
      <section className="collectionList__grid">
        {isLoading ? (
          <CircularProgress />
        ) : (
          collections.map((collection) => (
            <Collection
              key={collection.id}
              onSnack={snack}
              collection={collection}
            />
          ))
        )}
        <SimpleSnackbar
          open={success}
          onClose={handleClose}
          message={message}
        />
      </section>
      {nextToken ? (
        <section className="postsList__more">
          {isFetching ? (
            <CircularProgress />
          ) : (
            <Button onClick={fetchMore} className={classes.root}>
              Fetch More...
            </Button>
          )}
        </section>
      ) : null}
    </>
  );
};

export default CollectionList;
