import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../../layout/Layout'
import { GoProjectRoadmap } from 'react-icons/go'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from '../../state/slices/ProjectSlice'
import UpdateProject from '../../components/Projects/UpdateProject'
import CreateProject from '../../components/Projects/CreateProject'
import ProjectCard from '../../components/Projects/ProjectCard'

const ManageProjects = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const createModalRef = useRef(null)
  const updateModalRef = useRef(null)

  const { data: projects, isLoading, error } = useGetAllProjectsQuery()
  const [deleteProject] = useDeleteProjectMutation()

  const handleCreateModalToggle = () => setIsCreateModalOpen(!isCreateModalOpen)
  const handleUpdateModalToggle = (project = null) => {
    setSelectedProject(project)
    setIsUpdateModalOpen(!isUpdateModalOpen)
  }

  const handleClickOutside = (e) => {
    if (createModalRef.current && !createModalRef.current.contains(e.target)) {
      setIsCreateModalOpen(false)
    }
    if (updateModalRef.current && !updateModalRef.current.contains(e.target)) {
      setIsUpdateModalOpen(false)
    }
  }

  useEffect(() => {
    if (isCreateModalOpen || isUpdateModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCreateModalOpen, isUpdateModalOpen])

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId)
    } catch (err) {
      console.error('Error deleting project:', err)
    }
  }

  return (
    <Layout>
      <div className="flex justify-between items-center px-4 py-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <button
          onClick={handleCreateModalToggle}
          className="text-3xl text-primary focus:outline-none"
        >
          <GoProjectRoadmap />
        </button>
      </div>

      <div className="flex flex-col items-start justify-start gap-5">
        {projects &&
          projects?.map(
            (project: {
              id: string
              name: string
              description: string
              price: number
            }) => (
              <>
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  gitHubLink={project.gitHubLink}
                  liveLink={project.liveLink}
                />

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleUpdateModalToggle(project)}
                    className="text-yellow-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </>
            )
          )}
      </div>

      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          >
            <div
              ref={createModalRef}
              className="bg-white p-6 rounded-md w-full max-w-[40%] max-h-[80vh] overflow-y-auto"
            >
              <button
                className="absolute top-4 right-4 text-3xl"
                onClick={handleCreateModalToggle}
              >
                <IoIosCloseCircle />
              </button>
              <CreateProject closeModal={handleCreateModalToggle} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpdateModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center"
          >
            <div
              ref={updateModalRef}
              className="bg-white p-6 rounded-md w-full max-w-md"
            >
              <button
                className="absolute top-4 right-4 text-3xl"
                onClick={handleUpdateModalToggle}
              >
                <IoIosCloseCircle />
              </button>
              <UpdateProject
                projectId={selectedProject._id}
                existingData={selectedProject}
                closeModal={handleUpdateModalToggle}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default ManageProjects
