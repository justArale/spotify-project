import "../components/Landingpage.css";
import React, { useEffect } from "react";
import Header from "../components/Header";
import About from "../components/About";

const Landingpage: React.FC = () => {
  useEffect(() => {
    alert(
      "Welcome to my Spotify project! Due to recent changes in Spotify's Web API as of November 27, 2024, some API calls are now restricted. Unfortunately, this impacts key features of the website, including playlist creation and track preview playback. I appreciate your understanding and patience as I work on potential solutions."
    );
  }, []);

  return (
    <div className="landingPageWrapper">
      <Header />
      <About />
    </div>
  );
};

export default Landingpage;
