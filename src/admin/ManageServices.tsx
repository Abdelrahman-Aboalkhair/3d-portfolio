import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../layout/Layout'
import { GoProjectRoadmap } from 'react-icons/go'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import {
  useGetAllServicesQuery,
  useDeleteServiceMutation,
} from '../state/slices/ServiceSlice'
import UpdateService from '../components/Services/UpdateService'
import CreateService from '../components/Services/CreateService'

const ManageServices = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const createModalRef = useRef(null)
  const updateModalRef = useRef(null)

  const { data: services, isLoading, error } = useGetAllServicesQuery()
  console.log('services: ', services)
  const [deleteService] = useDeleteServiceMutation()

  const handleCreateModalToggle = () => setIsCreateModalOpen(!isCreateModalOpen)
  const handleUpdateModalToggle = (service = null) => {
    setSelectedService(service)
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

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId)
    } catch (err) {
      console.error('Error deleting service:', err)
    }
  }

  return (
    <Layout>
      <div
        onClick={handleCreateModalToggle}
        className="flex items-center justify-end gap-5 mb-10"
      >
        <button className="text-xl text-primary focus:outline-none capitalize">
          <h1>Create new service</h1>
        </button>
        <GoProjectRoadmap size={26} color="#7127BA" />
      </div>

      <div className="flex flex-col items-start justify-start gap-5">
        {services &&
          services?.services?.map(
            (service: {
              id: string
              title: string
              description: string
              price: number
            }) => (
              <>
                <div className="flex space-x-6">
                  <h1 className="font-medium text-xl mr-10">{service.title}</h1>
                  <button
                    onClick={() => handleUpdateModalToggle(service)}
                    className="text-yellow-500 text-2xl"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
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
              className="bg-white dark:bg-slate-800  p-6 rounded-md w-full max-w-[40%] max-h-[80vh] overflow-y-auto"
            >
              <button
                className="absolute top-4 right-4 text-3xl"
                onClick={handleCreateModalToggle}
              >
                <IoIosCloseCircle />
              </button>
              <CreateService closeModal={handleCreateModalToggle} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpdateModalOpen && selectedService && (
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
              <UpdateService
                serviceId={selectedService._id}
                existingData={selectedService}
                closeModal={handleUpdateModalToggle}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default ManageServices
