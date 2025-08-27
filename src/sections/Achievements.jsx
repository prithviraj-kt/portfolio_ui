import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaTrophy, 
  FaMedal, 
  FaStar, 
  FaUsers, 
  FaCertificate, 
  FaChalkboard 
} from "react-icons/fa"
import SectionTitle from '../components/SectionTitle'

const Achievements = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const achievements = [
  {
    id: 1,
    title: "Keynote Speaker",
    description: "Chief Guest & keynote speaker at Codenex Tech Event, addressing 200+ participants.",
    icon: <FaCertificate />, // 🎓 Recognition
    color: "var(--accent-600)"
  },
  {
    id: 2,
    title: "Technical Judge",
    description: "Evaluated 30+ projects for GDSC Thinkubator and IEEE Ideathon.",
    icon: <FaStar />, // ⭐ Judging/recognition
    color: "var(--primary-500)"
  },
  {
    id: 3,
    title: "Technical Mentor",
    description: "Mentored 30+ teams at Advitiya Hackathon (24 hours) 2023.",
    icon: <FaUsers />, // 👥 Mentorship
    color: "var(--secondary-600)"
  },
  {
    id: 4,
    title: "300+ DSA Problems",
    description: "Demonstrated strong problem-solving skills by solving 300+ problems.",
    icon: <FaTrophy />, // 🏆 Achievement
    color: "var(--primary-600)"
  },
  {
    id: 5,
    title: "Educator",
    description: "Conducted 5+ workshops on Git, Blockchain, and Web Development for 500+ students.",
    icon: <FaChalkboard />, // 📚 Teaching
    color: "var(--success-500)"
  },
  {
    id: 6,
    title: "Placement Coordinator",
    description: "Led campus recruitment initiatives, facilitating 500+ student placements.",
    icon: <FaUsers />, // 👥 People coordination
    color: "var(--accent-500)"
  },
  {
    id: 7,
    title: "National Abacus Champion",
    description: "Achieved 1st place among 5000+ participants in the National Championship.",
    icon: <FaMedal />, // 🥇 Competition
    color: "var(--secondary-500)"
  },
  {
    id: 8,
    title: "Leadership Recognition",
    description: 'Awarded "Best Boy of the Year" for outstanding leadership & mentorship.',
    icon: <FaStar />, // ⭐ Leadership award
    color: "var(--primary-600)"
  }
]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  }

  return (
    <section id="achievements" ref={ref} style={{ padding: "4rem 0" }}>
      <div className="container">
        <SectionTitle 
          title="Achievements" 
          subtitle="Highlights from my technical journey, leadership, and recognitions" 
        />

        {/* Achievements Grid */}
        <motion.div 
          className="achievements-grid"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 'var(--spacing-4)',
            marginTop: '2rem'
          }}
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="achievement-card"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: 'var(--spacing-4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                boxShadow: 'var(--shadow-lg)',
                cursor: 'default',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  backgroundColor: achievement.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginBottom: '1rem',
                  fontSize: '1.2rem'
                }}
              >
                {achievement.icon}
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {achievement.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements
