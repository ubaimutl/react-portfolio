import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  withRouter,
} from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../pages/home";
import About from "../pages/about";
import Portfolio from "../pages/portfolio";
import ContactUs from "../pages/contact";
import Headermain from "../header";
import AnimatedCursor from "react-animated-cursor";
import Socialicons from "../components/socialicons";
import "./App.css";


function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  return (
    <>
      <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
      <Router>
        <ScrollToTop>
          <Headermain />
          <Route
            render={(i) => {
              return (
                <AnimatedSwitch
                  atEnter={{ opacity: 0 }}
                  atLeave={{ opacity: 0 }}
                  atActive={{ opacity: 1}}
                >
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/contact" component={ContactUs} />
                  <Route path="*" component={Home} />
                </AnimatedSwitch>
              );
            }}
          />
          <Socialicons />
        </ScrollToTop>
      </Router>
    </>
  );
}
