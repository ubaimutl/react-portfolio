
import React from "react";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "../pages/home";
import About from "../pages/about";
import Portfolio from "../pages/portfolio";
import ContactUs from "../pages/contact";

function AppRoutes() {
  return (
    <AnimatedSwitch
      atEnter={anim.atEnter}
      atLeave={anim.atLeave}
      atActive={anim.atActive}
      mapStyles={mapStyles}
      className="page"
    >
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/contact" component={ContactUs} />
      <Route path="*" component={Home} />
    </AnimatedSwitch>
  );
}

function mapStyles(styles) {
  return {
    transition: `transform 100ms ease`,
    transform: `translateY(${styles.translateY}%)`,
  };
}

const anim = {
  atEnter: {
    translateY: 100,
  },
  atLeave: {
    translateY: -130,
  },
  atActive: {
    translateY: 0,
  },
};

export default AppRoutes;
