import type { GetStaticProps } from 'next'
import type { File } from 'types/files'

import { FileListing } from 'components/app/FileListing'
import { PageHeader } from 'components/shared/PageHeader'
import { Space } from 'components/shared/Space'
import { Stack } from 'components/shared/Stack'
import { listDirectory } from 'lib/directory'
import { tokens } from 'tokens'

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
