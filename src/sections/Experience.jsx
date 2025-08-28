import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaPalette } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import { useInView } from "react-intersection-observer";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experienceData = [
    {
      role: "Full stack Developer Intern",
      company: "Osnil Web Solutions Private Limited",
      date: "Nov 2022 – April 2023",
      description:
        "Built a unified ERP system integrating Amazon SP-API to streamline warehouse tracking, automate inventory sync, and boost operational efficiency.",
      responsibilities: [
        "Developed an ERP system using Next.js and MongoDB to track both internal and Amazon-registered warehouses in one unified interface.",
        "Integrated Amazon SP-API to sync real-time inventory and shipment data from Amazon Seller Central into the system.",
        "Enabled 200+ daily warehouse transfers with smooth item tracking and optimized workflows, improving operational efficiency by 50%.",
        "Automated data processing and reconciliation, reducing manual effort and improving efficiency by 40%.",
      ],
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "AMAZON SP-API",
        "Thunder client",
        "Mongoose ORM",
        "Git and Github",
        "redux and recoil"
      ],
      companyLogo:
        "https://media.licdn.com/dms/image/v2/D4D0BAQE4cTQGjdTZlw/company-logo_200_200/company-logo_200_200/0/1702990402709/osnil_logo?e=2147483647&v=beta&t=J0n9aK1LfrvMeFrF7Zq8kVaNUapzY4Rtds5YItFFOSo",
      icon: <FaCode />,
      iconBg: "var(--primary-600)",
    },
    {
      role: "Software Engineer Intern",
      company: "Restoca",
      date: "March 2022 – June 2022",
      description:
        "Led the development of a smart restaurant management system with QR-based ordering and advanced table filtering, boosting service speed and operational efficiency.",
      responsibilities: [
        "Improved table assignment accuracy by 30% by building dynamic filters (multi-room, AC/non-AC) using React.js and context API.",
        "Reduced average wait time from 15 to 7 minutes by integrating QR-based order placement using Node.js, Express.js, and REST APIs.",
        "Enabled real-time kitchen and table updates by implementing MongoDB with WebSocket (Socket.io) for event-driven data sync.",
      ],
      technologies: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "Thunder client",
        "Mongoose ORM",
        "Git and Github",
        "QR code libraries",
        "axios",
        "redux"
      ],
      companyLogo:
        "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=100",
      icon: <FaPalette />,
      iconBg: "var(--secondary-600)",
    },
    {
      role: "Backend Developer Intern",
      company: "Youniv",
      date: "Dec 2021 – Jan 2022",
      description:
        "Orchestrated a seamless integration of Algolia and Firebase to enable real-time search and developed an add-post feature using Firebase Storage and Next.js, enhancing user engagement and content management",
      responsibilities: [
        "Integrated Algolia with Firebase for real-time search, improving user interaction by 30% and reducing bounce rates.",
        "Developed an add-post feature using Firebase Storage, Next.js, and Firebase Firestore, enabling efficient content management and boosting user engagement by 30%.",
        "Optimized Firebase Firestore for scalable storage solutions, handling over 500 posts and enhancing application performance",
      ],
      technologies: ["Next.js", "Reactj.js", "JavaScript", "Bootstrap", "Firebase"],
      companyLogo:
        "https://media.licdn.com/dms/image/v2/C4E0BAQH3WjhnnrWb6Q/company-logo_200_200/company-logo_200_200/0/1631715382926/younivapp_logo?e=2147483647&v=beta&t=u8mImlGqV40SmnVTZLe1pW5GnefHIEwk50qlt3qsQpM",
      icon: <FaBriefcase />,
      iconBg: "var(--accent-600)",
    },
  ];

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <SectionTitle
          title="Work Experience"
          subtitle="My professional journey and career highlights"
        />

        <VerticalTimeline animate={inView}>
          {experienceData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={item.date}
              dateClassName="timeline-date"
              // iconStyle={{
              //   background: item.iconBg,
              //   color: "#fff",
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
              // }}
              // icon={item.icon}
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
              iconStyle={{
                background: 'var(--gradient-secondary)',
                color: '#fff',
                boxShadow: 'var(--shadow-md)'
              }}
              icon={<FaBriefcase />}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="experience-content"
                style={{
                  color: 'var(--text-primary)',
                }}
              >
                <div
                  className="company-info"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={item.companyLogo}
                    alt={`${item.company} logo`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h3
                      style={{
                        fontWeight: 600,
                        fontSize: "1.3rem",
                        margin: 0,
                      }}
                    >
                      {item.role}
                    </h3>
                    <h4
                      style={{
                        fontWeight: 500,
                        fontSize: "1.1rem",
                        margin: "5px 0 0",
                        color: "var(--primary-400)",
                      }}
                    >
                      {item.company}
                    </h4>
                  </div>
                </div>

                <p style={{ marginBottom: "1rem" }}>{item.description}</p>

                <div style={{ marginBottom: "1rem" }}>
                  <h5
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Key Responsibilities:
                  </h5>
                  <ul
                    style={{
                      listStyleType: "none",
                      paddingLeft: 0,
                      margin: 0,
                    }}
                  >
                    {item.responsibilities.map((responsibility, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        style={{
                          padding: "4px 0",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: item.iconBg,
                          }}
                        />
                        {responsibility}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="technologies">
                  <h5
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Technologies:
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    {item.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          background: item.iconBg,
                          color: "white",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;
