import { motion } from 'framer-motion'
import { FiLink } from 'react-icons/fi'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  gitHubLink: string
  liveLink: string
  technologies: string[]
  isFirstProject: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  gitHubLink,
  liveLink,
  technologies,
  isFirstProject,
}: any) => {
  return (
    <div className="flex items-start justify-start gap-5 w-full py-[14px]">
      <motion.div
        initial={isFirstProject ? { opacity: 0, x: -100 } : { opacity: 0 }}
        animate={isFirstProject ? { opacity: 1, x: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-3 items-start justify-start w-1/2 "
      >
        <p className="text-primary capitalize text-[15px] mb-[-10px] font-medium tracking-widest">
          {title === 'Donor management system' ? '  Featured ' : 'Latest '}
        </p>
        <h2 className="text-[35px] capitalize font-medium">{title}</h2>
        <div className="relative p-8 backdrop-blur-xl bg-[#dedbdf]/20 dark:bg-[#2b0b3b]/30 rounded-lg flex items-start justify-start">
          <p className="text-gray-600 dark:text-[#c4cade] capitalize before:content-[''] before:absolute before:left-0 before:top-12 before:h-[4rem] before:w-1 before:bg-primary before:rounded-lg">
            {description}
          </p>
        </div>
      </motion.div>

      {image && (
        <motion.div
          className="relative backdrop-blur-xl bg-[#dedbdf]/30 dark:bg-[#2b0b3b]/30 rounded-lg pt-4 pl-8 w-1/2 overflow-hidden hover:cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <img
              src={image?.secure_url}
              className="object-cover rounded-lg transition-all duration-400 group-hover:brightness-[0.5]"
              alt="Project Image"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FiLink className="text-white text-3xl" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default ProjectCard
