import type { ComponentProps } from './types';

export function Component({ children, ...props }: ComponentProps) {
  return (
    <div {...props}>
      {children}

      <style jsx>{`
        div {
          /* empty */
        }
      `}</style>
    </div>
  );
}
