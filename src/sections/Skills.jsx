import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaCode,
  FaPalette,
  FaTools,
  FaServer,
  FaDatabase,
  FaChevronDown,
  FaChevronUp,
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
    id: "backend",
    title: "Backend Development",
    icon: <FaServer />,
    color: "var(--primary-700)",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 82 },

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
    id: "database",
    title: "Database & Cloud",
    icon: <FaDatabase />,
    color: "var(--accent-700)",
    skills: [
      { name: "Mongoose", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Prisma", level: 85 },
      { name: "Mysql", level: 80 },
      { name: "Postgress Sql", level: 85 },
      { name: "Vector DB", level: 70 },
      { name: "AWS", level: 70 },
      { name: "Firebase", level: 85 },
      { name: "SQL", level: 75 },
      { name: "Supabase", level: 78 },
      { name: "Vercel/Netlify", level: 90 },
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
    id: "machine learing",
    title: "Data Science and Tools",
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

  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

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

  const dropdownVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.05,
      },
    },
  };

  const skillItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
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

        <motion.div
          className="skills-dropdown-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-3)",
          }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="skill-category-dropdown glass"
              variants={itemVariants}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "var(--shadow-lg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              whileHover={{
                boxShadow:
                  "var(--shadow-xl), 0 0 30px rgba(102, 126, 234, 0.2)",
                transform: "translateY(-2px)",
              }}
            >
              <motion.button
                className="category-header-button"
                onClick={() => toggleCategory(category.id)}
                style={{
                  width: "100%",
                  padding: "var(--spacing-4)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "var(--text-primary)",
                  position: "relative",
                  overflow: "hidden",
                }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="header-content"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--spacing-3)",
                  }}
                >
                  <motion.div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, ${category.color}, rgba(255,255,255,0.2))`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "1.3rem",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    }}
                    animate={
                      expandedCategory === category.id ? pulseAnimation : {}
                    }
                  >
                    {category.icon}
                  </motion.div>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        background:
                          expandedCategory === category.id
                            ? `linear-gradient(135deg, ${category.color}, var(--primary-400))`
                            : "none",
                        WebkitBackgroundClip:
                          expandedCategory === category.id ? "text" : "unset",
                        WebkitTextFillColor:
                          expandedCategory === category.id
                            ? "transparent"
                            : "var(--text-primary)",
                        backgroundClip:
                          expandedCategory === category.id ? "text" : "unset",
                        color:
                          expandedCategory === category.id
                            ? "inherit"
                            : "var(--text-primary)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {category.title}
                    </h3>

                    <p
                      style={{
                        margin: "4px 0 0 0",
                        fontSize: "0.9rem",
                        opacity: 0.7,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {category.skills.length} skills
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    rotate: expandedCategory === category.id ? 180 : 0,
                    scale: expandedCategory === category.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    color: category.color,
                    fontSize: "1.2rem",
                  }}
                >
                  {expandedCategory === category.id ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </motion.div>

                {/* Animated background gradient */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${category.color}20, transparent)`,
                    opacity: 0,
                    zIndex: -1,
                  }}
                  animate={{
                    opacity: expandedCategory === category.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <AnimatePresence>
                {expandedCategory === category.id && (
                  <motion.div
                    className="skills-content"
                    variants={dropdownVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    style={{
                      padding: "0 var(--spacing-4) var(--spacing-4)",
                      background: "rgba(255, 255, 255, 0.02)",
                    }}
                  >
                    <div
                      className="skills-list"
                      style={{ paddingTop: "var(--spacing-3)" }}
                    >
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          className="skill-item"
                          variants={skillItemVariants}
                          style={{ marginBottom: "var(--spacing-3)" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "8px",
                            }}
                          >
                            <span
                              style={{
                                fontWeight: "500",
                                color: "var(--text-primary)",
                              }}
                            >
                              {skill.name}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
