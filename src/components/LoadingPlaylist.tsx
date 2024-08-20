import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingIcon from "../assets/icons/loading.svg";
import { CollectContext } from "../context/collectData.context";

interface GenerateProps {
  artistID: string;
  danceMin: number;
  danceMax: number;
  onClose: () => void;
}

const LoadingPlaylist: React.FC<GenerateProps> = ({
  artistID,
  danceMin,
  danceMax,
  onClose,
}) => {
  const tokenFromLocalStorage = localStorage.getItem("accessTokenLocal");
  const { setPlaylistData } = useContext(CollectContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      setIsLoading(false);
      console.log(response.data.tracks);
      navigate("/result");

      // Close the overlay, if the current URL path is '/result' insteat of reload
      onClose();
      // Check if the current URL path is '/result'
      if (window.location.pathname === "/result") {
        // Reload the page if on the '/result' page
        window.location.reload();
      }
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

  // Once the playlist is loaded, you can render the data or redirect to another component.
  return (
    <div>
      {isLoading ? (
        <div className="contentFieldWrapper">
          <h1 className="title">Done</h1>

          <img src={loadingIcon} alt="Loading Image" className="loadingImage" />
          <p className="inputFont contentText">
            Your playlist will be generated.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default LoadingPlaylist;
