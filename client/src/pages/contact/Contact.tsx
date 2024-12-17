import { useForm } from 'react-hook-form'
import Layout from '../../layout/Layout'

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log('Form Data:', data)
  }

  return (
    <Layout>
      <div
        name="contact"
        className="flex flex-col items-center justify-center px-4 py-8"
      >
        <h1 className="text-center text-2xl font-bold mb-6">Contact</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg p-6 border rounded-lg bg-transparent backdrop-blur-md shadow-md
                     border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
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
                {errors.name.toString()}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
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
                {errors.email.toString()}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
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
                {errors.message.toString()}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-[#7127BA] hover:bg-[#9C4DCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7127BA]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Contact
