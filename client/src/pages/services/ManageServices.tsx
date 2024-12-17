import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../../layout/Layout'
import { GoProjectRoadmap } from 'react-icons/go'
import { IoIosCloseCircle } from 'react-icons/io'
import CreateService from '../../components/Services/CreateService'

const ManageServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  // Close modal when clicking outside of the modal content
  const handleClickOutside = (e) => {
    if (modalRef?.current && !modalRef?.current?.contains(e.target)) {
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isModalOpen])

  return (
    <Layout>
      <div className="flex justify-between items-center px-4 py-6">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        <button
          onClick={handleModalToggle}
          className="text-3xl text-primary  focus:outline-none"
        >
          <GoProjectRoadmap />
        </button>
      </div>
      {/* AnimatePresence for handling modal animations */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={modalRef} // Attach ref to modal content
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={handleModalToggle}
                className="text-xl focus:outline-none absolute top-3 right-3 hover:opacity-70"
              >
                <IoIosCloseCircle size={30} />
              </button>
              <CreateService />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default ManageServices
