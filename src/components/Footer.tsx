import "./Footer.css";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="creditWrapper">
        <p className="meta">
          <a
            href="https://github.com/justArale/spotify-project "
            target="_blank"
            className="blackFont"
          >
            Spotify Project
          </a>{" "}
          made with ❤️ {"   "}by{"  "}
          <a
            href="https://github.com/justArale"
            target="_blank"
            className="blackFont"
          >
            Arale
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
