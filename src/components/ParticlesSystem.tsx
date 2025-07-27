import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ParticleSystem = () => {
  const mesh: any = useRef();

  // Create particles
  const positions = useMemo(() => {
    const positions = new Float32Array(1500 * 3);

    for (let i = 0; i < 1500; i++) {
      // Random positions in a large sphere around the scene
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }

    return positions;
  }, []);

  // Animate particles
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime;
      const positions = mesh.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time * 0.5 + i) * 0.002;
        positions[i + 1] += Math.cos(time * 0.3 + i) * 0.002;
        positions[i + 2] += Math.sin(time * 0.4 + i) * 0.001;
      }

      mesh.current.geometry.attributes.position.needsUpdate = true;
      mesh.current.rotation.y = time * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1500}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="white"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleSystem;
