import React from "react";
import newIcon from "../assets/icons/new.svg";

const CreateButton: React.FC = () => {
  return (
    <button>
      <img src={newIcon} alt="small plus icon" />
      Create new
    </button>
  );
};

export default CreateButton;
