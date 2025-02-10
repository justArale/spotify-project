import "./About.css";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="boxWrapper">
      <p className="bodyText">How it works</p>
      <div className="descriptionBoxWrapper">
        <div className="descriptionBox">
          <div className="numberFont counter">1</div>
          <p className="subHeadline">
            Start with any Artist you love and choose the right mood.
          </p>
        </div>
        <div className="descriptionBox">
          <div className="numberFont counter">2</div>
          <p className="subHeadline">
            Based on your choice we will generate the perfect playlist.
          </p>
        </div>
        <div className="descriptionBox">
          <div className="numberFont counter">3</div>
          <p className="subHeadline">
            Preview listen tracks and save the playlist to your library.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
