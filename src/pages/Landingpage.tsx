import "../components/Landingpage.css";
import React from "react";
import Header from "../components/Header";
import About from "../components/About";

const Landingpage: React.FC = () => {
  return (
    <div className="landingPageWrapper">
      <Header />
      <About />
    </div>
  );
};

export default Landingpage;
