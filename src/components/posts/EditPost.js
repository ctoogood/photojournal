import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";

import { FormControl, Card, Button, CircularProgress } from "@material-ui/core";

import { updatePost } from "../../graphql/mutations";
import { useHistory } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "60px",
  },
  formControl: {
    marginBottom: "1rem",
  },
  input: {
    fontSize: ".9rem",
  },
  button: {
    backgroundColor: "#4fa1c4",
    color: "white",
    fontWeight: "normal",
    marginBottom: "2rem",
    "&:hover": {
      color: "#4fa1c4",
    },
  },
  card: {
    padding: "2rem",
  },
}));

const EditPost = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [caption, setCaption] = useState(post.caption);
  const [location, setLocation] = useState(post.location);
  const [date, setDate] = useState(post.date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(updatePost, {
          input: {
            id: post.id,
            title: title,
            collectionId: post.collectionId,
            caption: caption,
            location: location,
            date: date,
          },
        })
      );
      setLoading(false);
      history.push(
        `/profile/${user.userrname}/${post.collectionId}/${post.id}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="addPost__main">
      {loading ? (
        <CircularProgress />
      ) : (
        <Card className={classes.card}>
          <ValidatorForm onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <TextValidator
                  className={classes.input}
                  id="component-outlined"
                  autoFocus
                  value={title}
                  multiline={true}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  label="Title"
                  type="text"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <TextValidator
                  className={classes.input}
                  id="component-outlined"
                  autoFocus
                  value={caption}
                  multiline={true}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  label="Caption"
                  type="text"
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <TextValidator
                  className={classes.input}
                  id="component-outlined"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  label="Location"
                  type="text"
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <TextValidator
                  className={classes.input}
                  id="component-outlined"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  label="Date"
                  type="date"
                />
              </FormControl>
            </div>
            <Button className={classes.button} color="secondary" type="submit">
              Submit Changes
            </Button>
          </ValidatorForm>
        </Card>
      )}
    </section>
  );
};

export default EditPost;
