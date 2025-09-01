import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-scroll";
import image from "../assets/image.png";

const Hero = () => {
  const imageRef = useRef(null);
  const typedRef = useRef(null);
  const typedElement = useRef(null);

  // Parallax effect on image
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     if (!imageRef.current) return;
  //     const x = (window.innerWidth / 2 - e.pageX) / 50;
  //     const y = (window.innerHeight / 2 - e.pageY) / 50;
  //     imageRef.current.style.transform = `translate(${x}px, ${y}px)`;
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  // Typed.js
  useEffect(() => {
    const options = {
      strings: [
        "Software Developer",
        "Gen AI Engineer",
        "Machine Learning Engineer",
        "Creative Thinker",
        "Problem Solver",
      ],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
    };
    typedRef.current = new Typed(typedElement.current, options);
    return () => {
      if (typedRef.current) typedRef.current.destroy();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const socialVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.8 + i * 0.1,
      },
    }),
  };

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/prithviraj-tagadinamani-934709196",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/prithviraj-kt/",
      label: "GitHub",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/prithviraj_k_t/",
      label: "Instagram",
    },
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        paddingTop: "80px", // Adjust for navbar height
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ width: "100%", padding: "0 1rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {/* Text Content */}
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ textAlign: "center", maxWidth: "600px" }}
          >
            <motion.h3
              variants={itemVariants}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--primary-400)",
                marginBottom: "0.5rem",
              }}
            >
              I am,
            </motion.h3>
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                marginBottom: "1rem",
                background:
                  "linear-gradient(45deg, var(--primary-400), var(--secondary-400))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Prithviraj K Tagadinamani
            </motion.h1>
            <motion.div
              variants={itemVariants}
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                marginBottom: "1rem",
                height: "2.5rem",
              }}
            >
              <span
                ref={typedElement}
                style={{ color: "var(--accent-400)" }}
              ></span>
            </motion.div>
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "1.1rem",
                maxWidth: "600px",
                marginBottom: "1.5rem",
                color: "var(--text-secondary)",
              }}
            >
              I’m a Software Development Engineer focused on building scalable,
              high-performance, and cost-efficient applications. With expertise
              in system design, AI, and modern technologies, I craft solutions
              that solve real-world problems, optimize resources, and drive
              measurable impact.{" "}
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div
              ref={imageRef}
              className="image-container"
              style={{
                width: "100%",
                maxWidth: "400px",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "var(--bg-card)",
              }}
            >
              <img
                src={image}
                alt="Hero"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          style={{
            margin: "20px",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link to="projects" spy smooth offset={-70} duration={500}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
            >
              View My Work
            </motion.button>
          </Link>
          <Link to="contact" spy smooth offset={-70} duration={500}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "center",
          }}
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              custom={i}
              variants={socialVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2, color: "var(--primary-400)" }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                color: "var(--text-primary)",
                background: "var(--bg-card)",
                transition: "all 0.3s ease",
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
