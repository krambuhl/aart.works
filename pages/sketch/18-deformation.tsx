import type { MeshProps, ThreeElements } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import type { FrameProps } from 'components/Frames/types'

import { PageHeader } from 'components/PageHeader'
import { Stack } from 'components/Stack'
import { HtmlTitle } from 'components/HtmlTitle'
import { tokens } from 'tokens'
import { Area } from 'components/Area'
import { Frames } from 'components/Frames'
import { CameraController } from 'components/CameraController'
import { Canvas } from 'components/Canvas'
import { rainbow } from 'data/colorMaps'

const startingFrame = 1

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
const AnimatedShape = animated(Sphere)

export const meta = {
  title: 'Deformation',
  date: '2022-10-17T00:00:00',
}

function Box({ frame, ...props }: MeshProps & FrameProps) {
  const ref = useRef<ThreeElements['mesh']>()
  const [newColor, setNewColor] = useState(rainbow[0])
  const [prevColor, setPrevColor] = useState(rainbow[0])
  const [state, setState] = useState()

  useFrame(() => {
    if (!ref.current) return

    const currentFrame = frame.current / 100

    ref.current.rotation.x = currentFrame
    ref.current.rotation.y = currentFrame
    ref.current.rotation.z = currentFrame

    const { x, y } = ref.current.rotation

    const colorIndex = (x + y) / 10
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
      {/* @ts-ignore */}
      <AnimatedShape args={[1.5, 144, 144]}>
        <AnimatedMeshDistortMaterial
          color={color}
          speed={2}
          distort={0.5}
          radius={1.1}
        />
      </AnimatedShape>
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
      <Box position={[0, 0, 0]} scale={1} frame={frame} />
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
