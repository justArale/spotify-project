import "./CreateButton.css";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CollectContext } from "../context/collectData.context";
import { Add } from "@just1arale/icons";

const CreateButton: React.FC = () => {
  const { setArtistID, setDanceMin, setDanceMax } = useContext(CollectContext);

  const location = useLocation();
  const isResultPage = location.pathname === "/result";
  const navigate = useNavigate();

  const handleStartClick = () => {
    // Reset the values in the context
    setArtistID("");
    setDanceMin(null);
    setDanceMax(null);
    navigate("/generate");
  };

  return (
    <div className="buttonWrapper">
      <button
        className={`startButton buttonFont ${
          isResultPage ? "resultPageStyle" : "mainPageStyle"
        }`}
        onClick={handleStartClick}
      >
        <Add width="24" height="24" />
        {isResultPage ? "Create new playlist" : "Create playlist"}
      </button>
    </div>
  );
};

export default CreateButton;
