import React, { useContext } from "react";
import "./SelectedArtist.css";
import CreateButton from "./CreateButton";
import ConnectAndSave from "./ConnectAndSave";
import { CollectContext } from "../context/collectData.context";

const SelectedArtist: React.FC = () => {
  const { choosenArtistName } = useContext(CollectContext);
  const { choosenArtistImage } = useContext(CollectContext);
  const { choosenMood } = useContext(CollectContext);

  return (
    <div className="resultHeader">
      <div
        className="blurryBackground"
        style={{
          backgroundImage: `url(${choosenArtistImage})`,
        }}
      ></div>
      <div className="resultHeaderContentWrapper">
        <div className="resultPlaylistContent">
          <div className="resultPlaylistArtistImageWrapper">
            {choosenArtistImage && (
              <img
                src={choosenArtistImage}
                alt="Artist"
                className="artistImage"
              />
            )}
          </div>
          <div className="resultPlaylistText">
            <h3 className="headline whiteFont">Your New Playlist</h3>
            <h2 className="resultTitle whiteFont">
              {choosenMood} with {choosenArtistName}
            </h2>
          </div>
        </div>
        <div className="actionButtons">
          <ConnectAndSave />
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default SelectedArtist;
