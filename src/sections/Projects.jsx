import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import { FaGithub, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const projectCategories = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "genai", label: "GenAi" },
    { id: "blockchain", label: "Blockchain" },
  ];

  const projectsData = [
    {
  "id": 1,
  "title": "Neura Interview",
  "category": ["web", "genai"],
  "image": "https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg?auto=compress&cs=tinysrgb&w=600",
  "description": [
    "Built an AI-powered interview preparation and applicant tracking system using React.js and Express.js.",
    "Integrated Google Sign-In with Firebase for seamless authentication and secured routes via Express middleware.",
    "Implemented an intelligent ATS to parse resumes and match candidate profiles with job requirements.",
    "Developed a practice interview module leveraging Gemini for generating role-specific questions and real-time feedback.",
    "Used PostgreSQL with Prisma ORM for structured data persistence and scalable queries.",
    "Designed a responsive and clean UI with Tailwind CSS and shadcn/ui components for accessibility and consistency."
  ],
  "techStack": [
    "reactjs",
    "typescript",
    "expressjs",
    "nodejs",
    "postgresql",
    "prisma",
    "firebase auth",
    "gemini live voice to voice model",
    "tailwind css",
    "shad cn",
    "AWS"
  ],
  "liveLink": "https://your-neura-interview-demo.com",
  "githubLink": "https://stately-lebkuchen-6c9d18.netlify.app/"
}
,
    {
      id: 0,
      title: "Auto Site Builder",
      category: ["web", "genai"],
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Developed a modern AI-assisted website builder using Next.js, Gemini 2.5 Pro, and WebContainers.",
        "Integrated framer-motion for smooth UI transitions and interactive animations.",
        "Used shadcn/ui components for clean, accessible, and consistent design across the interface.",
        "Implemented next-themes for seamless light/dark mode toggling across the entire app.",
        "Applied advanced prompt engineering to convert user instructions into structured reactjs code.",
        "Generated code runs entirely in-browser using WebContainers, enabling instant preview without backend setup.",
        "Integrated 'Open in CodeSandbox' functionality for quick download of code",
      ],
      techStack: [
        "html",
        "css",
        "java script",
        "reactjs",
        "nextjs",
        "shad cn",
        "next themes",
        "tailwind css",
        "gemini 2.5 pro model",
        "web containers",
      ],
      liveLink: "https://your-auto-site-builder-demo.com",
      githubLink: "https://github.com/prithviraj-kt/auto-site-builder",
    },
    {
      id: 1,
      title: "Let’s Workout",
      category: ["genai", "web"],
      image:
        "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Built a fitness coaching web app using ReactJS and Firebase.",
        "Users can sign up and log in via Google authentication.",
        "Interactive home page with multi-layer workout filters (body parts, calisthenics, equipment, yoga, etc) using dynamic cool buttons on the sidebar.",
        "Workout sessions can be started, paused, and stopped with duration tracking.",
        "Profile page allows users to upload detailed personal info (name, age, body type, fitness aims, health conditions, etc) for personalized plans.",
        "Personalized AI chatbot (using Gemini 1.5 Pro) generates workout and diet plans based on user data.",
        "Calculates BMI and body fat percentage with Gemini 1.5 Pro.",
        "Tracks workout and diet history by date using a calendar feature.",
        "Food intake analyzed via image uploads using Gemini 1.0 Flash Vision model for calorie estimation.",
        "Users can manually add workouts and food logs with AI-powered calorie calculations.",
      ],
      techStack: [
        "html",
        "css",
        "javascript",
        "reactjs",
        "firebase storage",
        "firebase firestore",
        "firebase authentication",
        "firebase sdk",
        "gemini ai Models",
        "bootstrap",
      ],
      liveLink: "https://your-lets-workout-demo.com",
      githubLink: " https://github.com/prithviraj-kt/AI-FIT-GURU-FRONTEND.git",
      featured: true,
    },
    {
      id: 2,
      title: "AI Resume Analyzer (ATS)",
      category: ["web", "genai"],
      image:
        "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Developed a fast, AI-powered resume analyzer using ReactJS, TypeScript, and Gemini Pro APIs.",
        "Users upload resumes and enter job descriptions; the system evaluates ATS compatibility, keyword relevance, and formatting quality.",
        "Used `lucide-react` for intuitive file handling and icon-based interactions during resume upload and processing.",
        "Built modular components (`ResumeUploader`, `JobDescriptionInput`, `ResultsDisplay`) for clean UI and logical separation.",
        "Leveraged prompt engineering with Gemini to extract structured ATS feedback — including score, keyword match, formatting issues, and suggested improvements.",
        "Rendered a detailed markdown-style report summarizing ATS score, matched/missing keywords, formatting feedback, and user-specific advice.",
        "Included dark/light theme toggling with `next-themes`, and styled the interface using TailwindCSS and shadcn/ui.",
        "Implemented error validation, loading states, and result management using clean React state logic.",
        "Used Cursor AI for rapid prototyping — completed the MVP with full functionality in under 15 minutes.",
        "Designed for full client-side execution, making it ideal for resume screening, HR tech demos, or job-seeker optimization tools.",
      ],
      techStack: [
        "reactjs",
        "typescript",
        "gemini 1.5 pro",
        "tailwindcss",
        "shadcn/ui",
        "lucide-react",
        "next-themes",
      ],
      liveLink: "https://your-ats-demo.com",
      githubLink: "https://github.com/prithviraj-kt/ats",
    },
    {
      id: 3,
      title: "Authentication of NFT",
      category: ["blockchain", "web"],
      image:
        "https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Developed a blockchain-based NFT marketplace using Python and Flask.",
        "Implemented a full ledger system where users can create, buy, and validate NFTs (e.g., shayaris).",
        "Each NFT is stored as a JSON file representing a block in the blockchain.",
        "Designed secure login and signup with hashed storage of user data and separate ledgers.",
        "Admin functionality includes validating NFTs and syncing ledgers with the global chain.",
        "Integrated file operations (copy, hash, validate) to simulate a decentralized system.",
        "Built CLI-based interactions for both users and administrators for full control.",
      ],
      techStack: [
        "blockchain",
        "python",
        "flask",
        "html",
        "css",
        "javascript",
        "bootstrap",
        "reactjs",
      ],
      liveLink: "https://your-nft-project-demo.com",
      githubLink: "https://github.com/prithviraj-kt/authentication-of-nft-using-python",
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      category: ["web"],
      image:
        "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Built a full-featured e-commerce web application using Next.js and MongoDB.",
        "Styled the interface with Tailwind CSS for a modern and responsive design.",
        "Implemented dynamic product listing, filtering, and detailed product pages.",
        "Developed a secure authentication system for users and admin.",
        "Integrated a dedicated admin dashboard to add, update, and delete products.",
        "Enabled cart and checkout functionalities with real-time updates.",
        "Used MongoDB for efficient data storage and retrieval of users and products.",
        "Focused on performance, user experience, and scalability.",
      ],
      techStack: [
        "html",
        "css",
        "javascript",
        "tailwind css",
        "reactjs",
        "nextjs",
        "mongodb",
        "odm",
        "mongoose",
      ],
      liveLink: "https://your-ecommerce-demo.com",
      githubLink: "",
    },

    {
      id: 5,
      title: "Digi Elective",
      category: ["web"],
      image:
        "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Built a role-based elective selection system using the MERN stack (MongoDB, Express, React, Node.js).",
        "Designed three dedicated portals for Students, HODs, and Dean/Principal with isolated access and responsibilities.",
        "Students can opt for either open or professional electives each semester based on college-specific rules.",
        "The system enforces mutual exclusivity — selecting a professional elective disables the open elective option and vice versa.",
        "HODs can approve or reject student requests for electives related to their own department only.",
        "HODs can also manage their department’s subject list — including adding, editing, or removing elective offerings.",
        "Dean/Principal portal allows centralized viewing and filtering of elective selections department-wise and semester-wise.",
        "Implemented secure login, session management, and route-based access control for each portal.",
        "Streamlined the entire elective workflow, eliminating manual paperwork and reducing subject allocation conflicts.",
        "Successfully deployed and tested with 500+ students, ensuring scalability and real-time responsiveness across all portals.",
      ],
      techStack: [
        "html",
        "css",
        "javascript",
        "bootstrap",
        "odm",
        "mongodb",
        "expressjs",
        "reactjs",
        "nodejs",
      ],
      liveLink: "https://your-digi-elective-demo.com",
      githubLink: "https://github.com/prithviraj-kt/Elective_backend",
    },
    {
      id: 6,
      title: "Linkify",
      category: ["web"],
      image:
        "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=600", // You can replace this with a custom image link
      description: [
        "Developed a full-stack social media platform enabling college students to connect with their alumni.",
        "Implemented user authentication and role-based access (student or alumni) based on college login.",
        "Each user can perform CRUD operations on posts and edit their own profile information.",
        "Displayed a dynamic feed of posts filtered by college, fostering relevant community engagement.",
        "Profiles of users from the same college are publicly viewable to others in the same group.",
        "To access users from different colleges, connection requests must be accepted.",
        "Used Prisma ORM with MySQL for efficient database modeling and querying.",
        "Implemented RESTful APIs using Express.js and Node.js for seamless data exchange.",
        "Responsive UI built with ReactJS and Bootstrap to ensure usability across all devices.",
        "Secured backend with proper input validation and session management techniques.",
      ],
      techStack: [
        "html",
        "css",
        "javascript",
        "reactjs",
        "bootstrap",
        "nodejs",
        "expressjs",
        "mysql",
        "prisma",
      ],
      liveLink: "https://linkify-demo.com", // Replace with actual live URL
      githubLink: "https://github.com/prithviraj-kt/Linkify_backend",
    },
    {
      id: 7,
      title: "Money Magic",
      category: ["web"],
      image:
        "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Built a personal finance tracker web app using ReactJS, Firebase, and Bootstrap.",
        "Users can register and log using firebase firestore for storage implementing with firebase sdk",
        "Dashboard provides an intuitive overview of daily, weekly, and monthly expenses.",
        "Users can add, edit, and delete expense entries, categorized by type (e.g., food, travel, bills).",
        "Spending limits can be set for daily and monthly budgets, with visual progress indicators.",
        "Real-time updates ensure users immediately see changes in their expense reports.",
        "Calendar view displays expense trends by date, helping users track spending habits over time.",
        "Integrated alerts and reminders notify users when approaching or exceeding budget limits.",
        "Responsive UI design ensures a seamless experience on both desktop and mobile devices.",
        "Firebase backend handles real-time database sync and secure user data storage.",
      ],
      techStack: [
        "html",
        "css",
        "javascript",
        "reactjs",
        "bootstrap",
        "firebase firestore",
        "firebase sdk",
      ],
      liveLink: "https://your-dollar-account-demo.com",
      githubLink: "https://github.com/prithviraj-kt/Money-Magic",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) =>
          project.category.includes(activeFilter)
        );

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
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

  const filterVariants = {
    active: {
      backgroundColor: "var(--primary-600)",
      color: "white",
      scale: 1.05,
    },
    inactive: {
      backgroundColor: "var(--dark-card)",
      color: "var(--text-primary)",
      scale: 1,
    },
  };

  return (
    <section  id="projects" ref={ref}>
      <div className="container">
        <SectionTitle
          title="Projects"
          subtitle="Showcasing my recent work and creative endeavors"
        />

        <motion.div
          className="filter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--spacing-2)",
            marginBottom: "var(--spacing-5)",
            flexWrap: "wrap",
          }}
        >
          {projectCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              variants={filterVariants}
              animate={activeFilter === category.id ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "8px 16px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="projects-grid"
            columnClassName="projects-grid_column"
            columnAttrs={{
              style: {
                paddingLeft: "40px", // Increased from 30px
              },
            }}
            style={{
              display: "flex",
              marginLeft: "-40px", // Increased from -30px
              width: "auto",
            }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="project-card"
                style={{
                  marginBottom: "30px",
                  background: "var(--dark-card)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  className="project-image-container"
                  style={{ position: "relative" }}
                  onClick={() => openProjectDetails(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <motion.div
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0, 0, 0, 0.7)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "var(--primary-500)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "1.2rem",
                      }}
                    >
                      <FaSearch />
                    </motion.div>
                  </motion.div>
                </div>

                {project.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "var(--accent-500)",
                      color: "black",
                      fontWeight: "bold",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      zIndex: 1,
                    }}
                  >
                    Featured
                  </div>
                )}

                <div style={{ padding: "var(--spacing-3)" }}>
                  <h3 style={{ marginBottom: "var(--spacing-2)" }}>
                    {project.title}
                  </h3>

                  <div
                    className="project-tech-stack"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "var(--spacing-2)",
                    }}
                  >
                    {project.techStack.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          background: "var(--dark-surface)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          background: "var(--dark-surface)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "var(--spacing-2)",
                    }}
                  >
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                      }}
                    >
                      <FaGithub /> Code
                    </motion.a>
                    {/* <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--primary-400)",
                        textDecoration: "none",
                      }}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </motion.a> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                padding: "20px",
              }}
              onClick={closeProjectDetails}
            >
              <motion.div
                className="project-modal-content glass"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  maxHeight: "90vh",
                  background: "var(--dark-surface)",
                  borderRadius: "12px",
                  overflow: "auto",
                  position: "relative",
                }}
              >
                <button
                  onClick={closeProjectDetails}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "var(--dark-bg)",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 10,
                    fontSize: "1.2rem",
                  }}
                >
                  ✕
                </button>

                <div
                  className="project-modal-image"
                  style={{
                    width: "100%",
                    height: "400px",
                    position: "relative",
                  }}
                >
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      padding: "30px 20px 20px",
                    }}
                  >
                    <h2
                      style={{
                        color: "white",
                        marginBottom: 0,
                      }}
                    >
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                <div style={{ padding: "30px" }}>
                  <p
                    style={{
                      marginBottom: "20px",
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedProject.description.map((item, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: "10px", lineHeight: "1.6" }}
                      >
                        {item}
                      </li>
                    ))}
                  </p>

                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ marginBottom: "10px" }}>Technologies Used</h4>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      {selectedProject.techStack.map((tech, index) => (
                        <span
                          key={index}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            background: "var(--primary-700)",
                            color: "white",
                            fontSize: "0.9rem",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    {/* <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a> */}
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaGithub /> View Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;