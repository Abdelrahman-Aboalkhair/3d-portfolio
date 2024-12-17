import { Html, useGLTF } from '@react-three/drei'
import useLeva from '../hooks/useLeva'
import SliderCard from '../components/SliderCard'

const MacbookModel = () => {
  const { modelY, modelX, modelZ, sliderX, sliderY, sliderZ } = useLeva()
  const mackbook = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  )

  return (
    <primitive position={[modelX, modelY, modelZ]} object={mackbook.scene}>
      <Html
        className="w-[22rem] flex items-center justify-center"
        position={[sliderX, sliderY, sliderZ]}
      >
        <SliderCard />
      </Html>
    </primitive>
  )
}

export default MacbookModel
