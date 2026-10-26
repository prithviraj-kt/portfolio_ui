import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SectionTitle = ({ title, subtitle }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <div ref={ref} className="section-title-container" style={{ 
      textAlign: 'center',
      marginBottom: 'var(--spacing-5)'
    }}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          margin: 0,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--primary-400) 70%, var(--secondary-400) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {title}
      </motion.h2>

      {/* Animated underline */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: '80px', opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--primary-400), var(--secondary-400))',
          margin: '1rem auto',
          borderRadius: '3px',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
        }}
      />

      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0.5rem auto 0',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionTitle