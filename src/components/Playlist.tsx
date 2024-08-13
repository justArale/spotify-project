import React, { useContext, useState } from "react";
import { CollectContext } from "../context/collectData.context";
import "./Playlist.css";
import playIcon from "../assets/icons/play.svg";
import pauseIcon from "../assets/icons/pause.svg";

const Playlist: React.FC = () => {
  const { playlistData } = useContext(CollectContext);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | null>(null);

  const playAudio = (url: string) => {
    if (currentAudio) {
      if (currentTrackUrl === url) {
        // If the same track is clicked, toggle play/pause
        currentAudio.pause();
        setCurrentTrackUrl(null);
        setCurrentAudio(null);
        return;
      } else {
        // Stop the currently playing track
        currentAudio.pause();
      }
    }
    // Play the new track
    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);
    setCurrentTrackUrl(url);
  };

  return (
    <div>
      <ul className="trackWrapper">
        {playlistData.map((track: any, index: number) => (
          <li
            key={track.id}
            className={`track ${!track.preview_url && `noTrack`}`}
            onClick={() => playAudio(track.preview_url)}
          >
            <div className="trackNumberWrapper">
              <p className="trackNumber">{index + 1}.</p>
            </div>
            <div className="contentText">
              <p className="trackName"> {track.name} </p>
              <p className="trackArtistName">{track.artists[0].name}</p>
            </div>
            <div className="trackNumberWrapper">
              {track.preview_url && (
                <img
                  src={
                    currentTrackUrl === track.preview_url &&
                    !currentAudio?.paused
                      ? pauseIcon
                      : playIcon
                  }
                  alt={currentTrackUrl === track.preview_url ? "Pause" : "Play"}
                  // className={`progress-circle ${
                  //   currentTrackUrl === track.preview_url && !currentAudio?.paused
                  //     ? ""
                  //     : "paused"
                  // }`}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
