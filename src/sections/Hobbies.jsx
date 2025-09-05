import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaCode,
  FaPaintBrush,
  FaMusic,
  FaDumbbell,
  FaFistRaised,
  FaGlobeAmericas,
  FaChalkboardTeacher,
  FaTheaterMasks,
} from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";

const Hobbies = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const Hobbies = [
    {
      id: 1,
      title: "Coding",
      description:
        "Building projects, solving problems, and exploring new technologies is my passion.",
      icon: <FaCode />,
      color: "var(--primary-500)", // tech/blue
    },
    {
      id: 2,
      title: "Drawing, Sketching & Painting",
      description:
        "Won multiple prizes during school for artistic achievements.",
      icon: <FaPaintBrush />,
      color: "var(--accent-600)", // creative/purple
    },
    {
      id: 3,
      title: "Flute",
      description:
        "Self-taught musician, I enjoy playing flute in my leisure time.",
      icon: <FaMusic />,
      color: "var(--secondary-600)", // calm/teal
    },
    {
      id: 4,
      title: "Gym & Fitness",
      description:
        "Regular exercise keeps me energized, disciplined, and focused.",
      icon: <FaDumbbell />,
      color: "var(--success-500)", // health/green
    },
    {
      id: 5,
      title: "Martial Arts",
      description:
        "Self-taught martial artist, practicing since a very young age.",
      icon: <FaFistRaised />,
      color: "#e53935", // strength/red
    },
    {
      id: 6,
      title: "Travel & Culture",
      description: "Love exploring new places, cultures, and cuisines.",
      icon: <FaGlobeAmericas />,
      color: "var(--accent-500)", // adventure/orange
    },
    {
      id: 7,
      title: "Mentoring & Teaching",
      description: "Enjoy helping others learn, grow, and build together.",
      icon: <FaChalkboardTeacher />,
      color: "#0288d1", // teaching/blue
    },
    {
      id: 8,
      title: "Dance & Drama",
      description: "Performed in multiple cultural events and stage shows.",
      icon: <FaTheaterMasks />,
      color: "var(--warning-500)", // arts/gold
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <section id="Hobbies" ref={ref} style={{ padding: "4rem 0" }}>
      <div className="container">
        <SectionTitle
          title="Hobbies & Interests"
          subtitle="Highlights my Hobbies and Interests"
        />

        {/* Achievements Grid */}
        <motion.div
          className="Hobbies-grid"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "var(--spacing-4)",
            marginTop: "2rem",
          }}
        >
          {Hobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="hobby-card"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                padding: "var(--spacing-4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                boxShadow: "var(--shadow-lg)",
                cursor: "default",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  backgroundColor: hobby.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                }}
              >
                {hobby.icon}
              </div>
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1.1rem",
                  color: "var(--text-primary)",
                }}
              >
                {hobby.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                {hobby.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hobbies;
