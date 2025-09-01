import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const BUBBLE_COUNT = 15;

const BubbleBackground = () => {
  const canvasRef = useRef(null);
  const bubbles = useRef([]);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles();
    };

    const initBubbles = () => {
      bubbles.current = [];

      for (let i = 0; i < BUBBLE_COUNT; i++) {
        const size = 100;
        const baseOpacity = 0.1; // Higher opacity for light theme
        const opacity = baseOpacity + Math.random() * 0.2;

        bubbles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.current.forEach((bubble) => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);

        // Subtle pulsing effect
        const pulseOpacity = bubble.opacity + Math.sin(bubble.pulse) * 0.05;

        // Set colors based on theme
        if (isDark) {
          // Dark theme: subtle blue/cyan bubbles
          const colors = [
            `rgba(255, 255, 255, 0.13)`, // red
            // `rgba(255, 165, 0, ${pulseOpacity})`, // orange
            // `rgba(255, 255, 0, ${pulseOpacity})`, // yellow
            // `rgba(0, 255, 0, ${pulseOpacity})`, // green
            // `rgba(0, 0, 255, ${pulseOpacity})`, // blue
            // `rgba(75, 0, 130, ${pulseOpacity})`, // indigo
            // `rgba(238, 130, 238, ${pulseOpacity})`, // violet
            // `rgba(255, 20, 147, ${pulseOpacity})`, // deep pink
            // `rgba(0, 255, 255, ${pulseOpacity})`, // cyan
          ];

          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        } else {
          // Light theme: light grey bubbles
          const colors = [
            // `rgba(200, 200, 200, ${pulseOpacity})`, // light grey
            `rgba(180, 180, 180, ${pulseOpacity})`,   // medium light grey
            // `rgba(220, 220, 220, ${pulseOpacity})`,   // very light grey
          ];
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        }

        ctx.fill();

        // Move bubbles
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        bubble.pulse += 0.02;

        // Bounce off walls
        if (bubble.x < 0 || bubble.x > canvas.width) bubble.speedX *= -1;
        if (bubble.y < 0 || bubble.y > canvas.height) bubble.speedY *= -1;

        // Keep bubbles in bounds
        bubble.x = Math.max(
          bubble.size,
          Math.min(canvas.width - bubble.size, bubble.x)
        );
        bubble.y = Math.max(
          bubble.size,
          Math.min(canvas.height - bubble.size, bubble.y)
        );
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default BubbleBackground;