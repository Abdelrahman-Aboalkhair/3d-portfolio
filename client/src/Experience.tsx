import {
  Center,
  ContactShadows,
  Float,
  Html,
  PresentationControls,
  useProgress,
} from '@react-three/drei'
import MacbookModel from './models/MacbookModel'
import useLeva from './hooks/useLeva'
import { Suspense } from 'react'

// Custom Loader Component
const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-center flex flex-col items-center justify-center mx-auto">
        <div className="w-[350px] h-[12px] bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  )
}

const Experience = () => {
  const { lightIntensity } = useLeva()

  return (
    <>
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]} // vertical controls
        azimuth={[-1, 0.75]} // horizontal controls
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.01}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={lightIntensity}
            color={'#fff'}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />

          <Suspense fallback={<Loader />}>
            <MacbookModel />
          </Suspense>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  )
}

export default Experience
