import React from "react";
import CreateButton from "./CreateButton";

const SelectedArtist: React.FC = () => {
  const getArtistInput = localStorage.getItem("artist");
  const getMoodInput = localStorage.getItem("mood");
  const getArtistImage = localStorage.getItem("artistImage");

  return (
    <div>
      <div>{getArtistImage && <img src={getArtistImage} alt="Artist" />}</div>
      <div>
        <div>
          <div>
            {getArtistImage && <img src={getArtistImage} alt="Artist" />}
          </div>
          <div>
            <h3>Your new playlist</h3>
            <h2>
              {getMoodInput} with {getArtistInput}
            </h2>
          </div>
        </div>
        <div>
          <button>Save to your spotify</button>
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default SelectedArtist;
