import { Canvas } from "@react-three/fiber";
import Experience from "../../Experience";
import { motion } from "framer-motion";
import ParticleSystem from "../../components/ParticlesSystem";

const Home = () => {
  return (
    <>
      <div className="flex items-start justify-between w-full min-h-screen h-full relative overflow-hidden">
        <div className="p-6 text-left pt-[10%] pl-[10%] ">
          <h1 className="text-white text-[70px] font-extrabold leading-tight">
            Hey, It's Body<span className="text-primary">.</span>
          </h1>

          <p className="text-gray-400 mt-2">
            A full-stack developer with a passion for creating innovative web
            applications. I specialize in building responsive and user-friendly
            interfaces, and I have a strong background in both front-end and
            back-end development. Let's connect and build something amazing
            together!
          </p>
        </div>
        {/* 3D Canvas Section - Expanded */}
        <div className="w-full h-screen relative">
          <Canvas
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [1, 2, 6],
            }}
            className="bg-transparent"
          >
            <ambientLight intensity={0.1} />
            <ParticleSystem />
            <Experience />
          </Canvas>
        </div>

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-30"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white rounded-full"
        />
      </div>
    </>
  );
};

export default Home;
