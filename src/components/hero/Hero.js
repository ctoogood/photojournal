import React, { useContext } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import camera from "../../images/jakob-owens-FKyHyNowp-4-unsplash.jpg";
import camera_small from "../../images/jakob-owens-fkyhynowp-4-unsplash_small.jpg";
import photo from "../../images/photo.svg";
import album from "../../images/album.svg";
import sketchbook from "../../images/sketchbook.svg";
import "./Hero.scss";
import { AuthContext } from "../../context/auth";

const useStyles = makeStyles((theme) => ({
  root: {},
  signup: {
    backgroundColor: "#63ABCA",
    color: "white",
    fontWeight: "normal",
    opacity: 0.9,
    padding: "0.5rem 1rem 0.5rem 1rem",
    "&:hover": {
      color: "#63ABCA",
      backgroundColor: "white",
    },
  },
}));

const Hero = () => {
  const classes = useStyles();
  const appContext = useContext(AuthContext);
  const { user } = appContext;
  return (
    <>
      <section className="hero__main">
        <ProgressiveImage src={camera} placeholder={camera_small} delay={500}>
          {(src) => <img src={src} alt="Hand Holding Camera" />}
        </ProgressiveImage>
        <div className="hero__headline">
          <h1>Store, Organise And Share Your Memories</h1>
        </div>
        <div className="hero__expand">
          <h2>Find Out More</h2>
          <ExpandMoreIcon />
        </div>
      </section>
      <section className="hero__about">
        <h2>
          Photojournal<b>it</b>
        </h2>
        <section className="hero__aboutsection">
          <div className="hero__aboutimage">
            <img src={photo} alt="uploading images icon" />
          </div>
          <p>
            Upload your images to keep them organised and viewable on any
            device, anywhere.
          </p>
        </section>
        <section className="hero__aboutsection">
          <div className="hero__aboutimage">
            <img src={album} alt="album icon" />
          </div>
          <p>
            Sort your images into secure albums and share them with your friends
            & family
          </p>
        </section>
        <section className="hero__aboutsection">
          <div className="hero__aboutimage">
            <img src={sketchbook} alt="journal icon" />
          </div>
          <p>
            Caption, date and add locations to your images to create a valuable
            account of your memories.
          </p>
        </section>
        {!user ? (
          <section className="hero__aboutsection">
            <Link className="hero__link" to="/login">
              <Button
                variant="contained"
                color="inherit"
                className={classes.signup}
              >
                Sign Up Now
              </Button>
            </Link>
          </section>
        ) : null}
      </section>
    </>
  );
};

export default Hero;
