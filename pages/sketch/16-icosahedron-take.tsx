import type {
  MeshProps,
  ThreeElements,
} from '@react-three/fiber'

import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

import { Canvas } from 'components/app/Canvas'
import { Area } from 'components/shared/Area'
import { HtmlTitle } from 'components/shared/HtmlTitle'
import { PageHeader } from 'components/shared/PageHeader'
import { Stack } from 'components/shared/Stack'
import { rainbow } from 'data/colorMaps'
import { tokens } from 'tokens'

const size = 35

export const meta = {
  title: 'Icosahedron Take',
  date: '2022-10-08T00:00:01',
}

function Box(props: MeshProps) {
  const ref = useRef<ThreeElements['mesh']>()
  const [color, setColor] = useState(rainbow[0])

  useFrame(() => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    ref.current!.rotation.x -= (size - props.x) * 0.0005
    ref.current!.rotation.y += (size - props.y) * 0.0005
    const x = ref.current!.rotation.x
    const y = ref.current!.rotation.y
    const colorIndex = (Math.sin(x) + Math.cos(y)) * rainbow.length
    const color = rainbow[Math.floor(Math.abs(colorIndex) % rainbow.length)]
    setColor(color)
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...props} ref={ref}>
      <icosahedronGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// extend({ OrbitControls })
function Scene() {
  const cellX = Array(size)
    .fill(null)
    .map((_, i) => i)
  const cellY = Array(size)
    .fill(null)
    .map((_, i) => i)

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {cellX.map((_, x) => {
        return cellY.map((_, y) => {
          return (
            <Box
              key={`${x}${y}`}
              position={[-3 + 0.175 * x, -3 + 0.175 * y, 0]}
              scale={0.15}
              x={x}
              y={y}
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
          <Scene />
        </Area>
      </Stack>
    </>
  )
}
