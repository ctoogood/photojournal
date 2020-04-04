import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { createCollection } from "../../graphql/mutations";

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

const AddCollection = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(createCollection, {
          input: {
            name: name,
            description: description,
          },
        })
      );
      setLoading(false);
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
            <h2>Add A Collection</h2>
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
              Add Collection
            </Button>
          </form>
        </Card>
      )}
    </section>
  );
};

export default AddCollection;
