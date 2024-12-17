import { Canvas } from '@react-three/fiber'
import Experience from '../../Experience'
import Graident from '../../assets/Gradient.svg'
import Services from '../services/Services'
import Projects from '../projects/Projects'
import About from '../about/About'
import Contact from '../contact/Contact'

const Home = () => {
  return (
    <>
      <div className="flex items-start justify-center w-full min-h-screen h-full">
        <img
          src={Graident}
          className="absolute top-[10%] right-0 z-[-1000] blur-xl"
          alt=""
        />

        <div className="flex flex-col items-start justify-start pl-[10%] pt-[9%] ">
          <h1 className="text-[85px] font-black leading-[6.2rem]">
            Hey, I am{' '}
            <span className="bg-gradient-to-r from-[#b47fff] via-[#a74eff] to-[#ea82ff] text-transparent bg-clip-text">
              Abdelrahman
            </span>
          </h1>

          <button className="btn-primary mt-[30px] ">Download CV</button>
        </div>
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [1, 2, 6],
          }}
        >
          <Experience />
        </Canvas>
      </div>

      <Services />
      <Projects />
      <About />
      <Contact />
    </>
  )
}

export default Home
