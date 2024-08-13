import React, { useContext, useState } from "react";
import SelectedArtist from "../components/SelectedArtist";
import { CollectContext } from "../context/collectData.context";

const Resultpage: React.FC = ({}) => {
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
    <div className="landingPageWrapper">
      <SelectedArtist />
      <ul>
        {playlistData.map((track: any) => (
          <li key={track.id}>
            {track.name} - {track.artists[0].name}
            <button onClick={() => playAudio(track.preview_url)}>
              Play Preview
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resultpage;
