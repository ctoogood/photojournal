import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";

import { CircularProgress } from "@material-ui/core";

import { listPosts, getCollection } from "../../graphql/queries";
import Post from "./Post";
import "./posts.scss";

const PostsList = () => {
  const { collectionid } = useParams();

  const [posts, setPosts] = useState([]);
  const [thisCollection, setThisCollection] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = useCallback(async () => {
    try {
      const response = await API.graphql(
        graphqlOperation(listPosts, {
          filter: { collectionId: { eq: collectionid } },
        })
      );
      const list = response.data.listPosts.items;
      setPosts(list);
      const collection = await API.graphql(
        graphqlOperation(getCollection, { id: collectionid })
      );
      const collectionData = collection.data.getCollection;
      setThisCollection(collectionData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [collectionid]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="postsList__main">
      {isLoading ? <CircularProgress /> : <h1>{thisCollection.name}</h1>}
      <section className="postsList__grid">
        {isLoading ? (
          <CircularProgress />
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </section>
    </section>
  );
};

export default PostsList;
