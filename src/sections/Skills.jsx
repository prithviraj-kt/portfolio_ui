import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaCode,
  FaPalette,
  FaTools,
  FaServer,
  FaDatabase,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: <FaCode />,
    color: "var(--primary-600)",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Bootstrap", level: 85 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Shad cn", level: 80 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Methods",
    icon: <FaTools />,
    color: "var(--accent-600)",
    skills: [
      { name: "Git/GitHub", level: 85 },
      { name: "Agile/Scrum", level: 80 },
      { name: "Webpack", level: 75 },
      { name: "CI/CD", level: 70 },
      { name: "Performance Optimization", level: 85 },
      { name: "Docker", level: 85 },
      { name: "Cost Optimization", level: 80 },
      { name: "Monorepo/ Turborepo", level: 80 },
    ],
  },
  {
    id: "database",
    title: "Database & Cloud",
    icon: <FaDatabase />,
    color: "var(--accent-700)",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "Mysql", level: 80 },
      { name: "Postgress Sql", level: 85 },
      { name: "AWS", level: 70 },
      { name: "Firebase", level: 85 },
      { name: "SQL", level: 75 },
      { name: "Supabase", level: 78 },
      { name: "Vercel/Netlify", level: 90 },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: <FaServer />,
    color: "var(--primary-700)",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 82 },
      { name: "Mongoose", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Prisma", level: 85 },
      { name: "Mysql", level: 80 },
      { name: "Postgress Sql", level: 85 },
      { name: "RESTful APIs", level: 82 },
      { name: "Web sockets", level: 85 },
      { name: "RESTful APIs", level: 80 },
      { name: "Flask", level: 85 },
      { name: "Fast Api", level: 85 },
      { name: "GraphQL", level: 85 },
      { name: "Firebase", level: 90 },
    ],
  },
  {
    id: "machine learing",
    title: "Machine Learning and Tools",
    icon: <FaDatabase />,
    color: "var(--accent-700)",
    skills: [
      { name: "Algebra", level: 80 },
      { name: "Probablity and Statistics", level: 80 },
      { name: "Machine Learning", level: 85 },
      { name: "Deep Learning", level: 70 },
      { name: "Transformers", level: 85 },
      { name: "LLM's", level: 75 },
      { name: "Generative AI", level: 78 },
      { name: "Agentic AI", level: 80 },
      { name: "Numpy", level: 80 },
      { name: "Pandas", level: 75 },
      { name: "Matplotlib", level: 70 },
      { name: "Seaborne", level: 60 },
      { name: "Keras", level: 90 },
      { name: "Scikit-learn", level: 85 },
      { name: "Tensorflow", level: 85 },
      { name: "Pytorch", level: 85 },
    ],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skillsContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (skillsContainerRef.current) {
      const { scrollWidth, scrollLeft, clientWidth } =
        skillsContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(Math.abs(scrollWidth - clientWidth - scrollLeft) > 1);
    }
  };

  const handleScrollLeft = () => {
    if (skillsContainerRef.current) {
      const cardWidth =
        skillsContainerRef.current.querySelector(".skill-category-card")
          ?.offsetWidth || 300;
      const scrollAmount = cardWidth + 24;
      skillsContainerRef.current.scrollBy({
        left: -scrollAmount * 2,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (skillsContainerRef.current) {
      const cardWidth =
        skillsContainerRef.current.querySelector(".skill-category-card")
          ?.offsetWidth || 300;
      const scrollAmount = cardWidth + 24;
      skillsContainerRef.current.scrollBy({
        left: scrollAmount * 2,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = skillsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technical skills and professional competencies that I bring to the table"
        />

        <div style={{ position: "relative" }}>
          <motion.div
            ref={skillsContainerRef}
            className="skills-container"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              scrollbarWidth: "none",
              MsOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              gap: "var(--spacing-3)",
              paddingBottom: "10px",
            }}
          >
            <style>
              {`
                .skills-container::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>

            {skillCategories.map((category) => (
              <motion.div
                key={category.id}
                className="skill-category-card glass"
                variants={itemVariants}
                style={{
                  borderRadius: "12px",
                  padding: "var(--spacing-3)",
                  height: "100%",
                  minWidth: "300px",
                  flexShrink: 0,
                }}
              >
                <div
                  className="category-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--spacing-2)",
                    marginBottom: "var(--spacing-3)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: category.color,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    {category.icon}
                  </div>
                  <h3 style={{ margin: 0 }}>{category.title}</h3>
                </div>

                <div className="skills-list">
                  {category.skills.map((skill, index) => (
                    <div
                      key={index}
                      style={{ marginBottom: "var(--spacing-3)" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div
                        style={{
                          height: "8px",
                          background: "var(--dark-bg)",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          style={{
                            height: "100%",
                            background: `linear-gradient(90deg, ${category.color}, rgba(255,255,255,0.5))`,
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {showLeftButton && (
            <motion.button
              onClick={handleScrollLeft}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                ...pulseAnimation,
                opacity: 1,
                x: 0,
              }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                position: "absolute",
                top: "25%",
                left: "10px",
                transform: "translateY(-25%)",
                background: "var(--dark-card)",
                color: "var(--text-primary)",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
                zIndex: 10,
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              }}
            >
              <FaChevronLeft size={24} />
            </motion.button>
          )}

          {showRightButton && (
            <motion.button
              onClick={handleScrollRight}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                ...pulseAnimation,
                opacity: 1,
                x: 0,
              }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                position: "absolute",
                top: "25%",
                right: "10px",
                transform: "translateY(-25%)",
                background: "var(--dark-card)",
                color: "var(--text-primary)",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
                zIndex: 10,
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              }}
            >
              <FaChevronRight size={24} />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
