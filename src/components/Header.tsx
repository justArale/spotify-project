import React from "react";
import CreateButton from "./CreateButton";
import CoverImage from "../assets/Cover.png";

const Header: React.FC = () => {
  return (
    <div>
      <img
        src={CoverImage}
        alt="Image with a yellow background and a headphone on the right side"
      />
      <h1>Header</h1>
      <CreateButton />
    </div>
  );
};

export default Header;
