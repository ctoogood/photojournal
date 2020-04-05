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

import { updatePost } from "../../graphql/mutations";
import { useHistory } from "react-router-dom";

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
  const [caption, setCaption] = useState(post.caption);
  const [location, setLocation] = useState(post.location);
  const [date, setDate] = useState(post.date);
  const [img, setImg] = useState(post.image.key);
  const [uploading, setUploading] = useState(false);

  const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket,
  } = config;

  const uploadFile = async (file) => {
    try {
      const fileName = `upload/${uuid()}`;
      const user = await Auth.currentAuthenticatedUser();
      const result = await Storage.vault.put(fileName, file, {
        contentType: "image/jpg",
        metadata: {
          owner: user.username,
        },
      });
      setImg(fileName);
      console.log("Uploaded File:", result);
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = async (e) => {
    setUploading(true);

    let files = [];
    for (var i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files.item(i));
    }
    await Promise.all(files.map((f) => uploadFile(f)));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(updatePost, {
          input: {
            id: post.id,
            collectionId: post.collectionId,
            caption: caption,
            location: location,
            date: date,
            image: { key: img, bucket: bucket, region: region },
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
          <form onSubmit={handleSubmit}>
            <h2>Add A Post</h2>
            <div>
              <Button
                className={classes.button}
                onClick={() =>
                  document.getElementById("add-image-file-input").click()
                }
                disabled={uploading}
                content={uploading ? "Uploading..." : "Add Images"}
              >
                Select Image
              </Button>

              <input
                id="add-image-file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={onChange}
                style={{ display: "none" }}
              />
            </div>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">Caption</InputLabel>
                <OutlinedInput
                  className={classes.input}
                  disabled={!img}
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
                  disabled={!img}
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
                  disabled={!img}
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
            <Button
              className={classes.button}
              color="secondary"
              type="submit"
              disabled={!img}
            >
              Add Post
            </Button>
          </form>
        </Card>
      )}
    </section>
  );
};

export default EditPost;
