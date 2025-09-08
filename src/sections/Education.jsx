import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool, FaAward } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import { useInView } from "react-intersection-observer";

// Skill → Logo mapping (all logos work well with white background)
const skillLogos = {
  "Machine Learning":
    "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  "Deep Learning":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4LZ-Ngc19Tx1wHDf645p2FDh00JDClaO4ig&s",
  NLP: "https://cdn-icons-png.flaticon.com/512/2721/2721292.png",
  "Image Processing":
    "https://assets.skyfilabs.com/images/blog/seven-innovative-projects-on-image-processing-min.jpg",
  "Computer Vision": "https://cdn-icons-png.flaticon.com/512/1048/1048947.png",
  LLM: "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
  Transformers:
    "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  "Data Science": "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
  "Generative AI": "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
  "Fine tuning": "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
  RAG: "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
  "Voice AI Agents":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR331eM4a00qglgZy3axag4MaNZRcU5BdT3-g&s",

  DSA: "https://cdn-icons-png.flaticon.com/512/2721/2721275.png",
  OOPS: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
  "System Design": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  DBMS: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png",
  Networking: "https://cdn-icons-png.flaticon.com/512/1048/1048936.png",
  "Cloud Computing":
    "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  Blockchain: "https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png",
  "HTML/ CSS":
    "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
  JavaScript:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  TypeScript:
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  ReactJS: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  NextJS: "https://cdn.worldvectorlogo.com/logos/next-js.svg", // white logo
  NodeJS:
    "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  ExpressJS: "https://cdn.worldvectorlogo.com/logos/express-109.svg", // white bg compatible
  MongoDB:
    "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
  SQL: "https://cdn-icons-png.flaticon.com/512/5815/5815809.png",
  "REST APIs": "https://cdn-icons-png.flaticon.com/512/2809/2809077.png",
  "Web sockets": "https://cdn-icons-png.flaticon.com/512/906/906361.png",
  Python:
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  Flask: "https://cdn.worldvectorlogo.com/logos/flask.svg", // proper svg for white bg
  "Fast API": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
  Java: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
  C: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
  "C++":
    "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
  Git: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
  "CI/CD": "https://cdn-icons-png.flaticon.com/512/2320/2320226.png",
  Docker: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_icon.svg",
  Firebase: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
  AWS: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
};

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const educationData = [
    {
      institution: "Indian Institute of Technology, Guwahati",
      degree: "Master of Technology in Data Science",
      date: "2024-2026",
      description:
        "Specialised in Generative AI, LLM and explored the world of Machine Learning, Deep learning.",
      grade: "CPI: 7.14",
      icon: <FaGraduationCap />,
      skills: [
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "Image Processing",
        "Computer Vision",
        "LLM",
        "Transformers",
        "Data Science",
        "Generative AI",
        "Agentic AI",
        "RAG",
        "Fine tuning",
        "Voice AI Agents",
      ],
    },
    {
      institution: "KLE Institute of Technology",
      degree: "Bachelor of Engineering in Computer Science",
      date: "2019 - 2023",
      description:
        "Focused on building fundamentals of computer science, building production grade softwares.",
      grade: "CPI: 9.08",
      icon: <FaSchool />,
      skills: [
        "DSA",
        "OOPS",
        "System Design",
        "DBMS",
        "Networking",
        "Cloud Computing",
        "Blockchain",
        "HTML/ CSS",
        "JavaScript",
        "TypeScript",
        "ReactJS",
        "NextJS",
        "NodeJS",
        "ExpressJS",
        "MongoDB",
        "SQL",
        "REST APIs",
        "Web sockets",
        "Python",
        "Flask",
        "Fast API",
        "Java",
        "C",
        "C++",
        "Git",
        "CI/CD",
        "Docker",
        "Firebase",
        "AWS",
      ],
    },
    {
      institution: "Prerana Pu Science College",
      degree: "PCMB",
      date: "2017 - 2019",
      description:
        "Explored the fields of Physics, Maths, Chemistry and Biology",
      grade: "Percentage: 81.67%",
      icon: <FaAward />,
      skills: [],
    },
    {
      institution: "ST Michaels High School",
      degree: "",
      date: "2017",
      description: "KSEEB",
      grade: "Percentage: 94.08%",
      icon: <FaAward />,
      skills: [],
    },
  ];

  return (
    <section id="education" ref={ref}>
      <div className="container">
        <SectionTitle
          title="Education"
          subtitle="My academic journey and continuous learning path"
        />

        <VerticalTimeline animate={inView}>
          {educationData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--education"
              date={item.date}
              dateClassName="timeline-date"
              visible={inView}
              contentStyle={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "var(--text-primary)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                boxShadow: "var(--shadow-lg)",
                backdropFilter: "blur(20px)",
              }}
              contentArrowStyle={{
                borderRight: "7px solid rgba(255, 255, 255, 0.2)",
              }}
              iconStyle={{
                background: "var(--gradient-primary)",
                color: "#fff",
                boxShadow: "var(--shadow-md)",
              }}
              icon={item.icon}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ color: "var(--text-primary)" }}
              >
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "1.3rem",
                    margin: "0 0 5px",
                  }}
                >
                  {item.institution}
                </h3>
                <h4
                  style={{
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    margin: "0 0 15px",
                    color: "var(--primary-400)",
                  }}
                >
                  {item.degree}
                </h4>
                <p style={{ margin: "0 0 15px" }}>{item.description}</p>

                {item.grade && (
                  <div style={{ marginTop: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>
                        Academic Performance
                      </span>
                      <span>{item.grade}</span>
                    </div>
                  </div>
                )}

                {item.skills && item.skills.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                      marginTop: "1rem",
                    }}
                  >
                    {item.skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "6px 12px",
                          borderRadius: "10px",
                          background: "var(--bg-surface)",
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.24)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "26px",
                            height: "26px",
                            borderRadius: "6px",
                            background: "#fff", // white background always
                            padding: "2px",
                          }}
                        >
                          <img
                            src={
                              skillLogos[skill] ||
                              "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                            }
                            alt={skill}
                            style={{
                              width: "18px",
                              height: "18px",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Education;
