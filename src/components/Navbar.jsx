import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

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
  const [activeSection, setActiveSection] = useState('home')
  const [isMobile, setIsMobile] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const toggleMenu = () => setIsOpen(!isOpen)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      // Find active section with better detection
      let currentSection = 'home'
      
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(navLinks[i].id)
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY
          
          if (scrollPosition >= sectionTop - 150) {
            currentSection = navLinks[i].id
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return
    
    const handleClickOutside = (e) => {
      const navbar = e.target.closest('.navbar-container')
      const hamburger = e.target.closest('.mobile-hamburger')
      
      if (!navbar && !hamburger) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  // Smooth scroll to section with better mobile handling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Force active section update for immediate feedback
      setActiveSection(sectionId)
    }
    
    // Close mobile menu
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <motion.nav 
        className="navbar-container"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: isMobile ? '0.75rem 1rem' : (scrolled ? '0.5rem 2rem' : '1rem 2rem'),
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: scrolled 
            ? 'rgba(var(--bg-primary-rgb), 0.95)' 
            : 'rgba(var(--bg-primary-rgb), 0.85)',
          borderBottom: scrolled 
            ? '1px solid var(--border-color-hover)' 
            : '1px solid var(--border-color)',
          boxShadow: scrolled ? '0 4px 20px var(--shadow-color)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Logo */}
         <motion.div className="logo">
  <button
    onClick={() => scrollToSection("home")}
    style={{
      background: "linear-gradient(135deg, #3b82f6 50%, #1d4ed8 50%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      border: "none",
      cursor: "pointer",
      fontSize: isMobile ? "1.3rem" : "1.6rem",
      fontWeight: "700",
      padding: "0.5rem 0",
      fontFamily: "inherit",
      display: "flex",
      alignItems: "center",
      gap: "0.2rem",
    }}
  >
    
    <span>Prithviraj</span>
  </button>
</motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.ul
              className="desktop-nav"
              style={{
                display: 'flex',
                gap: '0.25rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                alignItems: 'center',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 * index + 0.2, 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  style={{ position: 'relative' }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.id)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: activeSection === link.id ? '600' : '500',
                      color: activeSection === link.id ? '#3b82f6' : 'var(--text-primary)',
                      textDecoration: 'none',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.75rem',
                      position: 'relative',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      backgroundColor: activeSection === link.id 
                        ? 'rgba(59, 130, 246, 0.1)' 
                        : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== link.id) {
                        e.target.style.backgroundColor = isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)'
                        e.target.style.color = '#3b82f6'
                        e.target.style.transform = 'translateY(-2px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== link.id) {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = 'var(--text-primary)'
                        e.target.style.transform = 'translateY(0)'
                      }
                    }}
                  >
                    {link.label}
                    
                    {/* Active indicator - perfectly centered */}
                    <AnimatePresence>
                      {activeSection === link.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          style={{
                            position: 'absolute',
                            bottom: '0.25rem',
                            left: '1.25rem',
                            right: '1.25rem',
                            height: '2px',
                            background: 'linear-gradient(90deg, #3b82f6, #00bcd4)',
                            borderRadius: '2px',
                          }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 30,
                            duration: 0.3 
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ 
              scale: 1.15, 
              rotate: 180,
              boxShadow: isDark 
                ? '0 0 20px rgba(251, 191, 36, 0.4)' 
                : '0 0 20px rgba(59, 130, 246, 0.4)'
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'none',
              border: '2px solid transparent',
              cursor: 'pointer',
              color: isDark ? '#fbbf24' : '#3b82f6',
              fontSize: '1.2rem',
              padding: '0.6rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              backgroundColor: isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(59, 130, 246, 0.1)',
              borderColor: isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(59, 130, 246, 0.3)',
              boxShadow: isDark 
                ? '0 0 10px rgba(251, 191, 36, 0.2)' 
                : '0 0 10px rgba(59, 130, 246, 0.2)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <FaSun /> : <FaMoon />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile Hamburger Menu */}
          {isMobile && (
            <motion.button
              className="mobile-hamburger"
              onClick={toggleMenu}
              style={{
                background: 'none',
                border: '2px solid transparent',
                cursor: 'pointer',
                color: '#ffffff',
                fontSize: '1.4rem',
                padding: '0.6rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderColor: isOpen ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                boxShadow: isOpen ? '0 0 15px rgba(59, 130, 246, 0.3)' : 'none',
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'rgba(59, 130, 246, 0.3)',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <FaTimes /> : <FaBars />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20, scale: 0.95, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95, rotateX: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '1rem',
              right: '1rem',
              zIndex: 999,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(var(--bg-primary-rgb), 0.95)',
              borderRadius: '1rem',
              border: '1px solid var(--border-color-hover)',
              boxShadow: '0 10px 30px var(--shadow-color)',
              overflow: 'hidden',
            }}
          >
            <ul style={{
              listStyle: 'none',
              padding: '0.75rem 0',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Mobile Theme Toggle */}
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: 0.02, duration: 0.3, ease: 'easeOut' }}
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: '0.5rem',
                }}
              >
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isDark ? '#fbbf24' : '#3b82f6',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isDark ? <FaSun /> : <FaMoon />}
                  <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
                </motion.button>
              </motion.li>
              
              {navLinks.map((link, index) => (
                                  <motion.li 
                    key={link.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ 
                      delay: 0.05 * index,
                      duration: 0.3,
                      ease: 'easeOut'
                    }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                  <button
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: activeSection === link.id ? '600' : '500',
                      color: activeSection === link.id ? '#3b82f6' : 'var(--text-primary)',
                      textDecoration: 'none',
                      padding: '1rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      position: 'relative',
                      backgroundColor: activeSection === link.id 
                        ? 'rgba(59, 130, 246, 0.08)' 
                        : 'transparent',
                    }}
                    onTouchStart={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                      e.target.style.transform = 'scale(0.98)'
                    }}
                    onTouchEnd={(e) => {
                      setTimeout(() => {
                        if (activeSection !== link.id) {
                          e.target.style.backgroundColor = 'transparent'
                        }
                        e.target.style.transform = 'scale(1)'
                      }, 150)
                    }}
                  >
                    {/* Active indicator for mobile */}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        style={{
                          width: '3px',
                          height: '24px',
                          background: 'linear-gradient(180deg, #3b82f6, #00bcd4)',
                          marginRight: '1rem',
                          borderRadius: '2px',
                          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                        }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '24px', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span style={{ marginLeft: activeSection === link.id ? '0' : '1.75rem' }}>
                      {link.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)',
              zIndex: 998,
              backdropFilter: 'blur(2px)',
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar