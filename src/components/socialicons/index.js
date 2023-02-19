import React from "react";
import "./style.css";
import {
  FaPatreon,
  FaFlickr,
  FaGithub,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa";
import { socialprofils } from "../../content_option";

export const Socialicons = (params) => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {socialprofils.patreon && (
          <li>
            <a href={socialprofils.patreon}>
              <FaPatreon />
            </a>
          </li>
        )}
        {socialprofils.flickr && (
          <li>
            <a href={socialprofils.flickr}>
              <FaFlickr />
            </a>
          </li>
        )}
        {socialprofils.github && (
          <li>
            <a href={socialprofils.github}>
              <FaGithub />
            </a>
          </li>
        )}
        {socialprofils.youtube && (
          <li>
            <a href={socialprofils.youtube}>
              <FaYoutube />
            </a>
          </li>
        )}
        {socialprofils.instagram && (
          <li>
            <a href={socialprofils.instagram}>
              <FaInstagram />
            </a>
          </li>
        )}
        {socialprofils.linkedin && (
          <li>
            <a href={socialprofils.linkedin}>
              <FaLinkedin />
            </a>
          </li>
        )}
        {socialprofils.facebook && (
          <li>
            <a href={socialprofils.facebook}>
              <FaFacebookF />
            </a>
          </li>
        )}
      </ul>
      <p>Follow Me</p>
    </div>
  );
};
