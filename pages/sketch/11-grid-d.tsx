import { PageHeader } from 'components/PageHeader'
import { Stack } from 'components/Stack'
import { HtmlTitle } from 'components/HtmlTitle'
import { tokens } from 'tokens'
import { Area } from 'components/Area'
import { GridSketch } from 'components/GridSketch'
import { rainbow } from 'data/colorMaps'

export const meta = {
  title: 'Grid D',
  date: '2022-10-03T00:00:00',
}

export default function Output() {
  return (
    <>
      <HtmlTitle title={meta.title} />

      <Stack gap={tokens.size.x24}>
        <PageHeader title={meta.title} date={meta.date} />
        <Area width={tokens.width.x768}>
          <GridSketch
            bg={[0 / 255, 0 / 255, 0 / 255, 255]}
            canvasSize={512}
            sides={29}
            padding={32}
            fill={(pos, frame) => {
              const time = frame / 250

              const x = pos.x + time
              const y = pos.y

              const colorIndex = x ^ (y - x * time)

              return rainbow[Math.floor(Math.abs(colorIndex) % rainbow.length)]
            }}
          />
        </Area>
      </Stack>
    </>
  )
}
