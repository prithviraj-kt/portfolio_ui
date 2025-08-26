import Hero from '../sections/Hero'
import Education from '../sections/Education'
import Experience from '../sections/Experience'
import Achievements from '../sections/Achievements'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'
import Contact from '../sections/Contact'

const Home = () => {
  return (
    <>
      <Hero />
      <Education />
      <Experience />
      {/* <Achievements /> */}
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}

export default Home