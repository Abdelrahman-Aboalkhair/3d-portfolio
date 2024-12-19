import { motion } from 'framer-motion'
import Abstract from '../../assets/abstract.png'

interface ServiceCardProps {
  title: string
  description: string
  image: {
    public_id: string
    secure_url: string
  }
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <>
      <img
        src={Abstract}
        className="absolute top-[25%] right-[30%] z-[-1000] w-[37rem] blur-[90px] opacity-[15%]"
        alt=""
      />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileHover={{ scale: 1.05 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-start gap-5 bg-[#b489f0]/30 backdrop-blur-lg hover:cursor-pointer dark:bg-[#2C1250]/30 rounded-lg p-4 
                    border-t-[8px] border-[#cca3f6] dark:border-[#6f32a7] w-full text-white"
      >
        <img src={image.secure_url} className="object-cover w-fit" alt="" />
        <div className="flex flex-col items-start justify-start gap-3">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            {title}
          </h2>
          <p className="text-[15px] text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      </motion.div>
    </>
  )
}

export default ServiceCard
