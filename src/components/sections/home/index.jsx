import "./styles.css";
import logoImage from "../../../assets/name_logo.svg";
import personImage from "../../../assets/first_page_image.svg";
import SocialButton from "../../common/social_button";
import { useEffect, useState } from "react";
import { navLinks, socials } from "../../common/data";
import { smoothScrollToElement } from "../../common/helpers";

const Home = () => {
  // State and effects

  const [overlayStyle, setOverlayStyle] = useState({
    height: "100%",
    width: "100%",
    background: "rgb(126,126,126,0.94)",
    top: "0",
    left: "0",
    transform: "translate(0,-100%)",
    visibility: "invisible",
    transition: "transform 0.6s",
    position: "absolute",
    display: "block",
  });

  const [hamburgerStyle, setHamburgerStyle] = useState({
    display: "block",
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
  });

  // Helper functions

  const handleDocumentClick = (e) => {
    e.preventDefault();
    if (e.target.className === "home-overlay_bar--container") {
      hideOverlay();
    }
  };

  const hideOverlay = () => {
    setOverlayStyle({
      height: "100%",
      width: "100%",
      background: "rgb(126,126,126,0.94)",
      top: "0",
      left: "0",
      transform: "translate(0,-100%)",
      transition: "transform 0.6s",
      position: "absolute",
      display: "block",
    });

    setHamburgerStyle({
      visibility: "visible",
      transition: "visibility 0.7s",
    });
  };

  const showOverlay = (e) => {
    e.preventDefault();

    setOverlayStyle({
      height: "100%",
      width: "100%",
      background: "rgb(126,126,126,0.96)",
      top: "0",
      left: "0",
      transform: "translate(0, 0)",
      transition: "transform 0.6s",
      position: "absolute",
      display: "block",
    });

    setHamburgerStyle({
      visibility: "hidden",
    });
  };

  // Sub components

  const hideOverlayAndScrollToElement = (e, id) => {
    hideOverlay();
    smoothScrollToElement(e, id);
  };

  const NavMenu = () => {
    return (
      <div className="home-overlay_bar" id="overlay" style={overlayStyle}>
        <div className="home-overlay_bar--container">
          {navLinks.map((navLink) => (
            <a
              href="/"
              onClick={(e) => hideOverlayAndScrollToElement(e, navLink.id)}
            >
              <h1>{navLink.title.toUpperCase()}</h1>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const Hamburger = ({ hamburgerStyle, showOverlay }) => {
    return (
      <div className="navbar-burger" style={hamburgerStyle}>
        <a href="/" onClick={(e) => showOverlay(e)}>
          <div className="nav-bars">
            <div id="nav-bars_1" />
            <div id="nav-bars_2" />
          </div>
        </a>
      </div>
    );
  };

  const Socials = () => {
    return (
      <div className="home-flex3_social">
        {socials.map((social) => (
          <SocialButton href={social.link} class={social.fontAwesomeClass} />
        ))}
      </div>
    );
  };

  const IntroSection = () => {
    return (
      <div className="home-flex2_intro">
        <h1>Namaste 🙏, I'm Gaurav</h1>
        <h3>A software engineer at Google</h3>
        <h4>(And clearly not a UX designer)</h4>
      </div>
    );
  };

  const BackgroundImage = () => {
    return <img src={logoImage} width="200" alt="" />;
  };

  const PersonImage = () => {
    return <img id="home-flex2_person" src={personImage} alt="" />;
  };

  // Home

  return (
    <div className="home" id="home">
      <div className="home-flex1">
        {NavMenu()}
        <BackgroundImage />
      </div>

      <div className="home-flex2">
        <IntroSection />
        <PersonImage />
      </div>

      <div className="home-flex3">
        <Hamburger hamburgerStyle={hamburgerStyle} showOverlay={showOverlay} />
        <Socials />
        <div className="home-flex3_spacer" />
      </div>
    </div>
  );
};

export default Home;
