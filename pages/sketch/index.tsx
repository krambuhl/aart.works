import type { GetStaticProps } from 'next';
import type { File } from 'types/files';

import { FileListing } from 'components/app/FileListing';
import { HtmlTitle } from 'components/shared/HtmlTitle';
import { PageHeader } from 'components/shared/PageHeader';
import { Spacer } from 'components/shared/Spacer';
import { Stack } from 'components/shared/Stack';
import { listDirectory } from 'lib/directory';
import { tokens } from 'tokens';

interface Props {
  entryList: File[];
}

export default function SketchIndex({ entryList }: Props) {
  return (
    <>
      <HtmlTitle title="Sketches" />
      <Stack>
        <PageHeader title="Sketches" />
        <Spacer
          pt={{ xs: tokens.size.x24, sm: tokens.size.x48 }}
          pb={tokens.size.x24}
        >
          <FileListing files={entryList} />
        </Spacer>
      </Stack>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entryList = await listDirectory('pages/sketch/**/*.tsx');

  return {
    props: {
      entryList,
    },
  };
};
