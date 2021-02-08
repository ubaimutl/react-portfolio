import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  withRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../pages/home";
import About from "../pages/about";
import Portfolio from "../pages/portfolio";
import ContactUs from "../pages/contact";
import Headermain from "../header";
import AnimatedCursor from "react-animated-cursor";
import Socialicons from "../components/socialicons";

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
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
          <Headermain />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/contact" component={ContactUs} />
            <Route path="*" component={Home} />
          </Switch>
          <Socialicons />
        </ScrollToTop>
      </Router>
    </>
  );
}
