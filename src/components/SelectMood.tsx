import React from "react";

// const API_TRACK = `https://api.spotify.com/v1/audio-features/${trackId}/danceability`;

interface MoodProps {
  getDanceability: (min: number, max: number) => void;
}

const RangeButton: React.FC<MoodProps> = ({ getDanceability }) => {
  const moodSelector = (id: string, min: number, max: number) => {
    localStorage.setItem("mood", id);
    return getDanceability(min, max);
  };

  return (
    <section className="">
      <h4 className="">Select Your Mood</h4>
      <ul className="">
        <li className="" onClick={() => moodSelector("sleepy", 0.0, 0.2)}>
          <button id="sleepy">
            💤 <span className="ml-2 lg:ml-3">Sleepy</span>
          </button>
        </li>
        <li className="" onClick={() => moodSelector("calm", 0.201, 0.4)}>
          <button id="calm">
            🛁 <span className="ml-2 lg:ml-3">Calm</span>
          </button>
        </li>
        <li className="" onClick={() => moodSelector("studying", 0.401, 0.6)}>
          <button id="studying">
            📚 <span className="ml-2 lg:ml-3">Studying</span>
          </button>
        </li>
        <li className="" onClick={() => moodSelector("cooking", 0.601, 0.8)}>
          <button id="cooking">
            🍳 <span className="ml-2 lg:ml-3">Cooking</span>
          </button>
        </li>
        <li className="" onClick={() => moodSelector("dancing", 0.801, 1)}>
          <button id="dancing">
            🕺 <span className="ml-2 lg:ml-3">Dancing</span>
          </button>
        </li>
        <li className="">*Mood is required</li>
      </ul>
    </section>
  );
};

export default RangeButton;
