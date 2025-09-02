import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const TRAIL_COUNT = 8;

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = () => setShowCursor(true);
    const handleMouseLeave = () => setShowCursor(false);

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    if ("ontouchstart" in window || navigator.maxTouchPoints) {
      setShowCursor(false);
    } else {
      setShowCursor(true);
    }

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Different palettes for themes
  const COLORS = isDark
    ? [
        "rgba(33, 150, 243, 0.4)", // blue
        "rgba(156, 39, 176, 0.4)", // purple
        "rgba(244, 67, 54, 0.4)",  // red
        "rgba(0, 200, 83, 0.4)",   // green
        "rgba(255, 193, 7, 0.4)",  // amber
        "rgba(0, 188, 212, 0.4)",  // cyan
        "rgba(233, 30, 99, 0.4)",  // pink
        "rgba(121, 85, 72, 0.4)",  // brown
      ]
    : [
        "rgba(0, 102, 255, 0.7)",  // bright blue
        "rgba(186, 85, 211, 0.7)", // orchid purple
        "rgba(255, 69, 0, 0.7)",   // orange-red
        "rgba(50, 205, 50, 0.7)",  // lime green
        "rgba(255, 215, 0, 0.7)",  // gold
        "rgba(0, 206, 209, 0.7)",  // turquoise
        "rgba(255, 20, 147, 0.7)", // deep pink
        "rgba(105, 105, 105, 0.7)",// dim grey
      ];

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        const size = 40 - i * 4;
        const color = COLORS[i % COLORS.length];

        return (
          <motion.div
            key={i}
            animate={{
              x: mousePosition.x - size / 2,
              y: mousePosition.y - size / 2,
              opacity: showCursor ? 1 : 0,
            }}
            transition={{
              type: "spring",
              damping: 20 + i * 2,
              stiffness: 250 - i * 15,
              mass: 0.4 + i * 0.3,
            }}
            style={{
              position: "fixed",
              zIndex: 9999 - i,
              pointerEvents: "none",
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              backgroundColor: color,
              border: `2px solid ${color.replace("0.7", "1")}`,
              boxShadow: isDark
                ? `0 0 15px ${color.replace("0.4", "0.8")}`
                : `0 0 25px ${color.replace("0.7", "1")}, 0 0 40px ${color.replace("0.7", "0.6")}`,
              // mixBlendMode: isDark ? "screen" : "multiply", // better contrast
            }}
          />
        );
      })}
    </>
  );
};

export default CursorFollower;
