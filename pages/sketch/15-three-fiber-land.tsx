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

export const meta = {
  title: 'Three Fiber Land',
  date: '2022-10-08T00:00:00',
}

function Box(props: MeshProps) {
  const ref = useRef<ThreeElements['mesh']>()
  const [color, setColor] = useState(rainbow[0])

  useFrame(() => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    ref.current!.rotation.x -= props.x * 0.001
    ref.current!.rotation.y += props.y * 0.001
    const colorIndex = ref.current!.rotation.x * ref.current!.rotation.y
    const color = rainbow[Math.floor(Math.abs(colorIndex) % rainbow.length)]
    setColor(color)
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...props} ref={ref}>
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// extend({ OrbitControls })
function Scene() {
  const cellX = Array(25)
    .fill(null)
    .map((_, i) => i)
  const cellY = Array(25)
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
              position={[-3 + 0.25 * x, -3 + 0.25 * y, 0]}
              scale={0.25}
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
