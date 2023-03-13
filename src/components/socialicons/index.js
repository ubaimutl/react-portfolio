import React from "react";
import "./style.css";
import {
  FaInstagram,
  FaMailBulk,
} from "react-icons/fa";
import { socialprofils } from "../../content_option";

export const Socialicons = (params) => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {socialprofils.instagram && (
          <li>
            <a href={socialprofils.instagram}>
              <FaInstagram />
            </a>
          </li>
        )}
      </ul>
      <ul>
        {socialprofils.FaMailBulk && (
          <li>
            <a href={socialprofils.FaMailBulk}>
              <FaMailBulk />
            </a>
          </li>
        )}
      </ul>
      <p>Follow Us</p>
    </div>
  );
};
