import React from "react";
import SelectedArtist from "../components/SelectedArtist";

const Resultpage: React.FC = () => {
  return (
    <div>
      <div>
        <SelectedArtist />
      </div>
      <h5>Your playlist will be displayed here ✌️</h5>
    </div>
  );
};

export default Resultpage;
