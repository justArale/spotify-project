import React from "react";
import "./SelectedArtist.css";
import CreateButton from "./CreateButton";

const SelectedArtist: React.FC = () => {
  const getArtistInput = localStorage.getItem("artist");
  const getMoodInput = localStorage.getItem("mood");
  const getArtistImage = localStorage.getItem("artistImage");

  return (
    <div className="resultHeader">
      <div
        className="blurryBackground"
        style={{
          backgroundImage: `url(${getArtistImage})`,
        }}
      ></div>
      <div className="resultHeaderContentWrapper">
        <div className="resultPlaylistContent">
          <div className="resultPlaylistArtistImageWrapper">
            {getArtistImage && (
              <img src={getArtistImage} alt="Artist" className="artistImage" />
            )}
          </div>
          <div className="resultPlaylistText">
            <h3 className="headline whiteFont">Your New Playlist</h3>
            <h2 className="resultTitle whiteFont">
              {getMoodInput} with {getArtistInput}
            </h2>
          </div>
        </div>
        <div className="actionButtons">
          <button>Save to your spotify</button>
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default SelectedArtist;
