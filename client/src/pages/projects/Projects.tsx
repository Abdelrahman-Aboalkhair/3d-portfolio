import Layout from "../../layout/Layout";
// import { useGetAllProjectsQuery } from '../../state/slices/ProjectSlice'
import ProjectCard from "../../components/Projects/ProjectCard";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";

const Projects: React.FC = () => {
  // const { data, error, isLoading } = useGetAllProjectsQuery()

  const isLoading = false;
  const error = false;

  const data = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A full-featured eCommerce platform with cart, checkout, and admin dashboard.",
      price: 0,
      image: "/assets/ecommerce.png",
      technologies: ["React", "Node.js", "MongoDB", "Redux"],
      gitHubLink: "https://github.com/yourusername/ecommerce-platform",
      liveLink: "https://yourdomain.com/ecommerce",
    },
    {
      id: "2",
      title: "Support Chat App",
      description:
        "A real-time customer support chat application using Socket.io.",
      price: 0,
      image: "/images/project2.png",
      technologies: ["Next.js", "Socket.io", "Express"],
      gitHubLink: "https://github.com/yourusername/chat-app",
      liveLink: "https://yourdomain.com/chat",
    },
    {
      id: "3",
      title: "3D Portfolio Website",
      description:
        "An interactive 3D portfolio built with Three.js and React Three Fiber.",
      price: 0,
      image: "/images/project3.png",
      technologies: ["Three.js", "React Three Fiber", "Framer Motion"],
      gitHubLink: "https://github.com/yourusername/3d-portfolio",
      liveLink: "https://yourdomain.com/portfolio",
    },
  ];

  if (isLoading) return <Loader />;

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
          data.map((project, index) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              gitHubLink={project.gitHubLink}
              liveLink={project.liveLink}
              isFirstProject={index === 0}
            />
          ))}
      </div>
    </Layout>
  );
};

export default Projects;
