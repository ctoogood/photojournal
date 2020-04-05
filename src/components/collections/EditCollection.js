import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { updateCollection } from "../../graphql/mutations";

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

const EditCollection = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(props.collection.name);
  const [description, setDescription] = useState(props.collection.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(updateCollection, {
          input: {
            id: props.collection.id,
            name: name,
            description: description,
          },
        })
      );
      props.onClose();
      setLoading(false);
      history.push(`/profile/${user.username}/${props.collection.id}`);
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
          <form onSubmit={handleSubmit}>
            <h2>Edit Collection Details</h2>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                  className={classes.input}
                  id="component-outlined"
                  autoFocus
                  value={name}
                  multiline={true}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  label="Name"
                  type="text"
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Description
                </InputLabel>
                <OutlinedInput
                  className={classes.input}
                  id="component-outlined"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  label="Description"
                  type="text"
                />
              </FormControl>
            </div>
            <Button className={classes.button} color="secondary" type="submit">
              Edit Collection
            </Button>
          </form>
        </Card>
      )}
    </section>
  );
};

export default EditCollection;
