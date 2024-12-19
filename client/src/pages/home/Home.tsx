import { Canvas } from '@react-three/fiber'
import Experience from '../../Experience'
import Graident from '../../assets/Gradient.svg'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <>
      <div className="flex items-start justify-center w-full min-h-screen h-full">
        <img
          src={Graident}
          className="absolute top-[10%] right-0 z-[-1000] blur-3xl"
          alt=""
        />

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-start justify-start pl-[10%] pt-[9%] "
        >
          <h1 className="text-[85px] font-black leading-[6.2rem]">
            Hey, I am <span className="text-primary">Abdelrahman</span>
          </h1>

          <button className="btn-primary mt-[30px] ">Download CV</button>
        </motion.div>
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
    </>
  )
}

export default Home
