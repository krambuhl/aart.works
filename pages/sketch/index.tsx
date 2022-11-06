import type { GetStaticProps } from 'next'
import type { File } from 'types/files'

import { listDirectory } from 'lib/directory'
import { FileListing } from 'components/FileListing'
import { PageHeader } from 'components/PageHeader'
import { Stack } from 'components/Stack'
import { Space } from 'components/Space'
import { HtmlTitle } from 'components/HtmlTitle'
import { tokens } from 'tokens'

interface Props {
  entryList: File[]
}

export default function SketchIndex({ entryList }: Props) {
  return (
    <>
      <HtmlTitle title="Sketches" />
      <Stack>
        <PageHeader title="Sketches" />
        <Space
          pt={{ xs: tokens.size.x24, sm: tokens.size.x48 }}
          pb={tokens.size.x24}
        >
          <FileListing files={entryList} />
        </Space>
      </Stack>
    </>
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
