import React from "react";
import { Link } from "react-scroll";
import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <Link to="about" className="nav-tab__link" smooth={true} duration={600}>
        О проекте
      </Link>
      <Link to="techs" className="nav-tab__link" smooth={true} duration={600}>
        Технологии
      </Link>
      <Link to="my" className="nav-tab__link" smooth={true} duration={600}>
        Студент
      </Link>
    </nav>
  );
}
