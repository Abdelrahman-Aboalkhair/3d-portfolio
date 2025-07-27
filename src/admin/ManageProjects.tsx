import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoProjectRoadmap } from 'react-icons/go'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from '../state/slices/ProjectSlice'
import UpdateProject from '../components/Projects/UpdateProject'
import CreateProject from '../components/Projects/CreateProject'

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
    <main className="flex flex-col items-start justify-start gap-10 p-10 min-h-screen">
      <div
        onClick={handleCreateModalToggle}
        className="flex items-center justify-end gap-5 mb-10 "
      >
        <button className="text-xl text-primary focus:outline-none capitalize">
          <h1>Create new project</h1>
        </button>
        <GoProjectRoadmap size={26} color="#7127BA" />
      </div>

      <div className="flex flex-col items-start justify-start gap-5">
        {projects &&
          projects?.map(
            (project: {
              id: string
              title: string
              description: string
              price: number
            }) => (
              <>
                <div className="flex space-x-6">
                  <h1 className="font-medium text-xl mr-10">{project.title}</h1>
                  <button
                    onClick={() => handleUpdateModalToggle(project)}
                    className="text-yellow-500 text-2xl"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 text-xl"
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
              className="bg-white dark:bg-slate-800 p-6 rounded-md w-full max-w-[40%] max-h-[80vh] overflow-y-auto"
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
    </main>
  )
}

export default ManageProjects
