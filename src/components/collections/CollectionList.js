import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";

import { CircularProgress } from "@material-ui/core";

import { collectionByName } from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import Collection from "./Collection";
import SimpleSnackbar from "../snack/Snackbar";
import "./collections.scss";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const getCollections = async () => {
    setIsLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(collectionByName, {
          owner: user.username,
          sortDirection: "ASC",
        })
      );
      const list = response.data.collectionByName.items;
      setCollections(list);
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

  return (
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
      <SimpleSnackbar open={success} onClose={handleClose} message={message} />
    </section>
  );
};

export default CollectionList;
