import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SectionTitle = ({ title, subtitle }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  }

  const decoratorVariants = {
    hidden: { width: 0 },
    visible: {
      width: 80,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <div ref={ref} className="section-title-container" style={{ 
      textAlign: 'center',
      marginBottom: 'var(--spacing-5)'
    }}>
      <motion.h2
        className="section-title"
        variants={titleVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ margin: 0 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="section-title-decoration"
        variants={decoratorVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          height: 3,
          backgroundColor: 'var(--primary-500)',
          margin: '1rem auto',
          borderRadius: 3
        }}
      />

      {subtitle && (
        <motion.p
          className="section-subtitle"
          variants={subtitleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0.5rem auto 0'
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionTitle