import React from "react";
import SelectedArtist from "../components/SelectedArtist";
import Playlist from "../components/Playlist";

const Resultpage: React.FC = ({}) => {
  return (
    <div className="landingPageWrapper">
      <SelectedArtist />
      <Playlist />
    </div>
  );
};

export default Resultpage;
