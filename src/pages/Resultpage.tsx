import React, { useState } from "react";
import SelectedArtist from "../components/SelectedArtist";

interface ResultProps {
  playlistData: any;
}

const Resultpage: React.FC<ResultProps> = ({ playlistData }) => {
  const getPlaylistData = localStorage.getItem("playlistData");
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
    <div className="landingPageWrapper">
      <SelectedArtist />
      <h5>Your playlist will be displayed here ✌️</h5>
      {/* <ul>
        {playlistData.map((track: any) => (
          <li key={track.id}>
            {track.name} - {track.artists[0].name}
            <button onClick={() => playAudio(track.preview_url)}>
              Play Preview
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Resultpage;
