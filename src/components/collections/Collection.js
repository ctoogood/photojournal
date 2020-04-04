import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { makeStyles } from "@material-ui/styles";

import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";

import "./collections.scss";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    maxHeight: "200px",
    height: "100%",
    overflow: "hidden",
  },
}));

const Collection = ({ collection }) => {
  const classes = useStyles();
  console.log(collection.posts.items);
  const userId = Auth.user.username;
  return (
    <section className="collection__card">
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
          <CardContent>
            <Typography variant="h5">{collection.name}</Typography>
            <Typography>{collection.description}</Typography>
          </CardContent>
        </Link>
      </Card>
    </section>
  );
};

export default Collection;
