import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FaBookOpen,
  FaAward,
  FaExternalLinkAlt,
  FaQuoteLeft,
  FaMicroscope,
  FaStar,
} from "react-icons/fa";
import { SiIeee } from "react-icons/si";
import SectionTitle from "../components/SectionTitle";

const publications = [
  {
    id: 1,
    title:
      "Agents That Teach: Towards Designing Incidental Learning Back into AI-Assisted Software Development",
    venue: "IEEE/ACM ASE 2026",
    venueFull:
      "41st IEEE/ACM International Conference on Automated Software Engineering",
    track: "Main Track",
    rank: "CORE A*",
    status: "Accepted",
    year: "2026",
    authors: ["Prithviraj K Tagadinamani", "et al."],
    abstract:
      "This paper proposes a framework for embedding incidental learning opportunities within AI-assisted software development workflows. As developers increasingly delegate cognitive tasks to AI agents, we risk skill atrophy in core engineering competencies. Our research introduces agent architectures that subtly scaffold learning while preserving productivity, validated through empirical studies on developer behavior and knowledge retention.",
    tags: [
      "Agentic AI",
      "Software Engineering",
      "LLM",
      "Developer Tools",
      "Learning Systems",
    ],
    color: "from-violet-600 via-purple-600 to-indigo-600",
    glowColor: "rgba(139, 92, 246, 0.4)",
    highlight: true,
  },
];

const FloatingOrb = ({ size, x, y, delay, color }) => (
  <motion.div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      filter: "blur(60px)",
      opacity: 0.15,
      left: x,
      top: y,
      pointerEvents: "none",
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const ParticleField = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.6)",
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -40, -80],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const PublicationCard = ({ pub, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 80, rotateX: 20 },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: {
            duration: 0.8,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => {
          setHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        animate={{
          rotateY: hovered ? mousePos.x * 8 : 0,
          rotateX: hovered ? -mousePos.y * 8 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          background: "rgba(10, 10, 30, 0.6)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: hovered
            ? "1px solid rgba(139, 92, 246, 0.5)"
            : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: hovered
            ? `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${pub.glowColor}`
            : "0 20px 60px rgba(0,0,0,0.3)",
          transition: "border 0.3s ease, box-shadow 0.3s ease",
          cursor: "default",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated gradient top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(59,130,246,0.8), rgba(139,92,246,0.8), transparent)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />

        {/* Background gradient orb */}
        <motion.div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div style={{ padding: "2rem" }}>
          {/* Top badges row */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
              alignItems: "center",
            }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.9rem",
                borderRadius: "100px",
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#4ade80",
                letterSpacing: "0.05em",
              }}
            >
              <motion.div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4ade80",
                }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              ✓ {pub.status}
            </motion.div>

            {/* Venue badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.9rem",
                borderRadius: "100px",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))",
                border: "1px solid rgba(99,102,241,0.4)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#818cf8",
              }}
            >
              <SiIeee style={{ fontSize: "0.9rem" }} />
              {pub.venue}
            </div>

            {/* CORE rank badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.9rem",
                borderRadius: "100px",
                background:
                  "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.2))",
                border: "1px solid rgba(251,191,36,0.4)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#fbbf24",
              }}
            >
              <FaStar style={{ fontSize: "0.7rem" }} />
              {pub.rank} • {pub.track}
            </div>
          </div>

          {/* Title */}
          <motion.h3
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 700,
              lineHeight: 1.4,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #e2e8f0, #a5b4fc, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <FaQuoteLeft
              style={{
                display: "inline",
                fontSize: "0.8rem",
                opacity: 0.5,
                marginRight: "0.5rem",
                verticalAlign: "top",
              }}
            />
            {pub.title}
          </motion.h3>

          {/* Authors */}
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(148, 163, 184, 0.8)",
              marginBottom: "0.5rem",
              fontStyle: "italic",
            }}
          >
            {pub.authors.join(", ")} — {pub.year}
          </p>

          {/* Full venue */}
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(139, 92, 246, 0.7)",
              marginBottom: "1.5rem",
              fontWeight: 500,
            }}
          >
            📍 {pub.venueFull}
          </p>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
              marginBottom: "1.5rem",
            }}
          />

          {/* Abstract */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4
              style={{
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(148, 163, 184, 0.6)",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaMicroscope />
              Abstract
            </h4>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "rgba(226, 232, 240, 0.75)",
              }}
            >
              {pub.abstract}
            </p>
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {pub.tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.07 }}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "100px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: "rgba(139, 92, 246, 0.12)",
                  border: "1px solid rgba(139, 92, 246, 0.25)",
                  color: "#a78bfa",
                  cursor: "default",
                  transition: "all 0.2s ease",
                }}
                whileHover={{
                  background: "rgba(139, 92, 246, 0.25)",
                  borderColor: "rgba(139, 92, 246, 0.5)",
                }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Publications = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="publications"
      ref={sectionRef}
      style={{
        padding: "6rem 0",
        position: "relative",
        minHeight: "auto",
        overflow: "hidden",
      }}
    >
      {/* Background elements */}
      <FloatingOrb
        size="500px"
        x="-10%"
        y="10%"
        delay={0}
        color="radial-gradient(circle, rgba(139,92,246,1), rgba(99,102,241,0.5))"
      />
      <FloatingOrb
        size="400px"
        x="60%"
        y="30%"
        delay={2}
        color="radial-gradient(circle, rgba(59,130,246,1), rgba(139,92,246,0.5))"
      />
      <ParticleField />

      {/* Grid lines background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          {/* Pre-title label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1.2rem",
              borderRadius: "100px",
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.15))",
              border: "1px solid rgba(139,92,246,0.3)",
              marginBottom: "1.5rem",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#a78bfa",
            }}
          >
            <FaBookOpen style={{ fontSize: "0.75rem" }} />
            Research & Publications
          </motion.div>

          <SectionTitle
            title="Publications"
            subtitle="Peer-reviewed research contributions to the field of AI & Software Engineering"
          />

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            {[
              { label: "Publications", value: "1", icon: "📄" },
              { label: "Conference Rank", value: "CORE A*", icon: "🏆" },
              { label: "Venue", value: "ASE 2026", icon: "🎓" },
              { label: "Status", value: "Accepted", icon: "✅" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{
                  textAlign: "center",
                  padding: "1rem 1.5rem",
                  borderRadius: "16px",
                  background: "rgba(139,92,246,0.07)",
                  border: "1px solid rgba(139,92,246,0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.25rem" }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #a78bfa, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(148,163,184,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: "0.2rem",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Publication cards */}
        <div
          style={{
            display: "grid",
            gap: "2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {publications.map((pub, i) => (
            <PublicationCard key={pub.id} pub={pub} index={i} />
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          style={{
            textAlign: "center",
            marginTop: "3rem",
            padding: "1.5rem",
            borderRadius: "16px",
            background: "rgba(139,92,246,0.05)",
            border: "1px dashed rgba(139,92,246,0.2)",
            maxWidth: "600px",
            margin: "3rem auto 0",
          }}
        >
          <FaAward
            style={{
              fontSize: "1.5rem",
              color: "#a78bfa",
              marginBottom: "0.5rem",
              display: "block",
              margin: "0 auto 0.5rem",
            }}
          />
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(148,163,184,0.7)",
              lineHeight: 1.6,
            }}
          >
            Published in one of the most prestigious venues in Software
            Engineering — <strong style={{ color: "#a78bfa" }}>ASE 2026</strong>{" "}
            is a CORE A* ranked conference with highly competitive acceptance
            rates.
          </p>
        </motion.div>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
};

export default Publications;
