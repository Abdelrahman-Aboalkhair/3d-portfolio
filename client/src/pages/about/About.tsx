import { motion } from 'framer-motion'
import LaptopVector from '../../assets/laptop_illustration.png'

const About = () => {
  return (
    <>
      <main className="flex items-center justify-between px-[150px] min-h-screen mt-[-4rem]">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-start justify-start gap-4 w-1/2"
        >
          <h1
            className="relative text-start text-[25px] tracking-wider rounded-sm mb-6 font-medium
                        before:content-[''] before:absolute before:left-0 before:bottom-[-0.5rem]
                        before:h-1 before:w-[3rem] before:bg-primary before:rounded-lg w-fit"
          >
            About
          </h1>
          <h1 className="text-3xl md:text-6xl md:leading-[4.8rem] font-bold capitalize ">
            My career as a <br />
            <span className="text-primary">web developer</span>
          </h1>

          <p className="text-gray-400 dark:text-gray-300 text-base leading-relaxed w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            assumenda, cupiditate aliquam unde provident sunt et ab expedita
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          src={LaptopVector}
          className="rounded-lg w-1/2 object-cover h-fit"
          alt="About me"
        />
      </main>
    </>
  )
}

export default About
