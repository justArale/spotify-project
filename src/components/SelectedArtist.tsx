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
          <div className="resultPlaylistInnerContent">
            <h2 className="pageTitle whiteFont">
              {choosenMood} with <br /> {choosenArtistName}
            </h2>
            <div className="actionButtons">
              <ConnectAndSave />
              <CreateButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedArtist;
