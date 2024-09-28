import React, { useContext, useState } from "react";
import { CollectContext } from "../context/collectData.context";
import "./Playlist.css";
// import playIcon from "../assets/icons/play.svg";
// import pauseIcon from "../assets/icons/pause.svg";
import baseEllipseIcon from "../assets/icons/loadingEllipse.svg";
import loadingEllipseIcon from "../assets/icons/fullEllipse.svg";
import { Play } from "@just1arale/icons";
import { Stop } from "@just1arale/icons";

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

    // Stop the track after 29 seconds
    setTimeout(() => {
      audio.pause();
      setCurrentTrackUrl(null);
      setCurrentAudio(null);
    }, 29000);
  };

  return (
    <div>
      <ul className="trackWrapper">
        {playlistData.map((track: any) => (
          <li
            key={track.id}
            className={`track ${!track.preview_url && `noTrack`}`}
            onClick={() => playAudio(track.preview_url)}
          >
            <div className="contentText">
              <p className="subHeadline"> {track.name} </p>
              <p className="caption">{track.artists[0].name}</p>
            </div>
            <div className="">
              {track.preview_url && (
                <div className="audioIconWrapper">
                  <img
                    src={baseEllipseIcon}
                    alt={"baseEllipseIcon"}
                    className="baseEllipseIcon"
                  />
                  <img
                    src={loadingEllipseIcon}
                    alt={"loadingEllipseIcon"}
                    className={`loadingEllipseIcon ${
                      currentTrackUrl === track.preview_url && `hidden`
                    }`}
                  />
                  <div
                    className={`progressCicle ${
                      currentTrackUrl === track.preview_url && `active`
                    }`}
                  ></div>
                  {currentTrackUrl === track.preview_url &&
                  !currentAudio?.paused ? (
                    <Stop width="24" height="24" className="audioIcon" />
                  ) : (
                    <Play width="24" height="24" className="audioIcon" />
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
