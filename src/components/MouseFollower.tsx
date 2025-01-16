import React, { useEffect, useRef, memo, useCallback } from "react";
import styled from "styled-components";

const Cursor = styled("div")({
  width: "20px",
  height: "20px",
  background: "var(--accent)",
  borderRadius: "50%",
  position: "fixed",
  pointerEvents: "none",
  zIndex: 9999,
  opacity: 0.5,
  mixBlendMode: "difference",
  transition: "transform 0.1s ease",
  transform: "translate(-50%, -50%) scale(1)",

  "@media (hover: none) and (pointer: coarse)": {
    display: "none",
  },
});

const MouseFollower: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isMoving = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const updateCursorPosition = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;

    const scale = isMoving.current ? 0.8 : 1;
    cursorRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

    lastX.current = x;
    lastY.current = y;
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!cursorRef.current) return;

      isMoving.current = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        updateCursorPosition(e.clientX, e.clientY);
        setTimeout(() => {
          isMoving.current = false;
          updateCursorPosition(e.clientX, e.clientY);
        }, 100);
      });
    },
    [updateCursorPosition],
  );

  useEffect(() => {
    if (navigator.maxTouchPoints > 0) return;

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onMouseMove]);

  if (navigator.maxTouchPoints > 0) return null;

  return <Cursor ref={cursorRef} />;
};

export default memo(MouseFollower);
