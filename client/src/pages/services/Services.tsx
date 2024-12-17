import Layout from '../../layout/Layout'
import { useGetAllServicesQuery } from '../../state/slices/ServiceSlice'
import ServiceCard from '../../components/Services/ServiceCard'

const Services: React.FC = () => {
  const { data, error, isLoading } = useGetAllServicesQuery()
  console.log('data: ', data)
  if (isLoading) return <div>Loading...</div>
  return (
    <Layout>
      <h1
        className="relative text-start text-3xl mb-8 font-medium
       before:content-[''] before:absolute before:left-0 before:top-0 before:h-[2.5rem] before:w-1 before:bg-primary before:rounded-lg pl-[20px]"
      >
        Services
      </h1>

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
