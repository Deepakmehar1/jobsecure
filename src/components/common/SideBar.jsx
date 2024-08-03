import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Clock from "../../services/Clock";

const SideBar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  var i = 0;


  var Teack = () => {
      const hamburger = document.querySelector(".hamburger");

    if (i === 0) {
      document.querySelector("#loadersvg").style.animation =
        "logo-spin 0.5s cubic-bezier(0.61, 0.02, 0.37, 0.99) 0.1s";
      setTimeout(() => {
        document.querySelector("#loadersvg").style.right = "-250px";
        document.querySelector(".sidebar-container").style.right = "-300px";
        document.querySelector("#loadersvg").style.borderTopLeftRadius = "0%";
        document.querySelector("#loadersvg").style.borderBottomLeftRadius =
          "0%";
      }, 500);
      hamburger.classList.add("open");
      return (i = 1);
    } else {
      document.querySelector("#loadersvg").style.animation = "none";
      document.querySelector("#loadersvg").style.animation =
        "logo-spin2 0.5s cubic-bezier(0.61, 0.02, 0.37, 0.99) 0.1s";
      document.querySelector(".sidebar-container").style.right = "-625px";

      setTimeout(() => {
        document.querySelector("#loadersvg").style.right = "-625px";
        document.querySelector("#loadersvg").style.borderTopLeftRadius = "50%";
        document.querySelector("#loadersvg").style.borderBottomLeftRadius =
          "50%";
      }, 500);
      hamburger.classList.remove("open");
      return (i = 0);
    }
  };

  const renderList = () => {
    if (localStorage.getItem("user")) {
      return [
        <li key={"home"}>
          <Link to="/">
            <i class="fi fi-rr-home"></i>home
          </Link>
        </li>,
        <li key={"jobs"}>
          <Link to="/jobs">
            <i class="fi fi-rr-list"></i>jobs
          </Link>
        </li>,
        <li key={"list"}>
          <Link to="/candidate/home">
            <i class="fi fi-rr-time-past"></i>history
          </Link>
        </li>,

        <li
          key={"logout"}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          <i class="fi fi-tr-sign-out-alt"></i>
          logout
        </li>,
      ];
    } else {
      return [
        <li key={"l-home"}>
          <Link to="/">
            <i class="fi fi-rr-home"></i>home
          </Link>
        </li>,
        <li key={"l-jobe"}>
          <Link to="/jobs">
            <i class="fi fi-rr-list"></i>jobs
          </Link>
        </li>,
        <li
          key={"login"}
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          <i class="fi fi-tr-sign-in-alt"></i>login
        </li>,
      ];
    }
  };
  return (
    <div>
      <Clock />

      <div className="sidebar hamburger-container" onClick={Teack}>
        <button class="hamburger">
          <span class="hamburger-top"></span>
          <span class="hamburger-bot"></span>
        </button>

        {/* <i class="fi fi-rr-menu-burger"></i> */}
      </div>
      <div className="sidebar logo">
        <Link to="/jobs">js</Link>
      </div>
      <ul className="sidebar-container">
        {user && (
          <div className="user-info">
            <img src={user.picture} alt={user.name} className="user-picture" />
            <h4>{user.name}</h4>
          </div>
        )}

        {renderList()}
      </ul>
      <svg id="loadersvg" viewBox="0 0 1 1" preserveAspectRatio="none">
        <clipPath id="clippath" clipPathUnits="objectBoundingBox">
          <path d="M 0 1 V 0.5 Q 0.5 1 1 0.5 V 1 z" />
        </clipPath>
      </svg>
    </div>
  );
};
export default SideBar;
