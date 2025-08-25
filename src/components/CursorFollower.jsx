import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    const handleMouseEnter = () => setShowCursor(true)
    const handleMouseLeave = () => setShowCursor(false)
    
    window.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Check if we're on a mobile device (no cursor)
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      setShowCursor(false)
    } else {
      setShowCursor(true)
    }
    
    return () => {
      window.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <motion.div
      className="cursor-follower"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        opacity: showCursor ? 1 : 0
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        mass: 0.5
      }}
      style={{
        position: 'fixed',
        zIndex: 9999,
        pointerEvents: 'none',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        border: '2px solid rgba(33, 150, 243, 0.3)',
        boxShadow: '0 0 20px rgba(33, 150, 243, 0.5)'
      }}
    />
  )
}

export default CursorFollower