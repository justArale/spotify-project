import React, { useContext } from "react";
import { CollectContext } from "../context/collectData.context";
import { ArrowRight } from "@just1arale/icons";

// const API_TRACK = `https://api.spotify.com/v1/audio-features/${trackId}/danceability`;

interface MoodProps {
  getDanceability: (min: number, max: number) => void;
}

const SelectMood: React.FC<MoodProps> = ({ getDanceability }) => {
  const { setChoosenMood } = useContext(CollectContext);

  const moodSelector = (id: string, min: number, max: number) => {
    setChoosenMood(id);
    return getDanceability(min, max);
  };

  return (
    <div className="contentFieldWrapper">
      <p className="bodyText">Step 2 of 2</p>
      <h4 className="pageTitle">Select Mood</h4>
      <ul className="contentList">
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Sleepy", 0.0, 0.2)}
        >
          <p
            id="sleepy"
            className="subHeadline artistImageWrapper emojiWrapper"
          >
            💤
          </p>
          <p className="subHeadline contentText">Sleepy</p>
          <ArrowRight width="24" height="24" />
        </li>
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Calm", 0.201, 0.4)}
        >
          <p id="calm" className="subHeadline artistImageWrapper emojiWrapper">
            🛁
          </p>
          <p className="subHeadline contentText">Calm</p>
          <ArrowRight width="24" height="24" />
        </li>
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Studying", 0.401, 0.6)}
        >
          <p
            id="studying"
            className="subHeadline artistImageWrapper emojiWrapper"
          >
            📚
          </p>
          <p className="subHeadline contentText">Studying</p>
          <ArrowRight width="24" height="24" />
        </li>
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Cooking", 0.601, 0.8)}
        >
          <p
            id="cooking"
            className="subHeadline artistImageWrapper emojiWrapper"
          >
            🍳
          </p>
          <p className="subHeadline contentText">Cooking</p>
          <ArrowRight width="24" height="24" />
        </li>
        <li
          className="contentField contentListItem"
          onClick={() => moodSelector("Dancing", 0.801, 1)}
        >
          <p
            id="dancing"
            className="subHeadline artistImageWrapper emojiWrapper"
          >
            🕺
          </p>
          <p className="subHeadline contentText">Dancing</p>
          <ArrowRight width="24" height="24" />
        </li>
      </ul>
    </div>
  );
};

export default SelectMood;
