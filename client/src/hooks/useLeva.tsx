import { useControls } from 'leva'

export default function useLeva() {
  const {
    modelY,
    modelX,
    modelZ,
    lightIntensity,
    sliderX,
    sliderY,
    sliderZ,
    slideRotateX,
    slideRotateY,
    slideRotateZ,
  } = useControls('Macbook', {
    modelY: { value: -1.5, min: -2, max: 5, step: 0.1 },
    modelX: { value: 0.9, min: -2, max: 5, step: 0.1 },
    modelZ: { value: 0.9, min: -2, max: 5, step: 0.1 },
    lightIntensity: { value: 74, min: 0, max: 100, step: 1 },
    sliderX: { value: -1.91, min: -20, max: 5, step: 0.01 },
    sliderY: { value: 1.21, min: -2, max: 5, step: 0.01 },
    sliderZ: { value: -5.72, min: -10, max: 5, step: 0.01 },
    slideRotateX: { value: 0, min: -10, max: 5, step: 0.01 },
    slideRotateY: { value: 0, min: -10, max: 5, step: 0.01 },
    slideRotateZ: { value: 0, min: -10, max: 5, step: 0.01 },
  })
  return {
    modelY,
    modelX,
    modelZ,
    lightIntensity,
    sliderX,
    sliderY,
    sliderZ,
    slideRotateX,
    slideRotateY,
    slideRotateZ,
  }
}
