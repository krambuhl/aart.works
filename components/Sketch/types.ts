import type { CoreComponent } from 'types/core'
import type { P5CanvasInstance } from 'react-p5-wrapper'

export interface SketchProps extends Omit<CoreComponent, 'children'> {
  setup: (p: P5CanvasInstance, store: any) => void
  draw: (p: P5CanvasInstance, store: any) => void
}
