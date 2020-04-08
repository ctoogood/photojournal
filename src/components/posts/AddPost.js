import React, { useState } from "react";
import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/styles";
import config from "../../aws-exports";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { MoreVert, CloseOutlined } from "@material-ui/icons";

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
    marginbottom: "2rem",
    marginRight: "0.5rem",
    "&:hover": {
      color: "#4fa1c4",
    },
  },
  card: {
    padding: "2rem",
    position: "relative",
  },
  media: {
    overflow: "hidden",
  },
  content: {
    textAlign: "left",
    fontWeight: "lighter",
    position: "relative",
  },
  settings: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
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
  const [preview, setPreview] = useState(false);
  const [edit, setEdit] = useState(false);

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
    const fileName = `upload/${props.collection}/${uuid()}-original.jpg`;
    setImg(fileName);
  };

  const onChange = (e) => {
    console.log(e.target);
    setFile(e.target.files.item(0));
    setKey();
  };

  const handleFirstSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await uploadFile(file);
    setLoading(false);
    setPreview(true);
  };

  const editPreview = () => {
    setEdit(true);
    setPreview(false);
  };

  const handleClose = async () => {
    await Storage.remove(img, { level: "private" })
      .then((result) => console.log(img, result))
      .catch((err) => console.log(err));
    props.onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
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
      {!preview ? (
        <Card className={classes.card}>
          <IconButton
            onClick={handleClose}
            className={classes.close}
            aria-label="settings"
          >
            <CloseOutlined />
          </IconButton>

          {loading ? (
            <CircularProgress />
          ) : (
            <form onSubmit={handleFirstSubmit}>
              <h2>Add A Post</h2>
              {!edit ? (
                <div>
                  <input type="file" accept="image/*" onChange={onChange} />
                </div>
              ) : (
                <CardMedia className={classes.media}>
                  <S3Image
                    className="postDetail__image"
                    level="private"
                    imgKey={img}
                  />
                </CardMedia>
              )}
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
              <Button
                className={classes.button}
                color="secondary"
                type="submit"
              >
                Preview
              </Button>
            </form>
          )}
        </Card>
      ) : (
        <Card className={classes.card}>
          <IconButton
            onClick={handleClose}
            className={classes.close}
            aria-label="settings"
          >
            <CloseOutlined />
          </IconButton>

          <CardMedia className={classes.media}>
            <S3Image
              className="postDetail__image"
              level="private"
              imgKey={img}
            />
          </CardMedia>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {caption}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {date}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {location}
            </Typography>
            <CardActions>
              <IconButton className={classes.settings} aria-label="settings">
                <MoreVert />
              </IconButton>
            </CardActions>
          </CardContent>
          <div>
            <Button className={classes.button} onClick={editPreview}>
              Edit
            </Button>
            <Button className={classes.button} onClick={handleSubmit}>
              Add Post
            </Button>
          </div>
        </Card>
      )}
    </section>
  );
};

export default AddPost;
