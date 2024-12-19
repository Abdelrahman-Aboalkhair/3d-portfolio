import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useCreateServiceMutation } from '../../state/slices/ServiceSlice'
import toast from 'react-hot-toast'

const CreateService = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [imagePreview, setImagePreview] = useState(null)
  const [createService, { isLoading }] = useCreateServiceMutation()

  const onSubmit = async (data) => {
    console.log('data: ', data)
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    if (data.image[0]) {
      formData.append('image', data.image[0])
    }

    try {
      await createService(formData).unwrap()
      toast.success('Service created successfully!')
      closeModal()
    } catch (error) {
      console.error('Error creating service:', error)
      toast.error('Error creating service')
    }
  }

  const handleImagePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Service</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        encType="multipart/form-data"
      >
        {/* Service title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Service Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Service title is required' })}
            className="border-2 border-gray-300 dark:border-gray-700 rounded-md p-3 w-full bg-white dark:bg-gray-900"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Service Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register('description', {
              required: 'Description is required',
            })}
            className="border-2 border-gray-300 dark:border-gray-700 rounded-md p-3 w-full bg-white dark:bg-gray-900"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium my-2">
            Upload Service Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register('image')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-200 dark:file:bg-gray-700 file:text-gray-700 dark:file:text-gray-300 hover:file:bg-gray-300 dark:hover:file:bg-gray-600"
            onChange={handleImagePreview}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover border border-gray-300 rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:opacity-80 text-white py-2 px-4 rounded-md capitalize font-semibold"
        >
          {isLoading ? 'Submitting...' : 'Create Service'}
        </button>
      </form>
    </div>
  )
}

export default CreateService
