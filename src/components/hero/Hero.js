import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import camera from "../../images/jakob-owens-FKyHyNowp-4-unsplash.jpg";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero__main">
      <img src={camera} alt="hand holding camera" />
      <div className="hero__headline">
        <h1>Store, Organise And Share Your Memories</h1>
      </div>
      <div className="hero__expand">
        <h2>Find Out More</h2>
        <ExpandMoreIcon />
      </div>
    </section>
  );
};

export default Hero;
