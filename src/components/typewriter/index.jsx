import React, { useEffect, useMemo, useState } from "react";

const CURSOR_STYLE_ID = "typewriter-cursor-styles";
const TYPE_DELAY_MIN = 120;
const TYPE_DELAY_MAX = 160;

function getNaturalDelay() {
  return Math.floor(
    Math.random() * (TYPE_DELAY_MAX - TYPE_DELAY_MIN + 1) + TYPE_DELAY_MIN
  );
}

function addCursorStyles() {
  if (document.getElementById(CURSOR_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = CURSOR_STYLE_ID;
  style.textContent = `
.Typewriter__cursor {
  animation: Typewriter-cursor 1s infinite;
  margin-left: 1px;
}

@keyframes Typewriter-cursor {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}`;
  document.head.appendChild(style);
}

export default function Typewriter({ component: Component = "div", options = {} }) {
  const {
    autoStart = false,
    cursor = "|",
    cursorClassName = "Typewriter__cursor",
    deleteSpeed = "natural",
    delay = "natural",
    loop = false,
    pauseFor = 1500,
    strings = [],
    wrapperClassName = "Typewriter__wrapper",
  } = options;
  const normalizedStrings = useMemo(
    () => (Array.isArray(strings) ? strings : [strings]).filter(Boolean),
    [strings]
  );
  const [state, setState] = useState({
    phase: autoStart ? "typing" : "idle",
    stringIndex: 0,
    text: "",
  });

  useEffect(() => {
    addCursorStyles();
  }, []);

  useEffect(() => {
    if (!autoStart || normalizedStrings.length === 0 || state.phase === "idle") {
      return undefined;
    }

    const currentString = normalizedStrings[state.stringIndex] || "";

    if (state.phase === "typing") {
      if (state.text.length < currentString.length) {
        const speed = delay === "natural" ? getNaturalDelay() : delay;
        const timeout = window.setTimeout(() => {
          setState((currentState) => ({
            ...currentState,
            text: currentString.slice(0, currentState.text.length + 1),
          }));
        }, speed);

        return () => window.clearTimeout(timeout);
      }

      const timeout = window.setTimeout(() => {
        setState((currentState) => ({
          ...currentState,
          phase: "deleting",
        }));
      }, pauseFor);

      return () => window.clearTimeout(timeout);
    }

    if (state.phase === "deleting") {
      if (state.text.length > 0) {
        const speed = deleteSpeed === "natural" ? getNaturalDelay() : deleteSpeed;
        const timeout = window.setTimeout(() => {
          setState((currentState) => ({
            ...currentState,
            text: currentState.text.slice(0, -1),
          }));
        }, speed);

        return () => window.clearTimeout(timeout);
      }

      const isLastString = state.stringIndex === normalizedStrings.length - 1;
      if (isLastString && !loop) {
        setState((currentState) => ({
          ...currentState,
          phase: "idle",
        }));
        return undefined;
      }

      setState((currentState) => ({
        phase: "typing",
        stringIndex: (currentState.stringIndex + 1) % normalizedStrings.length,
        text: "",
      }));
    }

    return undefined;
  }, [
    autoStart,
    delay,
    deleteSpeed,
    loop,
    normalizedStrings,
    pauseFor,
    state.phase,
    state.stringIndex,
    state.text,
  ]);

  return (
    <Component className="Typewriter" data-testid="typewriter-wrapper">
      <span className={wrapperClassName}>{state.text}</span>
      <span className={cursorClassName}>{cursor}</span>
    </Component>
  );
}
