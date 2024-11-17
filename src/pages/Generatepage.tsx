import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CollectContext } from "../context/collectData.context";
import SearchArtist from "../components/SearchArtist";
import SelectMood from "../components/SelectMood";
import LoadingPlaylist from "../components/LoadingPlaylist";

const Generatepage: React.FC = () => {
  // const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  // const { setArtistID, setDanceMin, setDanceMax } = useContext(CollectContext);
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

  return (
    <div className="landingPageWrapper">
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
            // onClose={onClose}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Generatepage;
