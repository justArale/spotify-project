import React, { useContext, useState } from "react";
import { CollectContext } from "../context/collectData.context";
import "./Playlist.css";

const Playlist: React.FC = () => {
  const { playlistData } = useContext(CollectContext);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const playAudio = (url: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);
  };

  return (
    <div>
      <ul className="trackWrapper">
        {playlistData.map((track: any, index: number) => (
          <li
            key={track.id}
            className="track"
            onClick={() => playAudio(track.preview_url)}
          >
            <p className="trackNumber">{index + 1}.</p>
            <div>
              <p className="trackName"> {track.name} </p>
              <p className="trackArtistName">{track.artists[0].name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
