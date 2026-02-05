import { Link } from "react-router-dom";
import React from "react";

export default function Layout(props: { children: React.JSX.Element }) {
  return (
    <>
      <nav className="menu-bar">
        <Link to="/">
          <span>Cat Tracker</span>
        </Link>
        <div className="profile-img">
          <img src="src/assets/pfp.png"></img>
        </div>
      </nav>
      {props.children}
    </>
  );
}
