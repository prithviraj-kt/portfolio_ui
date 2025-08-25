import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const BUBBLE_COUNT = 15
const COLORS = [
  'rgba(33, 150, 243, 0.3)',  // primary
  'rgba(0, 188, 212, 0.3)',   // secondary
  'rgba(255, 193, 7, 0.3)',   // accent
]

const BubbleBackground = () => {
  const canvasRef = useRef(null)
  const bubbles = useRef([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Reinitialize bubbles
      initBubbles()
    }
    
    const initBubbles = () => {
      bubbles.current = []
      
      for (let i = 0; i < BUBBLE_COUNT; i++) {
        const size = Math.random() * 100 + 50
        bubbles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1
        })
      }
    }
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      bubbles.current.forEach(bubble => {
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fillStyle = bubble.color.replace(')', `, ${bubble.opacity})`)
        ctx.fill()
        
        // Move bubbles
        bubble.x += bubble.speedX
        bubble.y += bubble.speedY
        
        // Bounce off walls
        if (bubble.x < 0 || bubble.x > canvas.width) bubble.speedX *= -1
        if (bubble.y < 0 || bubble.y > canvas.height) bubble.speedY *= -1
      })
      
      animationFrameId = requestAnimationFrame(render)
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    render()
    
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return (
    <motion.canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

export default BubbleBackground