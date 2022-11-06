import type { P5Color } from 'types/p5'

import { PageHeader } from 'components/PageHeader'
import { Stack } from 'components/Stack'
import { HtmlTitle } from 'components/HtmlTitle'
import { tokens } from 'tokens'
import { Area } from 'components/Area'
import { Sketch } from 'components/Sketch'
import { rainbow } from 'data/colorMaps'

const baseBg: P5Color = [0 / 255, 0 / 255, 0 / 255, 255]
const canvasSize = 512

// const sides = 41 * 1
// const padding = 32
// const offset = 0

const sides = 29
const padding = 32
const offset = 2

const gutter = -0.5
const size = (canvasSize - padding * 2) / sides

export const meta = {
  title: 'Grid B',
  date: '2022-10-02T00:00:01',
}

export default function Output() {
  return (
    <>
      <HtmlTitle title={meta.title} />

      <Stack gap={tokens.size.x24}>
        <PageHeader title={meta.title} date={meta.date} />
        <Area width={tokens.width.x768}>
          <Sketch
            setup={(p, store) => {
              p.createCanvas(canvasSize, canvasSize, p.WEBGL)
              p.colorMode(p.HSL)

              store.frames = Array(Math.pow(sides, 2))
                .fill(null)
                .map((_, i) => ({
                  x: i % sides,
                  y: Math.floor(i / sides),
                }))
            }}
            draw={(p, store) => {
              // reset
              p.clear(...baseBg)
              p.noStroke()

              const start = p.frameCount
              const length = store.frames.length

              for (let i = 0; i < length; i++) {
                const pos = store.frames[i]
                const time = start / 2000

                const x = pos.x / (pos.y + 1) + time * pos.x
                const y = pos.y / (pos.x + 1) + time * pos.y

                const color = (x + offset) * (y + offset)

                p.fill(p.color(rainbow[Math.floor(color % rainbow.length)]))
                p.rect(
                  (pos.x - sides / 2) * size,
                  (pos.y - sides / 2) * size,
                  size - gutter,
                  size - gutter
                )
              }
            }}
          />
        </Area>
      </Stack>
    </>
  )
}
