import React from "react";
import arrowIcon from "../assets/icons/arrow.svg";

// const API_TRACK = `https://api.spotify.com/v1/audio-features/${trackId}/danceability`;

interface MoodProps {
  getDanceability: (min: number, max: number) => void;
}

const SelectMood: React.FC<MoodProps> = ({ getDanceability }) => {
  const moodSelector = (id: string, min: number, max: number) => {
    localStorage.setItem("mood", id);
    return getDanceability(min, max);
  };

  return (
    <div className="contentFieldWrapper">
      <h4 className="title">Select Mood</h4>
      <ul className="contentList">
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Sleepy", 0.0, 0.2)}
        >
          <p id="sleepy" className="inputFont contentText">
            💤 <span>Sleepy</span>
          </p>
          <img
            src={arrowIcon}
            alt="Icon of an arrow that shows to the right side"
          />
        </li>
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Calm", 0.201, 0.4)}
        >
          <p id="calm" className="inputFont contentText">
            🛁 <span>Calm</span>
          </p>
          <img
            src={arrowIcon}
            alt="Icon of an arrow that shows to the right side"
          />
        </li>
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Studying", 0.401, 0.6)}
        >
          <p id="studying" className="inputFont contentText">
            📚 <span>Studying</span>
          </p>
          <img
            src={arrowIcon}
            alt="Icon of an arrow that shows to the right side"
          />
        </li>
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Cooking", 0.601, 0.8)}
        >
          <p id="cooking" className="inputFont contentText">
            🍳 <span>Cooking</span>
          </p>
          <img
            src={arrowIcon}
            alt="Icon of an arrow that shows to the right side"
          />
        </li>
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Dancing", 0.801, 1)}
        >
          <p id="dancing" className="inputFont contentText">
            🕺 <span>Dancing</span>
          </p>
          <img
            src={arrowIcon}
            alt="Icon of an arrow that shows to the right side"
          />
        </li>
      </ul>
    </div>
  );
};

export default SelectMood;
