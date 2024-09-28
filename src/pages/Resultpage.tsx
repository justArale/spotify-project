import React from "react";
import SelectedArtist from "../components/SelectedArtist";
import Playlist from "../components/Playlist";
import "../components/Resultpage.css";

const Resultpage: React.FC = ({}) => {
  return (
    <div className="landingPageWrapper resultPageWrapper">
      <SelectedArtist />
      <Playlist />
    </div>
  );
};

export default Resultpage;
