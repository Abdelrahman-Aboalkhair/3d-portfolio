import { Canvas } from '@react-three/fiber'
import Experience from '../../Experience'
import Graident from '../../assets/Gradient.svg'
import { useTheme } from '../../context/ThemeContext'

const Home = () => {
  const { theme } = useTheme()
  return (
    <div className="flex items-start justify-start w-full h-full px-[20px]">
      <img
        src={Graident}
        className="absolute top-[10%] right-0 z-[-1000] opacity-100"
        alt=""
      />
      {theme === 'dark' && (
        <img
          src={Graident}
          className="absolute top-[16%] left-[-12%] z-[-1000] opacity-[20%]"
          alt=""
        />
      )}
      <div className="flex flex-col items-start justify-start pt-[15%] pl-[9%]">
        <h1
          className="font-black text-[70px] leading-[6rem]
      "
        >
          Hey, I am <span className="text-[#7127BA]">"Your Name"</span>
        </h1>
        <button className="btn-primary mt-[10px] ">Download CV</button>
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
  )
}

export default Home
