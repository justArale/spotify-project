import "./Header.css";
import React from "react";
import CreateButton from "./CreateButton";
import { SpotifyLogo } from "@just1arale/icons";

const Header: React.FC = () => {
  return (
    <div className="headerWraper">
      <div className="headerContentWrapper">
        <p className="bodyText">
          made for <SpotifyLogo width="16" height="16" />
        </p>
        <div className="headerContent">
          <h1 className="pageTitle">Moodly</h1>
          <p className="headline">
            Generate Spotify playlists based on mood and artists
          </p>
        </div>
        <CreateButton />
      </div>
    </div>
  );
};

export default Header;
