import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar') && !e.target.closest('.hamburger')) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <motion.nav 
      className={`navbar glass ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem 2rem',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        ...(scrolled ? {
          padding: '0.5rem 2rem',
          backdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
        } : {})
      }}
    >
      <div className="logo">
        <Link to="home" spy={true} smooth={true} duration={500}>
          <motion.h2
            style={{ margin: 0, cursor: 'pointer' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Logo content here */}
          </motion.h2>
        </Link>
      </div>

      {/* Desktop/Mobile Scrollable menu */}
      <motion.ul
        className="nav-links"
        style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          // Add these styles for horizontal scrolling
          flexWrap: 'nowrap',
          overflowX: 'auto',
          MsOverflowStyle: 'none', /* Hide scrollbar for IE and Edge */
          scrollbarWidth: 'none', /* Hide scrollbar for Firefox */
          // Hide desktop menu on mobile
          '@media (max-width: 768px)': {
            // NOTE: This inline media query doesn't work. We need to do it another way.
            // Let's use JavaScript for now as per previous attempt.
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {navLinks.map((link) => (
          <motion.li key={link.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ flexShrink: 0 }} // Prevents links from shrinking
          >
            <Link
              to={link.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{
                cursor: 'pointer',
                fontWeight: 500,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                padding: '0.5rem',
                position: 'relative'
              }}
              activeClass="active-link"
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Mobile hamburger - No longer needed for horizontal scroll */}
      {/* <motion.button
          className="hamburger"
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'block'
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      */}

      {/* Mobile menu - No longer needed for horizontal scroll */}
      {/*
        <motion.div
          className="mobile-menu glass"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
            display: isOpen ? 'block' : 'none'
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            overflow: 'hidden',
            '@media (min-width: 769px)': {
              display: 'none'
            }
          }}
        >
          <ul style={{
            listStyle: 'none',
            padding: '1rem',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {navLinks.map((link) => (
              <motion.li 
                key={link.id}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.id}
                  // ... (rest of mobile link props)
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      */}
    </motion.nav>
  )
}

export default Navbar