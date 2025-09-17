import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionTitle from "../components/SectionTitle";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    color: "var(--primary-600)",
    skills: [
      { name: "HTML5", imgSrc: "https://cdn.svgporn.com/logos/html-5.svg" },
      { name: "CSS3", imgSrc: "https://cdn.svgporn.com/logos/css-3.svg" },
      { name: "JavaScript (ES6+)", imgSrc: "https://cdn.svgporn.com/logos/javascript.svg" },
      { name: "TypeScript", imgSrc: "https://cdn.svgporn.com/logos/typescript-icon.svg" },
      { name: "React.js", imgSrc: "https://cdn.svgporn.com/logos/react.svg" },
      { name: "Next.js", imgSrc: "https://cdn.svgporn.com/logos/nextjs-icon.svg" },
      { name: "Bootstrap", imgSrc: "https://cdn.svgporn.com/logos/bootstrap.svg" },
      { name: "Tailwind CSS", imgSrc: "https://cdn.svgporn.com/logos/tailwindcss-icon.svg" },
      { name: "Shadcn", imgSrc: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    color: "var(--primary-700)",
    skills: [
      { name: "Node.js", imgSrc: "https://cdn.svgporn.com/logos/nodejs-icon.svg" },
      { name: "Express", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
      { name: "RESTful APIs", imgSrc: "https://cdn-icons-png.flaticon.com/512/4144/4144789.png" },
      { name: "WebSockets", imgSrc: "https://cdn-icons-png.flaticon.com/512/2092/2092710.png" },
      { name: "Flask", imgSrc: "https://cdn.svgporn.com/logos/flask.svg" },
      { name: "FastAPI", imgSrc: "https://cdn.svgporn.com/logos/fastapi-icon.svg" },
      { name: "GraphQL", imgSrc: "https://cdn.svgporn.com/logos/graphql.svg" },
      { name: "Firebase", imgSrc: "https://cdn.svgporn.com/logos/firebase.svg" },
    ],
  },
  {
    id: "database",
    title: "Database & Cloud",
    color: "var(--accent-700)",
    skills: [
      { name: "Mongoose", imgSrc: "https://avatars.githubusercontent.com/u/7552965?s=200&v=4" },
      { name: "MongoDB", imgSrc: "https://cdn.svgporn.com/logos/mongodb.svg" },
      { name: "Prisma", imgSrc: "https://cdn.svgporn.com/logos/prisma.svg" },
      { name: "MySQL", imgSrc: "https://cdn.svgporn.com/logos/mysql.svg" },
      { name: "PostgreSQL", imgSrc: "https://cdn.svgporn.com/logos/postgresql.svg" },
      { name: "Vector DB", imgSrc: "https://cdn-icons-png.flaticon.com/512/9516/9516408.png" },
      { name: "AWS", imgSrc: "https://cdn.svgporn.com/logos/amazon-aws.svg" },
      { name: "Firebase", imgSrc: "https://cdn.svgporn.com/logos/firebase.svg" },
      { name: "SQL", imgSrc: "https://cdn-icons-png.flaticon.com/512/5815/5815869.png" },
      { name: "Supabase", imgSrc: "https://cdn.svgporn.com/logos/supabase-icon.svg" },
      { name: "Vercel/Netlify", imgSrc: "https://cdn.svgporn.com/logos/vercel-icon.svg" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Methods",
    color: "var(--accent-600)",
    skills: [
      { name: "Git/GitHub", imgSrc: "https://cdn.svgporn.com/logos/github-icon.svg" },
      { name: "Agile/Scrum", imgSrc: "https://cdn-icons-png.flaticon.com/512/2111/2111615.png" },
      { name: "Webpack", imgSrc: "https://cdn.svgporn.com/logos/webpack.svg" },
      { name: "CI/CD", imgSrc: "https://cdn-icons-png.flaticon.com/512/906/906324.png" },
      { name: "Performance Optimization", imgSrc: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png" },
      { name: "Docker", imgSrc: "https://cdn.svgporn.com/logos/docker-icon.svg" },
      { name: "Cost Optimization", imgSrc: "https://cdn-icons-png.flaticon.com/512/1907/1907445.png" },
      { name: "Monorepo/Turborepo", imgSrc: "https://avatars.githubusercontent.com/u/87638736?s=200&v=4" },
    ],
  },
  {
    id: "ml",
    title: "Data Science & ML",
    color: "var(--accent-700)",
    skills: [
      { name: "Algebra", imgSrc: "https://cdn-icons-png.flaticon.com/512/263/263142.png" },
      { name: "Probability & Statistics", imgSrc: "https://cdn-icons-png.flaticon.com/512/709/709496.png" },
      { name: "Machine Learning", imgSrc: "https://cdn-icons-png.flaticon.com/512/3665/3665923.png" },
      { name: "Deep Learning", imgSrc: "https://cdn-icons-png.flaticon.com/512/3528/3528226.png" },
      { name: "Transformers", imgSrc: "https://cdn-icons-png.flaticon.com/512/3079/3079043.png" },
      { name: "LLMs", imgSrc: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png" },
      { name: "Generative AI", imgSrc: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png" },
      { name: "Agentic AI", imgSrc: "https://cdn-icons-png.flaticon.com/512/4712/4712106.png" },
      { name: "NumPy", imgSrc: "https://cdn.svgporn.com/logos/numpy.svg" },
      { name: "Pandas", imgSrc: "https://cdn.svgporn.com/logos/pandas-icon.svg" },
      { name: "Matplotlib", imgSrc: "https://matplotlib.org/stable/_static/images/logo2.svg" },
      { name: "Seaborn", imgSrc: "https://seaborn.pydata.org/_static/logo-wide-lightbg.svg" },
      { name: "Keras", imgSrc: "https://cdn.svgporn.com/logos/keras.svg" },
      { name: "Scikit-learn", imgSrc: "https://cdn.svgporn.com/logos/scikit-learn.svg" },
      { name: "TensorFlow", imgSrc: "https://cdn.svgporn.com/logos/tensorflow.svg" },
      { name: "PyTorch", imgSrc: "https://cdn.svgporn.com/logos/pytorch-icon.svg" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const dropdownVariants = {
  collapsed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  expanded: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.05 } },
};

const skillItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
};

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <section id="skills" ref={ref} style={{ padding: "60px 0" }}>
      <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
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
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {skillCategories.map((category) => {
            const isExpanded = expandedCategory === category.id;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${category.color}, rgba(255,255,255,0.1))`,
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "1.5rem", color: "#fff" }}>📘</span>
                    </div>
                    <div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>{category.title}</div>
                      <div style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: 4 }}>
                        {category.skills.length} skills
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: "1.25rem", color: category.color }}>
                    {isExpanded ? "▲" : "▼"}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      style={{ overflow: "hidden", padding: "0 20px 20px 20px" }}
                    >
                      <div
                        style={{
                          paddingTop: "16px",
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                          gap: "20px",
                        }}
                      >
                        {category.skills.map((skill, idx) => (
                          <motion.div
                            key={`skill-${category.id}-${idx}`}
                            variants={skillItemVariants}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              textAlign: "center",
                              gap: "8px",
                            }}
                          >
                            <img
                              src={skill.imgSrc}
                              alt={`${skill.name} icon`}
                              style={{
                                width: 48,
                                height: 48,
                                objectFit: "contain",
                              }}
                            />
                            <div
                              style={{
                                color: "var(--text-primary)",
                                fontSize: "1rem",
                                fontWeight: 500,
                              }}
                            >
                              {skill.name}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
