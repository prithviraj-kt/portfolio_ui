import { motion } from 'framer-motion'

const loadingContainerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.5 }
  }
}

const loadingBubbleVariants = {
  initial: { y: 0, opacity: 0 },
  animate: {
    y: [-15, 0, -15],
    opacity: 1,
    transition: {
      y: {
        repeat: Infinity,
        duration: 1,
        ease: 'easeInOut'
      }
    }
  }
}

const Loader = () => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 9999
      }}
      variants={loadingContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div
        style={{
          display: 'flex',
          gap: '8px'
        }}
      >
        {[0, 1, 2, 3].map(index => (
          <motion.div
            key={index}
            variants={loadingBubbleVariants}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: `var(--primary-${(index + 5) * 100})`,
              margin: '0 5px'
            }}
          />
        ))}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem', color: 'var(--text-primary)' }}
      >
        Loading...
      </motion.h2>
    </motion.div>
  )
}

export default Loader