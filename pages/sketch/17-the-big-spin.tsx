import type { MeshProps, ThreeElements } from '@react-three/fiber'

import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { OrbitControls } from 'three-stdlib'

import { Canvas } from 'components/app/Canvas'
import { Area } from 'components/shared/Area'
import { HtmlTitle } from 'components/shared/HtmlTitle'
import { PageHeader } from 'components/shared/PageHeader'
import { Stack } from 'components/shared/Stack'
import { rainbow } from 'data/colorMaps'
import { tokens } from 'tokens'

const startingFrame = 1
const size = 51
const scale = (3.05 / size) * 2
const offset = (3.05 / size) * 2
const speed = 1 / 400

export const meta = {
  title: 'The Big Spin',
  date: '2022-10-09T00:00:00',
}

interface FrameProps {
  frame: React.MutableRefObject<number>
}

function CameraController() {
  const { camera, gl } = useThree()
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.minDistance = 3
    controls.maxDistance = 20

    return () => {
      controls.dispose()
    }
  }, [camera, gl])

  return null
}

function Frames({ frame }: FrameProps) {
  useFrame(() => {
    frame.current += speed
  })

  return null
}

function Box(props: MeshProps & FrameProps) {
  const ref = useRef<ThreeElements['mesh']>()
  const [color, setColor] = useState(rainbow[0])

  const x1 = props.x + 0 - size / 2
  const y1 = props.y + 0 - size / 2
  const sx = x1 / (size + 1)
  const sy = y1 / (size + 1)

  useFrame(() => {
    const frame = props.frame.current

    if (!ref.current) {
      return
    }

    ref.current.rotation.x = frame * 2 * sx
    ref.current.rotation.y = frame * 2 * sy

    const { x, y } = ref.current.rotation

    const colorIndex = Math.tan(x) + Math.tan(y) - frame * 4 * 2 * Math.PI + 0
    const color =
      rainbow[
        Math.floor((Math.abs(colorIndex) * rainbow.length) % rainbow.length)
      ]

    setColor(color)
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...props} ref={ref}>
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Scene() {
  const frame = useRef<number>(startingFrame)

  const cellX = Array(size)
    .fill(null)
    .map((_, i) => i)
  const cellY = Array(size)
    .fill(null)
    .map((_, i) => i)

  return (
    <Canvas>
      <CameraController />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Frames frame={frame} />
      {cellX.map((_, x) => {
        return cellY.map((_, y) => {
          return (
            <Box
              key={`${x}${y}`}
              position={[-3 + offset * x, -3 + offset * y, 0]}
              scale={scale}
              x={x}
              y={y}
              frame={frame}
            />
          )
        })
      })}
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
