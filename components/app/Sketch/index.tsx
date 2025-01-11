import type { SketchProps } from './types';
import type P5 from 'p5';
import type { P5CanvasInstance, Sketch as SketchType } from 'react-p5-wrapper';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { BodyText } from 'components/shared/Text';
import { tokens } from 'tokens';

const Loading = styled(BodyText)`
  align-self: center;
`;

const StyledSketch = styled.div<{ aspectRatio?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  aspect-ratio: ${(props) => props.aspectRatio ?? 1};
  height: min-content;

  canvas {
    display: block;
    height: auto !important;
    width: 100% !important;
    background-color: black;
  }
`;

const SketchWrapper = dynamic(
  async () => {
    const mod = await import('react-p5-wrapper');

    return mod.ReactP5Wrapper;
  },
  {
    ssr: false,
    loading: () => <Loading size="sm">loading...</Loading>,
  }
);

export function Sketch({ setup, draw, aspectRatio, ...props }: SketchProps) {
  const [isStarted, setStarted] = useState(false);

  const sketch: SketchType = useCallback(
    (p: P5) => {
      const store = new Map();

      p.setup = () => {
        p.frameRate(60);
        isStarted && setup && setup(p, store);
      };

      p.draw = () => {
        setStarted(true);
        isStarted && draw && draw(p, store);
      };
    },
    [isStarted, setup, draw]
  );

  return (
    <StyledSketch aspectRatio={aspectRatio} {...props}>
      <SketchWrapper sketch={sketch} />
    </StyledSketch>
  );
}
