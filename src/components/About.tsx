import "./About.css";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="boxWrapper">
      <div className="descriptionBox">
        <div className="numberFont counter">1</div>
        <p className="mainFontSmall">
          Start with any Artist you love and choose the right mood.
        </p>
      </div>
      <div className="descriptionBox">
        <div className="numberFont counter">2</div>
        <p className="mainFontSmall">
          Based on your choice we will generate the perfect playlist.
        </p>
      </div>
      <div className="descriptionBox">
        <div className="numberFont counter">3</div>
        <p className="mainFontSmall">
          Preview listen tracks and save the playlist to your library.
        </p>
      </div>
    </div>
  );
};

export default About;
