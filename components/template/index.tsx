import type { ComponentProps } from './types'

export function Component({ children, className, ...props }: ComponentProps) {
  return (
    <div {...props}>
      {children}

      <style jsx>{`
        div {
          /* empty */
        }
      `}</style>
    </div>
  )
}
