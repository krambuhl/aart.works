'use client';

import type { P5Color } from 'types/p5';

import { Sketch } from 'components/app/Sketch';
import { Area } from 'components/shared/Area';
import { HtmlTitle } from 'components/shared/HtmlTitle';
import { PageHeader } from 'components/shared/PageHeader';
import { Stack } from 'components/shared/Stack';
import {
  Black,
  White,
  Viola,
  Lavender,
  Orangina,
  SkyBlue,
  LawnGreen,
  Malachite,
  YellowCab,
  BloodOrange,
  Gray00,
  Gray01,
  Gray02,
  Gray03,
  Gray04,
  Gray05,
  Gray06,
  Gray07,
  Gray08,
  Gray09,
  Gray10,
  Gray11,
  Gray12,
  Gray13,
  Gray14,
  Gray15,
} from 'data/paint';
import { tokens } from 'tokens';

import { walkGrid } from '../../lib/cell-walker';

export const meta = {
  title: 'Walking Buddy',
  date: '2024-12-29T01:00:00',
};

const bw = [Black, White];
const rainbow = [
  Gray15,
  Gray13,
  Gray11,
  Gray09,
  Gray07,
  Gray05,
  Gray03,
  Gray01,
  Gray00,
  Gray02,
  Gray04,
  Gray06,
  Gray08,
  Gray10,
  Gray12,
  Gray14,
  Lavender,
  Orangina,
  Viola,
  SkyBlue,
  LawnGreen,
  Malachite,
  YellowCab,
  BloodOrange,
];

type BlackWhiteColor = (typeof bw)[number];
type RainbowColor = (typeof rainbow)[number];

const bgColor: P5Color = [0 / 255, 0 / 255, 0 / 255, 255];
const ratio = 1 / 1;
const canvasSizeX = 1280;
const canvasSizeY = 1280 * ratio;

const padding = 40;
const gutter = -0.5;

const stepsX = 121;
const stepsY = 121;
const sizeX = (canvasSizeX - padding * 2) / stepsX;
const sizeY = (canvasSizeY - padding * 2) / stepsY;

const spiralGrid = walkGrid({
  gridSize: [stepsX, stepsY],
  initialCell: [0, 0],
  initialDirection: 'right',
});

export default function Output() {
  return (
    <>
      <HtmlTitle title={meta.title} />

      <Stack gap={tokens.space.x24}>
        {/* <PageHeader title={meta.title} date={meta.date} /> */}
        <Area width={tokens.size.x640}>
          <Sketch
            aspectRatio={4 / 5}
            setup={(p) => {
              p.createCanvas(canvasSizeX, canvasSizeY);
              p.noStroke();
            }}
            draw={(p, store) => {
              // reset
              p.clear(...bgColor);

              const start = p.frameCount / 10 + 0.05;

              for (const cellData of spiralGrid) {
                const {
                  cell: [fx, fy],
                } = cellData;

                const x = fx - stepsX / 2;
                const y = fy + stepsY / 2;
                const posX = fx * sizeX;
                const posY = fy * sizeY;

                if (cellData.walked) {
                  const res = (cellData.relative.stepCount + 1) / cellData.relative.totalStepCount;

                  p.colorMode(p.RGB, 1);
                  p.fill([
                    Math.abs(Math.sin(Math.log(res ** start) * Math.sin(x * y) * 1.01)),
                    Math.abs(Math.sin(Math.log(res ** start) * Math.sin(x * y) * 1.02)),
                    Math.abs(Math.sin(Math.log(res ** start) * Math.sin(x * y) * 1.03)),
                  ]);
                } else {
                  const res = cellData.index / cellData.totalCellCount;
                  p.colorMode(p.HSL);
                  p.fill([0, 0, res * 100]);
                }

                p.rect(posX + padding, posY + padding, sizeX - gutter, sizeY - gutter);
              }
            }}
          />
        </Area>
      </Stack>
    </>
  );
}
