import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";

const TRANSITION_MS = 400;

function RouteView({ pathname }) {
  return (
    <Routes location={{ pathname }}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [pages, setPages] = useState(() => [
    {
      className: "",
      id: `${location.pathname}-initial`,
      pathname: location.pathname,
    },
  ]);

  useEffect(() => {
    setPages((currentPages) => {
      const currentPage = currentPages[currentPages.length - 1];

      if (currentPage?.pathname === location.pathname) {
        return currentPages;
      }

      const nextPage = {
        className: "page-enter",
        id: `${location.pathname}-${Date.now()}`,
        pathname: location.pathname,
      };

      return [
        ...currentPages.map((page) => ({
          ...page,
          className: "page-exit",
        })),
        nextPage,
      ];
    });

    const frame = requestAnimationFrame(() => {
      setPages((currentPages) =>
        currentPages.map((page) =>
          page.pathname === location.pathname
            ? { ...page, className: "page-enter page-enter-active" }
            : { ...page, className: "page-exit page-exit-active" }
        )
      );
    });

    const timeout = window.setTimeout(() => {
      setPages((currentPages) =>
        currentPages
          .filter((page) => page.pathname === location.pathname)
          .map((page) => ({ ...page, className: "" }))
      );
    }, TRANSITION_MS);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [location.pathname]);

  return (
    <>
      {pages.map((page) => (
        <div className={page.className} key={page.id}>
          <RouteView pathname={page.pathname} />
        </div>
      ))}
    </>
  );
}

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
