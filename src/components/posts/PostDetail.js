import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";

import { getPost } from "../../graphql/queries";
import "./posts.scss";
import { S3Image } from "aws-amplify-react";

const PostDetail = () => {
  const { postid } = useParams();

  const [post, setPost] = useState({});
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  const newDate = new Date(post.date);
  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][newDate.getMonth()];
  const date = `${newDate.getDate()} ${month} ${newDate.getFullYear()}`;

  const thisPost = useCallback(async () => {
    setLoading(true);
    try {
      const postData = await API.graphql(
        graphqlOperation(getPost, { id: postid })
      );
      const postResult = postData.data.getPost;
      setPost(postResult);
      setImage(postResult.image);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [postid]);

  useEffect(() => {
    thisPost();
  }, [thisPost]);

  return (
    <section className="postDetail__card">
      {loading ? (
        <CircularProgress />
      ) : (
        <Card>
          <CardActionArea>
            <CardMedia>
              <S3Image level="private" imgKey={image.key} />{" "}
            </CardMedia>
            <CardContent>
              <Typography variant="subtitle1">{post.caption}</Typography>
              <Typography variant="subtitle1">{date}</Typography>
              <Typography variant="subtitle1">{post.location}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </section>
  );
};

export default PostDetail;
