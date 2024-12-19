interface ServiceCardProps {
  title: string
  description: string
  image: {
    public_id: string
    secure_url: string
  }
}

import { motion } from 'framer-motion'

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
}) => {
  console.log('image: ', image)
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-start gap-5 bg-[#2C1250] rounded-lg p-4 border-t-4 border-[#9956d7] w-full text-white"
    >
      <img src={image.secure_url} className="object-cover w-fit" alt="" />
      <div className="flex flex-col items-start justify-start gap-3">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="">{description}</p>
      </div>
    </motion.div>
  )
}

export default ServiceCard
