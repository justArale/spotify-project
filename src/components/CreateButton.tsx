import "./CreateButton.css";
import React from "react";
import newIcon from "../assets/icons/new.svg";

const CreateButton: React.FC = () => {
  return (
    <button className="startButton buttonFont whiteFont">
      <div>
        <img src={newIcon} alt="small plus icon" />
      </div>
      Create new
    </button>
  );
};

export default CreateButton;
