import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import toast from 'react-hot-toast'
import { useState } from 'react'
import Layout from '../../layout/Layout'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: unknown) => {
    setIsLoading(true)
    try {
      await dispatch(register(data))
      toast.success('User registered successfully!')
    } catch (error) {
      setIsLoading(false)
      toast.error(error?.data?.message || 'Registration failed!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-auto mt-[6%]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">
          Sign Up
        </h2>
        <div className="mt-4">
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: 'Invalid email address',
              },
            })}
            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-primary dark:bg-blue-600 rounded-md hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <div className="flex items-center justify-between py-3">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?
          </p>
          <Link
            className="text-primary hover:underline dark:text-blue-400"
            to={'/sign-in'}
          >
            Sign In
          </Link>
        </div>
      </form>
    </Layout>
  )
}

export default SignUp
