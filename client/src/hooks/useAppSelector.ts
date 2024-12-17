import { useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '../state/store'

// Create a typed version of the `useSelector` hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
