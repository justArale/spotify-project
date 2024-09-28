import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ConnectAndSave.css";
// import addIcon from "../assets/icons/add.svg";
import { Save } from "@just1arale/icons";
import { Saved } from "@just1arale/icons";
import appIcon from "../assets/icons/app.svg";
import spotifyIcon from "../assets/icons/spotify.svg";
import { CollectContext } from "../context/collectData.context";
import { AuthContext } from "../context/auth.context";

const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID as string;
const SPOTIFY_AUTHORIZE_ENDPOINT: string =
  "https://accounts.spotify.com/authorize?";
// const REDIRECT_URL_AFTER_LOGIN: string = "http://localhost:5173/result";

// Uncomment if publish is ready
const REDIRECT_URL_AFTER_LOGIN: string =
  "https://arale-spotify-project2.netlify.app/result";

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
  const [playlistSaved, setPlaylistSaved] = useState<boolean>(false);

  const handleStartClick = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div className="buttonWrapper">
      {playlistSaved ? (
        <div>
          <button className="SaveButton buttonFont disable blackFont">
            <Saved width="24" height="24" />
            Playlist saved
          </button>
        </div>
      ) : (
        <button
          className="SaveButton buttonFont blackFont"
          onClick={handleStartClick}
        >
          <Save width="24" height="24" />
          Save playlist
        </button>
      )}
      {isOverlayOpen && (
        <ConnectAndSaveOverlay
          onClose={handleCloseOverlay}
          setPlaylistSaved={setPlaylistSaved} // Pass function directly
        />
      )}
    </div>
  );
};

interface ConnectAndSaveOverlayProps {
  onClose: () => void;
  setPlaylistSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Track {
  uri: string;
}

const ConnectAndSaveOverlay: React.FC<ConnectAndSaveOverlayProps> = ({
  onClose,
  setPlaylistSaved,
}) => {
  const { accessToken } = useContext(AuthContext);
  const [userId, setUserId] = useState<string>("");
  const [playlistId, setPlaylistId] = useState<string>("");

  const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const TRACK_ENDPOINT = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const USER_ENDPOINT = `https://api.spotify.com/v1/me`;
  const { choosenArtistName, choosenMood, playlistData } = useContext(
    CollectContext
  ) as {
    choosenArtistName: string;
    choosenMood: string;
    playlistData: Track[];
  };

  const handleLogin = () => {
    window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`;

    // // If you want to open the authorization in a seperate window
    // const spotifyAuthUrl = `${SPOTIFY_AUTHORIZE_ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`;

    // // Set the size of the window
    // const width = 500;
    // const height = 600;

    // // Calculate the positon of the window (its now in the middle)
    // const left = window.screen.width / 2 - width / 2;
    // const top = window.screen.height / 2 - height / 2;

    // // Open the window in the setted size and position
    // window.open(
    //   spotifyAuthUrl,
    //   "_blank",
    //   `width=${width},height=${height},top=${top},left=${left}`
    // );
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
        if (err.response.status === 401) {
          // Unauthorized error, likely due to expired token
          alert("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          handleLogin();
        } else {
          console.log("Error getting user info:", err);
        }
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
          description: "Created with Arales Spotify-Project App",
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
        setPlaylistSaved(true);
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
          <div className="connectWrapper">
            <img src={appIcon} alt="Icon of the spotify project app" />
            <p>🔗</p>
            <img src={spotifyIcon} alt="Icon of the spotify app" />
          </div>
          <p className="inputFont connectDescription">
            Connect our App with your Spotify account to save your new playlist.
          </p>
          <button
            className="SaveButton ConnectAndSaveButton buttonFont blackFont"
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
