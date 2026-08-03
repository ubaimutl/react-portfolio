import React, { useCallback, useEffect, useRef, useState } from "react";

function isTouchDevice() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  return (
    /Android/i.test(ua) ||
    /BlackBerry/i.test(ua) ||
    /iPhone|iPad|iPod/i.test(ua) ||
    /Opera Mini/i.test(ua) ||
    /IEMobile/i.test(ua) ||
    (/Mac/i.test(ua) && navigator.maxTouchPoints > 2)
  );
}

function useEventListener(eventName, handler, element = document) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return undefined;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

function CursorCore({
  outerStyle,
  innerStyle,
  color = "220, 90, 90",
  outerAlpha = 0.3,
  innerSize = 8,
  outerSize = 8,
  outerScale = 6,
  innerScale = 0.6,
  trailingSpeed = 8,
  clickables = [
    "a",
    'input[type="text"]',
    'input[type="email"]',
    'input[type="number"]',
    'input[type="submit"]',
    'input[type="image"]',
    "label[for]",
    "select",
    "textarea",
    "button",
    ".link",
  ],
}) {
  const cursorOuterRef = useRef();
  const cursorInnerRef = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const coords = useRef({ x: 0, y: 0 });
  const endX = useRef(0);
  const endY = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setIsVisible(true);

    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
    }

    endX.current = clientX;
    endY.current = clientY;
  }, []);

  useEffect(() => {
    const animateOuterCursor = (time) => {
      if (previousTimeRef.current !== undefined && cursorOuterRef.current) {
        coords.current.x += (endX.current - coords.current.x) / trailingSpeed;
        coords.current.y += (endY.current - coords.current.y) / trailingSpeed;
        cursorOuterRef.current.style.top = `${coords.current.y}px`;
        cursorOuterRef.current.style.left = `${coords.current.x}px`;
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    };

    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => cancelAnimationFrame(requestRef.current);
  }, [trailingSpeed]);

  useEffect(() => {
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    return () => {
      document.body.style.cursor = previousCursor;
    };
  }, []);

  const onMouseDown = useCallback(() => setIsActive(true), []);
  const onMouseUp = useCallback(() => setIsActive(false), []);
  const onMouseEnterViewport = useCallback(() => setIsVisible(true), []);
  const onMouseLeaveViewport = useCallback(() => setIsVisible(false), []);

  useEventListener("mousemove", onMouseMove);
  useEventListener("mousedown", onMouseDown);
  useEventListener("mouseup", onMouseUp);
  useEventListener("mouseover", onMouseEnterViewport);
  useEventListener("mouseout", onMouseLeaveViewport);

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return;

    if (isActive) {
      cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale})`;
      cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale})`;
    } else {
      cursorInnerRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOuterRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }, [innerScale, outerScale, isActive]);

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return;

    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${
        innerScale * 1.2
      })`;
      cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${
        outerScale * 1.4
      })`;
    }
  }, [innerScale, outerScale, isActiveClickable]);

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return;

    cursorInnerRef.current.style.opacity = isVisible ? 1 : 0;
    cursorOuterRef.current.style.opacity = isVisible ? 1 : 0;
  }, [isVisible]);

  useEffect(() => {
    const clickableEls = document.querySelectorAll(clickables.join(","));
    const handlers = [];

    clickableEls.forEach((el) => {
      const previousCursor = el.style.cursor;
      const onMouseOver = () => setIsActive(true);
      const onClick = () => {
        setIsActive(true);
        setIsActiveClickable(false);
      };
      const onMouseDownClickable = () => setIsActiveClickable(true);
      const onMouseUpClickable = () => setIsActive(true);
      const onMouseOut = () => {
        setIsActive(false);
        setIsActiveClickable(false);
      };

      el.style.cursor = "none";
      el.addEventListener("mouseover", onMouseOver);
      el.addEventListener("click", onClick);
      el.addEventListener("mousedown", onMouseDownClickable);
      el.addEventListener("mouseup", onMouseUpClickable);
      el.addEventListener("mouseout", onMouseOut);

      handlers.push({
        el,
        previousCursor,
        onMouseOver,
        onClick,
        onMouseDownClickable,
        onMouseUpClickable,
        onMouseOut,
      });
    });

    return () => {
      handlers.forEach(
        ({
          el,
          previousCursor,
          onMouseOver,
          onClick,
          onMouseDownClickable,
          onMouseUpClickable,
          onMouseOut,
        }) => {
          el.style.cursor = previousCursor;
          el.removeEventListener("mouseover", onMouseOver);
          el.removeEventListener("click", onClick);
          el.removeEventListener("mousedown", onMouseDownClickable);
          el.removeEventListener("mouseup", onMouseUpClickable);
          el.removeEventListener("mouseout", onMouseOut);
        }
      );
    };
  }, [clickables]);

  const styles = {
    cursorInner: {
      zIndex: 999,
      display: "block",
      position: "fixed",
      borderRadius: "50%",
      width: innerSize,
      height: innerSize,
      pointerEvents: "none",
      backgroundColor: `rgba(${color}, 1)`,
      ...(innerStyle && innerStyle),
      transition: "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
    },
    cursorOuter: {
      zIndex: 999,
      display: "block",
      position: "fixed",
      borderRadius: "50%",
      pointerEvents: "none",
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
      willChange: "transform",
      ...(outerStyle && outerStyle),
    },
  };

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </>
  );
}

export default function AnimatedCursor(props) {
  if (isTouchDevice()) {
    return null;
  }

  return <CursorCore {...props} />;
}
