import { useFrame } from '@react-three/fiber'

import { FrameProps } from './types'

export function Frames({ frame }: FrameProps) {
  useFrame(() => {
    frame.current += 1
  })

  return null
}
