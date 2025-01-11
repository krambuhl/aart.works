import type { P5Color } from 'types/p5';

import { Sketch } from 'components/app/Sketch';
import { Area } from 'components/shared/Area';
import { HtmlTitle } from 'components/shared/HtmlTitle';
import { PageHeader } from 'components/shared/PageHeader';
import { Stack } from 'components/shared/Stack';
import { tokens } from 'tokens';
import { SizeToken } from 'types/tokens';

const bgColor: P5Color = [0 / 255, 0 / 255, 0 / 255, 255];
const canvasSizeX = 960;
const canvasSizeY = 1280;
const aspectRatio = canvasSizeX / canvasSizeY;

const sidesX = 3 * 40;
const sidesY = 4 * 40;

const bandSize = sidesX / 6;
const padding = 40;
const gutter = -0.5;
const sizeX = (canvasSizeX - padding * 2) / sidesX;
const sizeY = (canvasSizeY - padding * 2) / sidesY;

export const meta = {
  title: 'Super Quilts Tres',
  date: '2023-04-10T11:00:00',
};

interface Cords {
  x: number;
  y: number;
}

interface Cell extends Cords {
  meta?: object;
}

type Vector = [number, number];

interface BandTranslateProps extends Cords {
  size: number;
}
type BandTranslate = (props: BandTranslateProps) => [number, number];

const jump = 2;
const directions = [
  [jump, 0],
  [0, jump],
  [-jump, 0],
  [0, -jump],
] as Vector[];

const bandTranslates = [
  ({ x, y, size }) => [x - size, y + 1],
  ({ x, y, size }) => [x - 1, y - size],
  ({ x, y, size }) => [x + size, y - 1],
  ({ x, y, size }) => [x + 1, y + size],
] as BandTranslate[];

const rotationTranslates = [
  ({ x, y }) => [x, y + 1],
  ({ x, y }) => [x - 1, y],
  ({ x, y }) => [x, y - 1],
  ({ x, y }) => [x + 1, y],
] as BandTranslate[];

function spiralGrid(cells: Cell[]) {
  const unwalkedCells = [...cells] as Cell[];
  const walkedCells = [] as Cell[];

  function getCellIndex({ x, y }: Cords) {
    return unwalkedCells.findIndex(
      (cell: Cell) => cell.x === x && cell.y === y
    );
  }

  function popCell({ x, y }: Cords) {
    const index = getCellIndex({ x, y });

    if (index >= 0) {
      const [pop] = unwalkedCells.splice(index, 1);

      return pop;
    }
  }

  function getDirection(i: number) {
    return directions[i % directions.length];
  }

  function getBandTranslates(i: number) {
    return bandTranslates[i % bandTranslates.length];
  }

  function getRotationTranslates(i: number) {
    return rotationTranslates[i % rotationTranslates.length];
  }

  let currentCell = popCell({ x: 0, y: 0 });
  let currentDirIndex = 0;
  let currentBandCount = 0;
  let currentSize = 1;

  if (currentCell) {
    walkedCells.push(currentCell);
  }

  while (unwalkedCells.length > 0) {
    let nextCell;

    while (nextCell === undefined) {
      if (currentCell) {
        const { x, y } = currentCell;
        const [dx, dy] = getDirection(currentDirIndex);
        const [nx, ny] = [x + dx, y + dy];
        const nextIndex = getCellIndex({ x: nx, y: ny });

        if (nextIndex >= 0) {
          currentSize += 1;
          nextCell = unwalkedCells[nextIndex];
          nextCell.meta = { direction: [dx, dy] };
        } else {
          if (currentBandCount >= bandSize - 1) {
            const [rx, ry] = getRotationTranslates(currentDirIndex)({
              x,
              y,
              size: currentSize,
            });
            const bandNextIndex = getCellIndex({ x: rx, y: ry });

            currentDirIndex += 1;
            currentBandCount = 0;

            if (bandNextIndex >= 0) {
              nextCell = unwalkedCells[bandNextIndex];
              nextCell.meta = { direction: [dx, dy], rotation: [rx, ry] };
            }
            // return walkedCells
          } else {
            const [bx, by] = getBandTranslates(currentDirIndex)({
              x,
              y,
              size: currentSize - 1,
            });

            const bandNextIndex = getCellIndex({ x: bx, y: by });
            currentBandCount += 1;

            if (bandNextIndex >= 0) {
              nextCell = unwalkedCells[bandNextIndex];
              nextCell.meta = { direction: [dx, dy] };
            } else {
              nextCell = unwalkedCells[0];
              nextCell.meta = { direction: [dx, dy], translate: [bx, by] };
              if (!nextCell) {
                return walkedCells;
              }
            }
          }

          currentSize = 1;
        }
      }
    }

    currentCell = nextCell;
    const poppedCell = popCell(nextCell);
    if (poppedCell) {
      walkedCells.push(poppedCell);
    }
  }

  return walkedCells;
}

export default function Output() {
  return (
    <>
      <HtmlTitle title={meta.title} />

      <Stack gap={tokens.size.x24}>
        {/* <PageHeader title={meta.title} date={meta.date} /> */}
        <Area width={'700px' as SizeToken}>
          <Sketch
            aspectRatio={aspectRatio}
            setup={(p, store) => {
              p.createCanvas(canvasSizeX, canvasSizeY);
              p.colorMode(p.HSL);

              const grid = Array(sidesX * sidesY)
                .fill(null)
                .map((_, i) => ({
                  x: i % sidesX,
                  y: Math.floor(i / sidesX),
                  meta: {},
                }));

              store.frames = spiralGrid(grid);
            }}
            draw={(p, store) => {
              // reset
              p.clear(...bgColor);
              p.noStroke();

              const start = p.frameCount + 1000;
              const length = store.frames.length;

              for (let i = 0; i < length; i++) {
                const frame = store.frames[i];
                const time = start * 0.002;

                const x = frame.x * sizeX;
                const y = frame.y * sizeY;

                const colorIndex0 = (((i + x) * time * 3.4) % length) / length;
                const colorIndex1 = (((i + y) * time * 5) % length) / length;

                p.colorMode(p.RGB, 1);
                p.fill(1, colorIndex0, colorIndex1);
                p.rect(
                  x + padding,
                  y + padding,
                  sizeX - gutter,
                  sizeY - gutter
                );
              }
            }}
          />
        </Area>
      </Stack>
    </>
  );
}
