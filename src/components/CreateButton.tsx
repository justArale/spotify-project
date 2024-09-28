import "./CreateButton.css";
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
// import newIcon from "../assets/icons/new.svg";
import SearchArtist from "./SearchArtist";
import SelectMood from "./SelectMood";
import LoadingPlaylist from "./LoadingPlaylist";
import "./Overlay.css";
import axios from "axios";
import { CollectContext } from "../context/collectData.context";
import { Add } from "@just1arale/icons";

const CreateButton: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const { setArtistID, setDanceMin, setDanceMax } = useContext(CollectContext);

  const location = useLocation();
  const isResultPage = location.pathname === "/result";

  useEffect(() => {
    const getAccessToken = async () => {
      const base64Encoded = btoa(
        `${import.meta.env.VITE_CLIENT_ID}:${
          import.meta.env.VITE_CLIENT_SECRET
        }`
      );

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${base64Encoded}`,
            },
          }
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.log("Error getting access token:", error);
      }
    };
    getAccessToken();
  }, []);

  useEffect(() => {
    localStorage.setItem("accessTokenLocal", accessToken);
  }, [accessToken]);

  const handleStartClick = () => {
    // Reset the values in the context
    setArtistID("");
    setDanceMin(null);
    setDanceMax(null);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div className="buttonWrapper">
      <button
        className={`startButton buttonFont ${
          isResultPage ? "resultPageStyle" : "mainPageStyle"
        }`}
        onClick={handleStartClick}
      >
        <Add width="24" height="24" />
        {isResultPage ? "Create new playlist" : "Create playlist"}
      </button>
      {isOverlayOpen && <GeneratePlaylist onClose={handleCloseOverlay} />}
    </div>
  );
};

interface GeneratePlaylistProps {
  onClose: () => void;
}

const GeneratePlaylist: React.FC<GeneratePlaylistProps> = ({ onClose }) => {
  const {
    artistID,
    setArtistID,
    danceMin,
    setDanceMin,
    danceMax,
    setDanceMax,
  } = useContext(CollectContext);

  const getDanceability = (min: number, max: number) => {
    setDanceMin(min);
    setDanceMax(max);
    console.log("min", min);
    console.log("max", max);
  };

  const getArtistId = (chosenArtistId: string) => {
    setArtistID(chosenArtistId);
    console.log("artist", chosenArtistId);
  };

  return (
    <div className="overlay">
      <div className="overlay-background" onClick={onClose}></div>
      <div className="overlay-content">
        {!artistID ? (
          <SearchArtist getArtistId={getArtistId} />
        ) : artistID && danceMin === null ? (
          <SelectMood getDanceability={getDanceability} />
        ) : artistID && danceMin !== null && danceMax !== null ? (
          <LoadingPlaylist
            artistID={artistID}
            danceMin={danceMin}
            danceMax={danceMax}
            onClose={onClose}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CreateButton;
