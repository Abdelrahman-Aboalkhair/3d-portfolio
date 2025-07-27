import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { login } from '../../state/slices/AuthSlice'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../../layout/Layout'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: unknown) => {
    console.log('data: ', data)
    setIsLoading(true)
    try {
      await dispatch(login(data))
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast.error(error?.data?.message || 'Login failed!')
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
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-100">
          Sign In
        </h2>
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
                : 'border-gray-300 focus:ring-primary'
            } dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600`}
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
                : 'border-gray-300 focus:ring-primary'
            } dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-primary rounded-md hover:opacity-90 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="flex items-center justify-between py-3">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?
          </p>
          <Link
            className="text-primary hover:underline dark:text-blue-400"
            to={'/sign-up'}
          >
            Sign up
          </Link>
        </div>
      </form>
    </Layout>
  )
}

export default SignIn
