import { OrbitControls } from '@react-three/drei'

const Experience = () => {
  return (
    <>
      <OrbitControls />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshNormalMaterial />
      </mesh>

      <ambientLight intensity={0.5} />
    </>
  )
}

export default Experience
