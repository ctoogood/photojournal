import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./collections.scss";

const Collection = ({ collection }) => {
  console.log(Auth);
  const userId = Auth.user.username;
  return (
    <section className="collection__card">
      <Card>
        <Link to={`/profile/${userId}/${collection.id}`}>
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
