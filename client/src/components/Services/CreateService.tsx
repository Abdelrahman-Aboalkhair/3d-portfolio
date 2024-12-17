import { useForm } from 'react-hook-form'

const CreateService = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: unknown) => {
    console.log('New Project Data:', data)
    // Handle submission logic here
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Project Name */}
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium mb-2"
          >
            Service Title
          </label>
          <input
            id="projectName"
            type="text"
            {...register('projectName', {
              required: 'Project name is required',
            })}
            className="border-2 border-gray-600 rounded-md p-[12px] w-full bg-transparent"
          />
          {errors?.projectName && (
            <p className="text-red-600 text-sm">
              {errors.projectName.toString()}
            </p>
          )}
        </div>

        {/* Project Description */}
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
            className="border-2 border-gray-600 rounded-md p-2 w-full bg-transparent"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">
              {errors?.description?.toString()}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary hover:opacity-80 text-white py-2 px-4 rounded-md capitalize font-semibold"
        >
          Create Service
        </button>
      </form>
    </div>
  )
}

export default CreateService
