import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Typed from 'typed.js'
import { FaLinkedin, FaGithub, FaTwitter, FaBehance } from 'react-icons/fa'
import { Link } from 'react-scroll'

const Hero = () => {
  const imageRef = useRef(null)
  const typedRef = useRef(null)
  const typedElement = useRef(null)
  
  // Parallax effect on image
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return
      
      const x = (window.innerWidth / 2 - e.pageX) / 50
      const y = (window.innerHeight / 2 - e.pageY) / 50
      
      imageRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Initialize Typed.js
  useEffect(() => {
    const options = {
      strings: [
        'Software Developer',
        'Gen AI Engineer',
        'Machine Learning Engineer',
        'Creative Thinker',
        'Problem Solver'
      ],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true
    }

    typedRef.current = new Typed(typedElement.current, options)

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy()
      }
    }
  }, [])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }
  
  const socialVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: 0.8 + (i * 0.1)
      }
    })
  }

  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com', label: 'GitHub' },
    // { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    // { icon: <FaBehance />, url: 'https://behance.net', label: 'Behance' }
  ]
  
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--spacing-4)',
          alignItems: 'center'
        }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-content"
          >
            
            <motion.h3 variants={itemVariants} className="greeting" style={{
              color: 'var(--primary-400)',
              marginBottom: 'var(--spacing-1)',
              marginTop: 'var(--spacing-5)'

            }}>
              Hello, I'm
            </motion.h3>
            <motion.h1 variants={itemVariants} className="name" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: 'var(--spacing-2)',
              background: 'linear-gradient(45deg, var(--primary-400), var(--secondary-400))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent'
            }}>
              Prithviraj K Tagadinamani
            </motion.h1>
            
            <motion.div variants={itemVariants} className="typed-container" style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: 'var(--spacing-3)',
              height: '2.5rem'
            }}>
              <span ref={typedElement} style={{ color: 'var(--accent-400)' }}></span>
            </motion.div>
            
            <motion.p variants={itemVariants} className="bio" style={{
              fontSize: '1.1rem',
              maxWidth: '600px',
              marginBottom: 'var(--spacing-4)',
              color: 'var(--text-secondary)'
            }}>
              I'm a passionate developer who creates impact oriented, beautiful, functional, user-centered digital experiences. With a focus on clean code and cutting-edge technologies, I build AI powered applications that solve real-world problems.
            </motion.p>
            
            <motion.div variants={itemVariants} className="hero-buttons" style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              flexWrap: 'wrap'
            }}>
              <Link to="projects" spy={true} smooth={true} offset={-70} duration={500}>
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
              </Link>
              
              <Link to="contact" spy={true} smooth={true} offset={-70} duration={500}>
                <motion.button
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </Link>
            </motion.div>
            
            <motion.div className="social-links" style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              marginTop: 'var(--spacing-4)'
            }}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  custom={index}
                  variants={socialVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    scale: 1.2,
                    color: 'var(--primary-400)'
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    background: 'var(--dark-card)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="image-container" style={{
              position: 'relative',
              width: 'min(90%, 400px)',
              height: 'min(90%, 400px)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <div ref={imageRef} style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease-out'
              }} />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="scroll-indicator" style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}
        >
          Scroll Down
        </motion.p>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1
          }}
          style={{
            width: '30px',
            height: '50px',
            border: '2px solid var(--text-secondary)',
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5
            }}
            style={{
              width: '6px',
              height: '10px',
              background: 'var(--primary-500)',
              borderRadius: '3px',
              marginTop: '8px'
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero