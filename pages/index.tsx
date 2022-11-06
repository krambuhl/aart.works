import type { GetStaticProps } from 'next'
import type { File } from 'types/files'

import { listDirectory } from 'lib/directory'
import { FileListing } from 'components/FileListing'
import { PageHeader } from 'components/PageHeader'
import { Stack } from 'components/Stack'
import { tokens } from 'tokens'
import { Space } from 'components/Space'

interface Props {
  entryList: File[]
}

export default function SketchIndex({ entryList }: Props) {
  return (
    <Stack>
      <PageHeader title="Sketches" />
      <Space
        pt={{ xs: tokens.size.x24, sm: tokens.size.x48 }}
        pb={tokens.size.x24}
      >
        <FileListing files={entryList} />
      </Space>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entryList = await listDirectory('pages/sketch/**/*.tsx')

  return {
    props: {
      entryList,
    },
  }
}
