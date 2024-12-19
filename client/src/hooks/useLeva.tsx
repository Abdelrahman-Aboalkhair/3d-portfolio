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
  } = useControls(
    'Macbook',
    {
      modelY: { value: -0.8, min: -2, max: 5, step: 0.1 },
      modelX: { value: 0.4, min: -2, max: 5, step: 0.1 },
      modelZ: { value: 0.9, min: -2, max: 5, step: 0.1 },
      lightIntensity: { value: 74, min: 0, max: 100, step: 1 },
      sliderX: { value: -2.28, min: -20, max: 5, step: 0.01 },
      sliderY: { value: 0.65, min: -2, max: 5, step: 0.01 },
      sliderZ: { value: -5.72, min: -10, max: 5, step: 0.01 },
      slideRotateX: { value: 0, min: -10, max: 5, step: 0.01 },
      slideRotateY: { value: 0, min: -10, max: 5, step: 0.01 },
      slideRotateZ: { value: 0, min: -10, max: 5, step: 0.01 },
    },
    {
      collapsed: true,
      color: '#7127ba',
    }
  )
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
