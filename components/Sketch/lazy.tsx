import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { BodyText } from 'components/Text'

const Loading = styled(BodyText)`
  align-self: center;
`

export const Sketch = dynamic(
  async () => {
    const mod = await import('.')
    return mod.Sketch
  },
  {
    ssr: false,
    loading: () => <Loading size="sm">loading...</Loading>,
  }
)
