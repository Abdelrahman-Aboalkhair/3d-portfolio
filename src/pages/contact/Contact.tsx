import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { axiosInstance } from '../../helpers/axiosInstance'
import { useState } from 'react'
import Illustration from '../../assets/voilet_illustration.png'

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      await axiosInstance.post('/contact', data)
      reset()
    } catch (error) {
      setIsLoading(false)
      console.log('ERROR sending email: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className="flex items-center justify-between px-[150px] min-h-screen ">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-start justify-start gap-4 w-1/2"
        >
          <h1
            className="relative text-start text-[25px] tracking-wider rounded-sm mb-6 font-medium
                        before:content-[''] before:absolute before:left-0 before:bottom-[-0.5rem]
                        before:h-1 before:w-[3rem] before:bg-primary before:rounded-lg w-fit capitalize"
          >
            get in touch
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md p-6 border rounded-lg bg-transparent backdrop-blur-md shadow-md
                     border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
          >
            <div className="mb-4">
              <input
                type="text"
                id="subject"
                {...register('subject', { required: 'Subject is required' })}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent 
                         text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-[#7127BA] focus:border-transparent"
                placeholder="Subject"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent 
                         text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-[#7127BA] focus:border-transparent"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent 
                         text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-[#7127BA] focus:border-transparent"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <textarea
                id="message"
                {...register('message', { required: 'Message is required' })}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent 
                         text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-[#7127BA] focus:border-transparent"
                rows="5"
                placeholder="Your Message"
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                disabled={isLoading}
                type="submit"
                className="px-10 py-2 text-white bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7127BA]"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          src={Illustration}
          className="rounded-lg w-1/2 object-cover h-fit"
          alt="About me"
        />
      </main>
    </>
  )
}

export default Contact
