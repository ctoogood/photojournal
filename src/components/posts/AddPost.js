import React, { useState } from "react";
import { Auth, Storage } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/styles";
import config from "../../aws-exports";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { createPost } from "../../graphql/mutations";

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

const AddPost = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState();
  const [file, setFile] = useState({});

  const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket,
  } = config;

  const uploadFile = async (file) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Storage.vault.put(img, file, {
        contentType: "image/jpg",
        metadata: {
          owner: user.username,
        },
      });
      console.log("Uploaded File:", result);
    } catch (e) {
      console.log(e);
    }
  };

  const setKey = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const fileName = `upload/${user.username}/${props.collection}/${uuid()}`;
    setImg(fileName);
  };

  const onChange = (e) => {
    console.log(e.target);
    setFile(e.target.files.item(0));
    setKey();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await uploadFile(file);
      await API.graphql(
        graphqlOperation(createPost, {
          input: {
            collectionId: props.collection,
            title: title,
            caption: caption,
            location: location,
            date: date,
            image: { key: img, bucket: bucket, region: region },
          },
        })
      );
      console.log(file, img);
      await props.onClose();
      await props.onSnack("Post Added!");
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="addPost__main">
      <Card className={classes.card}>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Add A Post</h2>
            <div>
              <input type="file" accept="image/*" onChange={onChange} />
            </div>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">Title</InputLabel>
                <OutlinedInput
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
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">Caption</InputLabel>
                <OutlinedInput
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
                <InputLabel htmlFor="component-outlined">Location</InputLabel>
                <OutlinedInput
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
                <OutlinedInput
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
              Add Post
            </Button>
          </form>
        )}
      </Card>
    </section>
  );
};

export default AddPost;
