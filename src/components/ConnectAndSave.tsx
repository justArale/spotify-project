import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ConnectAndSave.css";
import connectIcon from "../assets/icons/connect.png";
import addIcon from "../assets/icons/add.svg";
import { CollectContext } from "../context/collectData.context";
import { AuthContext } from "../context/auth.context"; // Importiere den AuthContext

const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID as string;
const SPOTIFY_AUTHORIZE_ENDPOINT: string =
  "https://accounts.spotify.com/authorize?";
const REDIRECT_URL_AFTER_LOGIN: string = "http://localhost:5173/result";
const SPACE: string = "%20";
const SCOPES: string[] = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",
];
const SCOPES_URL_PARAMS: string = SCOPES.join(SPACE);

const ConnectAndSave: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  const handleStartClick = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div>
      <button className="SaveButton buttonFont" onClick={handleStartClick}>
        <div className="buttonIconWrapper">
          <img src={addIcon} alt="small plus icon inside of a circle" />
        </div>
        Save to Your Library
      </button>
      {isOverlayOpen && <ConnectAndSaveOverlay onClose={handleCloseOverlay} />}
    </div>
  );
};

interface ConnectAndSaveOverlayProps {
  onClose: () => void;
}

const ConnectAndSaveOverlay: React.FC<ConnectAndSaveOverlayProps> = ({
  onClose,
}) => {
  const { accessToken } = useContext(AuthContext);
  const [userId, setUserId] = useState<string>("");
  const [playlistId, setPlaylistId] = useState<string>("");

  const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const TRACK_ENDPOINT = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const USER_ENDPOINT = `https://api.spotify.com/v1/me`;
  const { choosenArtistName, choosenMood, playlistData } =
    useContext(CollectContext);

  const handleLogin = () => {
    window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`;
  };

  const getUserInfo = () => {
    if (!accessToken) return;
    axios
      .get(USER_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((err) => {
        console.log("Error getting user info:", err);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken]);

  const createPlaylist = async () => {
    if (!accessToken || !userId) return;
    try {
      const response = await axios.post(
        PLAYLIST_ENDPOINT,
        {
          name: `${choosenMood} with ${choosenArtistName} Playlist`,
          description: "Created with spotify-project app",
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPlaylistId(response.data.id); // Save the new playlist ID for further use
      console.log("Playlist created successfully!");
    } catch (error) {
      console.log("Error creating playlist:", error);
    }
  };

  useEffect(() => {
    const setTracksToPlaylist = async () => {
      if (!playlistId) return;

      // Placeholder for actual track URIs
      const trackURIs = playlistData.map((track) => track.uri);

      if (trackURIs.length === 0) {
        console.error("No track URIs available to add to playlist");
        return;
      }

      try {
        await axios.post(
          TRACK_ENDPOINT,
          {
            uris: trackURIs, // Pass the array directly
            position: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Tracks added successfully!");
        onClose();
      } catch (error) {
        console.log("Error adding tracks to playlist:", error);
      }
    };
    setTracksToPlaylist();
  }, [playlistId, accessToken]);

  const handleConnectAndSave = () => {
    if (accessToken) {
      createPlaylist();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-background" onClick={onClose}></div>
      <div className="overlay-content">
        <div className="contentFieldWrapper">
          <h3 className="title">Save Playlist</h3>
          <div>
            <img src={connectIcon} alt="Connect Icon" />
          </div>
          <p className="inputFont connectDescription">
            Connect our App with your Spotify account to save your new playlist.
          </p>
          <button
            className="SaveButton ConnectAndSaveButton buttonFont"
            onClick={handleConnectAndSave}
          >
            Connect & save playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectAndSave;
