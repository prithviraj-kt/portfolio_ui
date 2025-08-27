import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { FaGraduationCap, FaAward, FaSchool } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import { useInView } from "react-intersection-observer";

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

      iconBg: "var(--primary-700)",
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
        "Systen Design",
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
        "ORM/ ODM",
        "REST APIs",
        "Web sockets",
        "Python",
        "Flask",
        "Fast API",
        "Java",
        "C",
        "C++",
        "Git",
        "Agile Methodologies",
        "CI/CD",
        "Docker",
        "Firebase",
        "AWS"

        
      ],

      iconBg: "var(--secondary-700)",
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

      iconBg: "var(--accent-700)",
    },
    {
      institution: "ST Michaels High School",
      degree: "",
      date: "2017",
      description: "KSEEB",
      grade: "Percentage: 94.08%",
      skills: [],
      icon: <FaAward />,
      iconBg: "var(--accent-700)",
    },
  ];

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: { width: "80%", transition: { duration: 1, ease: "easeInOut" } },
  };

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
              iconStyle={{
                background: item.iconBg,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              icon={item.icon}
              visible={inView}
              contentStyle={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-lg)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
                contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.2)' }}
                date="2022 - 2024"
                iconStyle={{
                  background: 'var(--gradient-primary)',
                  color: '#fff',
                  boxShadow: 'var(--shadow-md)'
                }}
                icon={<FaGraduationCap />}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{
                  color: 'var(--text-primary)',
                }}
              >
                <h3
                  className="vertical-timeline-element-title"
                  style={{
                    fontWeight: 600,
                    fontSize: "1.3rem",
                    margin: "0 0 5px 0",
                  }}
                >
                  {item.institution}
                </h3>
                <h4
                  className="vertical-timeline-element-subtitle"
                  style={{
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    margin: "0 0 15px 0",
                    color: "var(--primary-400)",
                  }}
                >
                  {item.degree}
                </h4>
                <p style={{ margin: "0 0 15px 0" }}>{item.description}</p>

                {item.grade && (
                  <div
                    className="education-grade"
                    style={{ marginTop: "1rem" }}
                  >
                    <div
                      className="grade-label"
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
                    {/*
                    <div className="progress-container" style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <motion.div
                        className="progress-bar"
                        variants={progressBarVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--primary-500), var(--primary-300))',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
 */}
                  </div>
                )}

                <div
                  className="education-skills"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >

                  {
                    item.skills && item.skills.map((skill, i) => (
                      <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        background: "var(--bg-surface)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {skill}
                    </motion.span>

                    ))

                  }
                  {/* {[
                    "JavaScript",
                    "Python",
                    "UX Design",
                    "Algorithm Design",
                  ].map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        background: "var(--bg-surface)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))} */}
                </div>
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Education;
