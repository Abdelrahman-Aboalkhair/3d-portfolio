interface ServiceCardProps {
  name: string
  description: string
  price: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  gitHubLink,
  liveLink,
  technologies,
}) => {
  console.log('image: ', image)
  return (
    <div className="border rounded-lg p-4 shadow-md flex items-start justify-start gap-3 w-full">
      <div className="flex flex-col gap-3 items-center justify-center ">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        {technologies.map((tech, index) => (
          <span key={index} className="mx-2">
            {tech}
          </span>
        ))}
      </div>
      {image && (
        <img
          src={image?.secure_url}
          className="object-cover"
          alt="Project Image"
        />
      )}
    </div>
  )
}

export default ServiceCard
