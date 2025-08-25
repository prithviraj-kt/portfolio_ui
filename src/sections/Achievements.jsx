import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FaTrophy, FaCertificate, FaMedal, FaStar } from 'react-icons/fa'
import SectionTitle from '../components/SectionTitle'

const Achievements = () => {
  const [activeCard, setActiveCard] = useState(null)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const achievements = [
    {
      id: 1,
      title: 'React Development',
      issuer: 'Meta (Facebook)',
      date: 'October 2022',
      description: 'Advanced certification in React Development from Meta, covering modern React practices including hooks, context, and performance optimization.',
      image: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=600',
      icon: <FaCertificate />,
      color: 'var(--primary-600)'
    },
    {
      id: 2,
      title: 'Best UI/UX Designer',
      issuer: 'Design Summit 2021',
      date: 'June 2021',
      description: 'Recognized as the Best UI/UX Designer at the International Design Summit for creating an innovative healthcare interface for elderly users.',
      image: 'https://images.pexels.com/photos/7015034/pexels-photo-7015034.jpeg?auto=compress&cs=tinysrgb&w=600',
      icon: <FaTrophy />,
      color: 'var(--accent-600)'
    },
    {
      id: 3,
      title: 'Google UX Design',
      issuer: 'Google',
      date: 'March 2020',
      description: 'Professional certification in UX Design from Google, covering the entire design process from user research to high-fidelity prototyping.',
      image: 'https://images.pexels.com/photos/33972/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      icon: <FaCertificate />,
      color: 'var(--secondary-600)'
    },
    {
      id: 4,
      title: 'Hackathon Winner',
      issuer: 'TechCrunch Disrupt',
      date: 'September 2019',
      description: 'First place at TechCrunch Disrupt Hackathon for developing an AI-powered accessibility tool that helps visually impaired users navigate websites.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
      icon: <FaMedal />,
      color: 'var(--success-500)'
    }
  ]

  const stats = [
    { value: 25, label: 'Projects Completed', icon: '💼' },
    { value: 15, label: 'Happy Clients', icon: '😊' },
    { value: 8, label: 'Awards Received', icon: '🏆' },
    { value: 4, label: 'Years Experience', icon: '⏱️' }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <section id="achievements" ref={ref}>
      <div className="container">
        <SectionTitle 
          title="Achievements" 
          subtitle="Awards, certifications, and milestones from my professional journey" 
        />
        
        <motion.div 
          className="stats-container"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-6)'
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="stat-card glass"
              style={{
                padding: 'var(--spacing-3)',
                textAlign: 'center',
                borderRadius: '12px'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-400)' }}>
                {inView ? (
                  <CountUp 
                    start={0} 
                    end={stat.value} 
                    duration={2.5} 
                    separator="," 
                  />
                ) : (
                  0
                )}
                <span style={{ color: 'var(--accent-400)' }}>+</span>
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="achievements-grid"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--spacing-3)'
          }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={item}
              className="achievement-card"
              onMouseEnter={() => setActiveCard(achievement.id)}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                height: '300px',
                cursor: 'pointer'
              }}
            >
              <div
                className="achievement-bg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${achievement.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                  transform: activeCard === achievement.id ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              
              <div
                className="achievement-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3))',
                  padding: 'var(--spacing-3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <div 
                  className="achievement-icon"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: achievement.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: 'white'
                  }}
                >
                  {achievement.icon}
                </div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={activeCard === achievement.id ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.7)',
                    padding: 'var(--spacing-3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: activeCard === achievement.id ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <p style={{ textAlign: 'center', marginBottom: 'var(--spacing-3)' }}>
                    {achievement.description}
                  </p>
                  <motion.button
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Certificate
                  </motion.button>
                </motion.div>
                
                <h3 style={{ margin: 0, color: 'white' }}>{achievement.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{achievement.issuer}</span>
                  <span style={{ color: 'var(--accent-300)' }}>{achievement.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="testimonials"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: 'var(--spacing-6)',
            padding: 'var(--spacing-4)',
            borderRadius: '12px',
            background: 'var(--dark-surface)',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'var(--accent-500)',
            fontSize: '2.5rem'
          }}>
            <FaStar />
          </div>
          
          <h3 style={{ textAlign: 'center', marginBottom: 'var(--spacing-3)' }}>
            Client Testimonial
          </h3>
          
          <blockquote style={{
            fontSize: '1.1rem',
            fontStyle: 'italic',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            color: 'var(--text-secondary)'
          }}>
            "Prithviraj is one of the most talented developers I've worked with. His attention to detail and commitment to creating user-friendly interfaces sets him apart. He delivered our project on time and exceeded our expectations in every way."
          </blockquote>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'var(--spacing-3)'
          }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: 'var(--spacing-2)'
              }}
            >
              <img
                src="https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Client"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Sarah Johnson</div>
              <div style={{ color: 'var(--primary-400)', fontSize: '0.9rem' }}>
                CEO, InnovateX
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements