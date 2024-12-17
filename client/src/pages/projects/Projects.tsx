import Layout from '../../layout/Layout'
import { useGetAllProjectsQuery } from '../../state/slices/ProjectSlice'
import ProjectCard from '../../components/Projects/ProjectCard'

const Projects: React.FC = () => {
  const { data, error, isLoading } = useGetAllProjectsQuery()
  console.log('data: ', data)
  if (isLoading) return <div>Loading...</div>
  return (
    <Layout>
      <h1 className="text-center text-xl mb-4">Projects</h1>

      {isLoading && <p className="text-center">Loading Projects...</p>}
      {error && (
        <p className="text-center text-red-500">Error fetching Projects.</p>
      )}

      <div className="flex flex-col items-start justify-start gap-5">
        {data &&
          data?.map(
            (project: {
              id: string
              name: string
              description: string
              price: number
            }) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                gitHubLink={project.gitHubLink}
                liveLink={project.liveLink}
              />
            )
          )}
      </div>
    </Layout>
  )
}

export default Projects
