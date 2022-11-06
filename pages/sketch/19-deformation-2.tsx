import type { MeshProps, ThreeElements } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import type { FrameProps } from 'components/site/Frames/types'

import { PageHeader } from 'components/shared/PageHeader'
import { Stack } from 'components/shared/Stack'
import { HtmlTitle } from 'components/shared/HtmlTitle'
import { tokens } from 'tokens'
import { Area } from 'components/shared/Area'
import { Frames } from 'components/site/Frames'
import { CameraController } from 'components/site/CameraController'
import { Canvas } from 'components/site/Canvas'
import { rainbow } from 'data/colorMaps'

const startingFrame = 1
const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export const meta = {
  title: 'Deformation 2',
  date: '2022-10-18T00:00:00',
}

function Box({ frame, ...props }: MeshProps & FrameProps) {
  const ref = useRef<ThreeElements['mesh']>()
  const [newColor, setNewColor] = useState(rainbow[0])
  const [prevColor, setPrevColor] = useState(rainbow[0])
  const [state, setState] = useState()

  useFrame(() => {
    if (!ref.current) return

    const currentFrame = frame.current / 100

    // ref.current.rotation.x = currentFrame
    // ref.current.rotation.y = currentFrame
    // ref.current.rotation.z = currentFrame

    const { x, y } = ref.current.rotation

    const colorIndex = currentFrame / 10
    const color =
      rainbow[
        Math.floor((Math.abs(colorIndex) * rainbow.length) % rainbow.length)
      ]

    setPrevColor(newColor)
    setNewColor(color)
  })

  const { color } = useSpring({
    to: { color: newColor },
    from: { color: prevColor },
    config: { mass: 5, tension: 200, friction: 150 },
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry attach="geometry" args={[1, 64, 64]} />
      {/* <boxGeometry /> */}
      {/* @ts-ignore */}
      <AnimatedMeshDistortMaterial
        color={color}
        speed={3}
        distort={2}
        radius={0.3}
      />
    </mesh>
  )
}

function Scene() {
  const frame = useRef<number>(startingFrame)

  return (
    <Canvas>
      <CameraController />
      <Frames frame={frame} />

      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} scale={0.9} frame={frame} />
    </Canvas>
  )
}

export default function Output() {
  return (
    <>
      <HtmlTitle title={meta.title} />

      <Stack gap={tokens.size.x24}>
        <PageHeader title={meta.title} date={meta.date} />
        <Area width={tokens.width.x768}>
          <div style={{ border: '0px solid white' }}>
            <Scene />
          </div>
        </Area>
      </Stack>
    </>
  )
}
