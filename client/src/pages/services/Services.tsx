import Layout from '../../layout/Layout'
import { useGetAllServicesQuery } from '../../state/slices/ServiceSlice'
import ServiceCard from '../../components/Services/ServiceCard'
import { motion } from 'framer-motion'
import Loader from '../../components/Loader'

const Services: React.FC = () => {
  const { data, error, isLoading } = useGetAllServicesQuery()
  if (isLoading) return <Loader />
  return (
    <Layout>
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="relative text-start text-[25px] tracking-wider rounded-sm mb-16 font-medium
    before:content-[''] before:absolute before:left-0 before:bottom-[-0.5rem]
    before:h-1 before:w-[3.5rem] before:bg-primary before:rounded-lg w-fit"
      >
        Services
      </motion.h1>

      {isLoading && <p className="text-center">Loading services...</p>}
      {error && (
        <p className="text-center text-red-500">Error fetching services.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data &&
          data?.services?.map(
            (service: {
              id: string
              title: string
              description: string
              image: {
                public_id: string
                secure_url: string
              }
            }) => (
              <ServiceCard
                key={service.id}
                image={service.image}
                title={service.title}
                description={service.description}
              />
            )
          )}
      </div>
    </Layout>
  )
}

export default Services
