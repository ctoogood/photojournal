import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { CircularProgress } from "@material-ui/core";

import { listCollections } from "../../graphql/queries";
import Collection from "./Collection";
import "./collections.scss";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollections = async () => {
    setIsLoading(true);
    try {
      const response = await API.graphql(graphqlOperation(listCollections));
      const list = response.data.listCollections.items;
      setCollections(list);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <section className="collectionList__grid">
      {isLoading ? (
        <CircularProgress />
      ) : (
        collections.map((collection) => (
          <Collection key={collection.id} collection={collection} />
        ))
      )}
    </section>
  );
};

export default CollectionList;
