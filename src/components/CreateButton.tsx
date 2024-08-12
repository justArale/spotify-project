import "./CreateButton.css";
import React, { useState, useEffect } from "react";
import newIcon from "../assets/icons/new.svg";
import SearchArtist from "./SearchArtist";
import SelectMood from "./SelectMood";
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
        <div>
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
  const [danceMin, setDanceMin] = useState<number>(0);
  const [danceMax, setDanceMax] = useState<number>(0);
  const [linkToResults, setLinkToResults] = useState<{
    pathname: string;
    state: { artistID: string; danceMin: number; danceMax: number };
  } | null>(null);

  useEffect(() => {
    if (artistID && danceMin !== null && danceMax !== null) {
      setLinkToResults({
        pathname: "/result",
        state: {
          artistID: artistID,
          danceMin: danceMin,
          danceMax: danceMax,
        },
      });
    }
  }, [artistID, danceMin, danceMax]);

  const getDanceability = (min: number, max: number) => {
    setDanceMin(min);
    setDanceMax(max);
    console.log(danceMin, danceMax);
  };

  const getArtistId = (chosenArtistId: string) => {
    setArtistID(chosenArtistId);
    console.log(artistID);
  };

  return (
    <div className="overlay">
      <div className="overlay-background" onClick={onClose}></div>
      <div className="overlay-content">
        {!artistID ? (
          <SearchArtist getArtistId={getArtistId} />
        ) : (
          <SelectMood getDanceability={getDanceability} />
        )}
      </div>
    </div>
  );
};

export default CreateButton;
