import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCode, FaPalette, FaTools, FaServer, FaMobileAlt, FaDatabase } from 'react-icons/fa'
import SectionTitle from '../components/SectionTitle'

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: <FaCode />,
      color: 'var(--primary-600)',
      skills: [
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'JavaScript (ES6+)', level: 90 },
        { name: 'React.js', level: 92 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'TypeScript', level: 80 }
      ]
    },
    
    {
      id: 'tools',
      title: 'Tools & Methods',
      icon: <FaTools />,
      color: 'var(--accent-600)',
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'Agile/Scrum', level: 80 },
        { name: 'Webpack', level: 78 },
        { name: 'Jest', level: 75 },
        { name: 'CI/CD', level: 72 },
        { name: 'Performance Optimization', level: 83 }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: <FaServer />,
      color: 'var(--primary-700)',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 82 },
        { name: 'MongoDB', level: 75 },
        { name: 'RESTful APIs', level: 88 },
        { name: 'GraphQL', level: 70 },
        { name: 'Firebase', level: 78 }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: <FaMobileAlt />,
      color: 'var(--secondary-700)',
      skills: [
        { name: 'React Native', level: 78 },
        { name: 'Flutter', level: 65 },
        { name: 'Responsive Design', level: 90 },
        { name: 'App Store Optimization', level: 75 },
        { name: 'Mobile UI/UX', level: 85 },
        { name: 'Native APIs', level: 72 }
      ]
    },
    {
      id: 'database',
      title: 'Database & Cloud',
      icon: <FaDatabase />,
      color: 'var(--accent-700)',
      skills: [
        { name: 'MongoDB', level: 80 },
        { name: 'AWS', level: 70 },
        { name: 'Firebase', level: 85 },
        { name: 'SQL', level: 75 },
        { name: 'Supabase', level: 78 },
        { name: 'Vercel/Netlify', level: 90 }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <SectionTitle 
          title="Skills & Expertise" 
          subtitle="Technical skills and professional competencies that I bring to the table" 
        />
        
        <motion.div
          className="skills-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--spacing-3)'
          }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              className="skill-category-card glass"
              variants={itemVariants}
              style={{
                borderRadius: '12px',
                padding: 'var(--spacing-3)',
                height: '100%'
              }}
            >
              <div className="category-header" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-3)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: category.color,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  {category.icon}
                </div>
                <h3 style={{ margin: 0 }}>{category.title}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, index) => (
                  <div key={index} style={{ marginBottom: 'var(--spacing-3)' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '5px'
                    }}>
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div style={{
                      height: '8px',
                      background: 'var(--dark-bg)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(90deg, ${category.color}, rgba(255,255,255,0.5))`,
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="tech-logos-container"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: 'var(--spacing-6)',
            textAlign: 'center'
          }}
        >
          <h3 style={{ marginBottom: 'var(--spacing-3)' }}>Technologies I Work With</h3>
          
          <div className="tech-logos" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--spacing-3)',
            marginTop: 'var(--spacing-3)'
          }}>
            {/* The logos would normally be actual SVG or PNG files, 
                but we're using placeholders for this implementation */}
            {['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'AWS', 
              'Figma', 'Next.js', 'GraphQL', 'Firebase', 'Git', 'Redux'].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ 
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.7 + (index * 0.05)
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                style={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'var(--dark-card)',
                  borderRadius: '12px',
                  padding: '10px'
                }}
              >
                <div style={{
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {tech}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills