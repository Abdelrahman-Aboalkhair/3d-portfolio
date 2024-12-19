import Layout from '../../layout/Layout'
import { useGetAllProjectsQuery } from '../../state/slices/ProjectSlice'
import ProjectCard from '../../components/Projects/ProjectCard'
import { motion } from 'framer-motion'
import Loader from '../../components/Loader'
import Abstract from '../../assets/abstract.png'

const Projects: React.FC = () => {
  const { data, error, isLoading } = useGetAllProjectsQuery()
  if (isLoading) return <Loader />
  return (
    <Layout>
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="relative text-start text-[25px] tracking-wider rounded-sm mb-16 font-medium
    before:content-[''] before:absolute before:left-0 before:bottom-[-0.5rem]
    before:h-1 before:w-[3.5rem] before:bg-primary before:rounded-lg w-fit"
      >
        Projects
      </motion.h1>

      {isLoading && <p className="text-center">Loading Projects...</p>}
      {error && (
        <p className="text-center text-red-500">Error fetching Projects.</p>
      )}

      <div className="flex flex-col items-start justify-start gap-[5rem]">
        {data &&
          data?.map(
            (
              project: {
                id: string
                name: string
                description: string
                price: number
                image: string
                technologies: string[]
                gitHubLink: string
                liveLink: string
              },
              index
            ) => (
              <ProjectCard
                image={project.image}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                gitHubLink={project.gitHubLink}
                liveLink={project.liveLink}
                isSecondProject={index === 1}
                isFirstProject={index === 0}
                isThirdProject={index === 2}
              />
            )
          )}
      </div>
    </Layout>
  )
}

export default Projects
