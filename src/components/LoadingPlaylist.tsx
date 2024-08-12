import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingIcon from "../assets/icons/loading.svg";

interface GenerateProps {
  artistID: string;
  danceMin: number;
  danceMax: number;
}

const LoadingPlaylist: React.FC<GenerateProps> = ({
  artistID,
  danceMin,
  danceMax,
}) => {
  const tokenFromLocalStorage = localStorage.getItem("accessTokenLocal");
  const [playlistData, setPlaylistData] = useState<any>(null);
  const navigate = useNavigate();

  const loadPlaylist = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?limit=30&seed_artists=${artistID}&min_danceability=${danceMin}&max_danceability=${danceMax}`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        }
      );
      setPlaylistData(response.data.tracks);
      console.log(response.data.tracks);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error searching for artists:", error.response?.data);
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  useEffect(() => {
    if (playlistData) {
      // Save the playlistData
      localStorage.setItem("playlistData", JSON.stringify(playlistData));
      navigate("/result");
    }
  }, [playlistData]);

  // Once the playlist is loaded, you can render the data or redirect to another component.
  return (
    <div className="contentFieldWrapper">
      {!playlistData ? (
        <div>
          <img src={loadingIcon} alt="Loading Image" />
        </div>
      ) : null}
    </div>
  );
};

export default LoadingPlaylist;
