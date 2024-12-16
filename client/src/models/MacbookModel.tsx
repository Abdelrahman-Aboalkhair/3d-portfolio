import { Html, useGLTF } from '@react-three/drei'
import useLeva from '../hooks/useLeva'
import Services from '../pages/services/Services'
import SliderCard from '../components/SliderCard'

const MacbookModel = () => {
  const {
    modelY,
    modelX,
    modelZ,
    sliderX,
    sliderY,
    sliderZ,
    slideRotateX,
    slideRotateY,
    slideRotateZ,
  } = useLeva()
  const mackbook = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  )

  return (
    <primitive
      // rotation={[slideRotateX, slideRotateY, slideRotateZ]}
      position={[modelX, modelY, modelZ]}
      object={mackbook.scene}
    >
      <Html className="w-[22rem]" position={[sliderX, sliderY, sliderZ]}>
        <SliderCard />
      </Html>
    </primitive>
  )
}

export default MacbookModel
