import { Area } from 'components/shared/Area'
import { HtmlTitle } from 'components/shared/HtmlTitle'
import { PageHeader } from 'components/shared/PageHeader'
import { Stack } from 'components/shared/Stack'
import { GridSketch } from 'components/site/GridSketch'
import { rainbow } from 'data/colorMaps'
import { tokens } from 'tokens'

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
