import React from "react";
import { BsGithub, BsLinkedin } from 'react-icons/bs'

import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-created-by">
        <p className="footer-owner">Chiew Saetern</p>
        <a
          className="github-icon"
          href="https://github.com/chiews89"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub/>
        </a>
        <a
          className="linkedin-icon"
          href="https://www.linkedin.com/in/chiew-saetern-7a255b95/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsLinkedin/>
        </a>
      </div>
    </div>
  );
};
