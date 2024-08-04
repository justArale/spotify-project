import "./Header.css";
import React from "react";
import CreateButton from "./CreateButton";

const Header: React.FC = () => {
  return (
    <div className="headerWraper">
      <div className="headerContentWrapper">
        <div className="headerContent">
          <p className="headline">Spotify Project</p>
          <h1 className="pageTitle">
            Generate Playlists <br /> by{" "}
            <span className="resultTitle mainColor">Mood</span> and{" "}
            <span className="resultTitle mainColor">Artists</span>
            <br /> with Spotify.
          </h1>
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
