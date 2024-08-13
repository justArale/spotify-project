import "./CreateButton.css";
import React, { useState, useEffect } from "react";
import newIcon from "../assets/icons/new.svg";
import SearchArtist from "./SearchArtist";
import SelectMood from "./SelectMood";
import LoadingPlaylist from "./LoadingPlaylist";
import "./Overlay.css";
import axios from "axios";

const CreateButton: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");

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
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div>
      <button
        className="startButton buttonFont whiteFont"
        onClick={handleStartClick}
      >
        <div className="buttonIconWrapper">
          <img src={newIcon} alt="small plus icon" />
        </div>
        Create new
      </button>
      {isOverlayOpen && <GeneratePlaylist onClose={handleCloseOverlay} />}
    </div>
  );
};

interface GeneratePlaylistProps {
  onClose: () => void;
}

const GeneratePlaylist: React.FC<GeneratePlaylistProps> = ({ onClose }) => {
  const [artistID, setArtistID] = useState<string>("");
  const [danceMin, setDanceMin] = useState<number | null>(null);
  const [danceMax, setDanceMax] = useState<number | null>(null);

  const getDanceability = (min: number, max: number) => {
    setDanceMin(min);
    setDanceMax(max);
  };

  const getArtistId = (chosenArtistId: string) => {
    setArtistID(chosenArtistId);
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
          />
        ) : null}
      </div>
    </div>
  );
};

export default CreateButton;
