import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaInfoCircle,
} from "react-icons/fa";
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
      id: 1,
      title: "Neura Interview",
      category: ["web", "genai"],
      image:
        "https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Built an AI-powered interview preparation and applicant tracking system using React.js and Express.js.",
        "Integrated Google Sign-In with Firebase for seamless authentication and secured routes via Express middleware.",
        "Implemented an intelligent ATS to parse resumes and match candidate profiles with job requirements.",
        "Developed a practice interview module leveraging Gemini for generating role-specific questions and real-time feedback.",
        "Used PostgreSQL with Prisma ORM for structured data persistence and scalable queries.",
        "Designed a responsive and clean UI with Tailwind CSS and shadcn/ui components for accessibility and consistency.",
      ],
      techStack: [
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
        "AWS",
      ],
      liveLink: "https://your-neura-interview-demo.com",
      githubLink: "https://stately-lebkuchen-6c9d18.netlify.app/",
    },
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
      title: "Let's Workout",
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
      githubLink: "https://ai-fitness-guru-8e733.web.app/",
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
      githubLink:
        "https://github.com/prithviraj-kt/authentication-of-nft-using-python",
    },
    {
      id: 4,
      title: "EcoCart - ecofriendly ecommerce",
      category: ["web"],
      image:
        "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: [
        "Developed an eco-friendly e-commerce platform with dual portals for buyers and sellers using ReactJS and the Gemini model.",
        "For buyers: Implemented personalized eco-friendly product recommendations, a Green Coins reward system, gamification leaderboard by pin code, progress bar for coupon redemption, and group buying features.",
        "Enabled buyers to return packaging materials to reduce carbon footprint, with incentives tied to sustainability actions.",
        "For sellers: Designed a system to calculate average carbon footprint per category and track each product's impact, rewarding sellers with Green Coins for sustainable contributions.",
        "Integrated dynamic product listing, filtering, secure authentication, and detailed product pages.",
        "Created a dedicated seller/admin dashboard to manage products with add, update, and delete functionality.",
        "Implemented cart, checkout, and real-time updates for smooth transactions.",
        "Focused on performance, gamification, user experience, and environmental impact awareness.",
      ],
      techStack: [
        "html",
        "css",
        "javascript",
        "typescript",
        "tailwind css",
        "reactjs",
        "gemini",
      ],
      liveLink: "",
      githubLink: "http://github.com/prithviraj-kt/EcoCart",
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
        "HODs can also manage their department's subject list — including adding, editing, or removing elective offerings.",
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
  const gradients = [
  "linear-gradient(135deg, #aa00ff, #ff00b7)", // 🔮 Purple → Pink (your original, kept)
  "linear-gradient(135deg, #ff512f, #dd2476)", // ❤️‍🔥 Red → Magenta
  "linear-gradient(135deg, #f7971e, #ffd200)", // 🟧 Orange → Yellow
  "linear-gradient(135deg, #11998e, #38ef7d)", // 🌱 Teal → Green
  "linear-gradient(135deg, #396afc, #2948ff)", // 🔵 Deep Blue → Electric Blue
  "linear-gradient(135deg, #fc466b, #3f5efb)", // 💜 Pink → Indigo
];

  const filterVariants = {
    active: {
      background: "var(--gradient-primary)",
      color: "white",
      scale: 1.05,
      boxShadow: "var(--shadow-lg), 0 0 20px rgba(102, 126, 234, 0.3)",
    },
    inactive: {
      background: "var(--gradient-surface)",
      color: "var(--text-primary)",
      scale: 1,
      boxShadow: "var(--shadow-md)",
    },
  };

  return (
    <section id="projects" ref={ref}>
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
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "var(--shadow-lg)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div
                  className="project-image-container"
                  style={{ position: "relative" }}
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
                    whileTap={{ opacity: 1 }}
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
                    onClick={() => openProjectDetails(project)}
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
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          background: "var(--gradient-secondary)",
                          color: "white",
                          fontWeight: "500",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          background: "var(--gradient-accent)",
                          color: "white",
                          fontWeight: "500",
                          boxShadow: "var(--shadow-sm)",
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
                      alignItems: "center",
                      marginTop: "var(--spacing-2)",
                      gap: "var(--spacing-2)",
                    }}
                  >
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <FaGithub /> Code
                    </motion.a>

                    <motion.button
                      onClick={() => openProjectDetails(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--primary-400)",
                        background: "rgba(102, 126, 234, 0.1)",
                        border: "1px solid rgba(102, 126, 234, 0.3)",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <FaInfoCircle /> Details
                    </motion.button>
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
                top: "50px",
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
                  background: "var(--bg-surface)",
                  borderRadius: "12px",
                  position: "relative",
                  maxHeight: "90vh",
                  overflowY: "auto", // entire modal scrolls
                }}
              >
                {/* Close button */}
                <button
                  onClick={closeProjectDetails}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "var(--bg-primary)",
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
                    color: "var(--text-primary)",
                  }}
                >
                  ✕
                </button>

                {/* Header */}
                <div
                  style={{
                    padding: "20px 30px 10px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      color: "var(--text-primary)",
                      wordBreak: "break-word", // wrap long titles
                    }}
                  >
                    {selectedProject.title}
                  </h2>
                </div>

                {/* Body */}
                <div style={{ padding: "30px" }}>
                  {/* Description */}
                  <div
                    style={{
                      marginBottom: "20px",
                      lineHeight: 1.6,
                    }}
                  >
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "20px",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {selectedProject.description.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            marginBottom: "10px",
                            lineHeight: "1.6",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
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
                            background: gradients[index % gradients.length], // cycle gradients
                            color: "#ffffffff",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                            transition:
                              "transform 0.2s ease, box-shadow 0.2s ease",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                  >
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
