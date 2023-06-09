import type { P5Color } from 'types/p5'

import { Sketch } from 'components/app/Sketch'
import { Area } from 'components/shared/Area'
import { HtmlTitle } from 'components/shared/HtmlTitle'
import { Stack } from 'components/shared/Stack'
import { tokens } from 'tokens'
import { WidthToken } from 'types/tokens'

const bgColor: P5Color = [0 / 255, 0 / 255, 0 / 255, 255]
const canvasSizeX = 960
const canvasSizeY = 1280
const aspectRatio = canvasSizeX / canvasSizeY

const sidesX = 3 * 24
const sidesY = 4 * 24

const bandSize = sidesX / 12
const padding = 40
const gutter = -0.5
const sizeX = (canvasSizeX - padding * 2) / sidesX
const sizeY = (canvasSizeY - padding * 2) / sidesY

export const meta = {
  title: 'Detector Quilt',
  date: '2023-04-10T14:00:00',
}

type Cell = [number, number];
type Translate = (c: Cell) => Cell;

const stepSize = 1
const directions = [
  ([x, y]) => [x + stepSize, y],
  ([x, y]) => [x, y + stepSize],
  ([x, y]) => [x - stepSize, y],
  ([x, y]) => [x, y - stepSize],
] as Translate[]
const getNextCell = (i: number) => directions[i % directions.length]

const detectorSize = bandSize
const detectorTranslates = [
  ([x, y]) => [x + detectorSize, y],
  ([x, y]) => [x, y + detectorSize],
  ([x, y]) => [x - detectorSize, y],
  ([x, y]) => [x, y - detectorSize],
] as Translate[]
const getDetectorCell = (i: number) =>
  detectorTranslates[i % detectorTranslates.length]

const rotationTranslates = [
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x - 1, y],
  ([x, y]) => [x, y - 1],
  ([x, y]) => [x + 1, y],
] as Translate[]
const getRotationCell = (i: number) =>
  rotationTranslates[i % rotationTranslates.length]

function spiralGrid(cells: Cell[]) {
  const unwalkedCells = [...cells] as Cell[]
  const walkedCells = [] as Cell[]
  let size = 1 // eslint-disable-line prefer-const
  let isFirstPass = true // eslint-disable-line prefer-const

  function getUnwalkedCellIndex([x, y]: Cell) {
    return unwalkedCells.findIndex(([cx, cy]) => cx === x && cy === y)
  }

  function getWalkedCellIndex([x, y]: Cell) {
    return walkedCells.findIndex(([cx, cy]) => cx === x && cy === y)
  }

  function popCell([x, y]: Cell) {
    const index = getUnwalkedCellIndex([x, y])

    if (index >= 0) {
      const [pop] = unwalkedCells.splice(index, 1)

      return pop
    }
  }

  let currentCell = popCell([0, 0])
  let currentDirIndex = 0

  if (currentCell) {
    walkedCells.push(currentCell)
  }

  while (unwalkedCells.length > 0) {
    let nextCell: Cell | undefined

    while (nextCell === undefined) {
      if (currentCell) {
        const [x, y] = currentCell
        const [nx, ny] = getNextCell(currentDirIndex)(currentCell)
        const [dx, dy] = getDetectorCell(currentDirIndex)(currentCell)

        const nextIndex = getUnwalkedCellIndex([nx, ny])
        const detectorIndex = getWalkedCellIndex([dx, dy])

        if (nextIndex >= 0 && detectorIndex === -1) {
          nextCell = unwalkedCells[nextIndex]
          // size += 1
          // } else if (detectorIndex >= 0) {
        } else {
          const [rx, ry] = getRotationCell(currentDirIndex)([x, y])
          const bandNextIndex = getUnwalkedCellIndex([rx, ry])

          // if (currentDirIndex > 20) {
          //   return walkedCells
          // }

          currentDirIndex += 1
          if (currentDirIndex % 10 === 0) {
            nextCell = unwalkedCells[0]
            currentDirIndex = 0
            isFirstPass = false
          } else if (bandNextIndex >= 0) {
            nextCell = unwalkedCells[bandNextIndex]
          }
        }
      }
    }

    if (!nextCell) {
      return walkedCells
    }

    currentCell = nextCell
    const poppedCell = popCell(nextCell)

    if (poppedCell) {
      walkedCells.push(poppedCell)
    }
  }

  return walkedCells
}

export default function Output() {
  return (
    <>
      <HtmlTitle title={meta.title} />

      <Stack gap={tokens.size.x24}>
        {/* <PageHeader title={meta.title} date={meta.date} /> */}
        <Area width={'700px' as WidthToken}>
          <Sketch
            aspectRatio={aspectRatio}
            setup={(p, store) => {
              p.createCanvas(canvasSizeX, canvasSizeY)
              p.colorMode(p.HSL)

              const grid = Array(sidesX * sidesY)
                .fill(null)
                .map((_, i) => [i % sidesX, Math.floor(i / sidesX)]) as Cell[]

              store.frames = spiralGrid(grid)
            }}
            draw={(p, store) => {
              // reset
              p.clear(...bgColor)
              p.noStroke()

              const start = p.frameCount + 5000
              const length = store.frames.length

              for (let i = 0; i < length; i++) {
                const [fx, fy] = store.frames[i]
                const time = start * 600

                const x = fx * sizeX
                const y = fy * sizeY

                const colorIndex0 =
                  ((i + x * 0.1 * Math.sin(x * i) + time * 0.89) % length) /
                  length
                const colorIndex1 =
                  ((i + y * 2 * Math.cos(y * i) + time) % length) / length

                p.colorMode(p.RGB, 1)
                p.fill(1, colorIndex1, colorIndex0)
                p.rect(
                  x + padding,
                  y + padding,
                  sizeX - gutter,
                  sizeY - gutter
                )
              }
            }}
          />
        </Area>
      </Stack>
    </>
  )
}
