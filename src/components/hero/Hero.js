import React, { useContext } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import camera from "../../images/jakob-owens-FKyHyNowp-4-unsplash.jpg";
import camera_small from "../../images/jakob-owens-fkyhynowp-4-unsplash_small.jpg";
import "./Hero.scss";
import { AuthContext } from "../../context/auth";

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    backgroundColor: "white",
    color: "#4fa1c4",
    fontWeight: "normal",
    opacity: 0.9,
    padding: "0.5rem 1rem 0.5rem 1rem",
    "&:hover": {
      color: "white",
      backgroundColor: "#4fa1c4",
    },
  },
}));

const Hero = () => {
  const classes = useStyles();
  const appContext = useContext(AuthContext);
  const { user } = appContext;
  return (
    <section className="hero__main">
      <ProgressiveImage src={camera} placeholder={camera_small}>
        {(src) => <img src={src} alt="Hand Holding Camera" />}
      </ProgressiveImage>
      <div className="hero__headline">
        <h1>Store, Organise And Share Your Memories</h1>
        {user ? (
          <Link className="hero__link" to={`/profile/${user.username}`}>
            <Button className={classes.button}>View Profile</Button>
          </Link>
        ) : null}
      </div>
      {/* <div className="hero__expand">
        <h2>Find Out More</h2>
        <ExpandMoreIcon />
      </div> */}
    </section>
  );
};

export default Hero;
