import { AriaAttributes } from 'react'

export interface CoreComponent extends React.HTMLAttributes<HTMLElement>, AriaAttributes {
  className?: string
  children: React.ReactNode | string
}
