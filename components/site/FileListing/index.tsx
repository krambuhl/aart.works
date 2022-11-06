import NextLink from 'next/link'
import type { FileListingProps } from './types'
import classNames from 'classnames'
import { useMemo } from 'react'
import styled from 'styled-components'

import { BodyText, HeadingText } from 'components/shared/Text'
import { Area } from 'components/shared/Area'
import { Stack } from 'components/shared/Stack'
import { tokens } from 'tokens'

export function FileListing({ files, className, ...props }: FileListingProps) {
  const fileList = useMemo(() => {
    return files
      .filter(({ name }) => name !== 'index')
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((file) => {
        const date = new Date(file.date)
        return {
          ...file,
          year: date.getFullYear(),
          month: date.getMonth(),
        }
      })
  }, [files])

  return (
    <Area width={tokens.width.x384}>
      <Stack
        gap={{ xs: tokens.size.x6, sm: tokens.size.x12 }}
        className={classNames('file-listing', className)}
        {...props}
      >
        {fileList ? (
          fileList
            .filter(({ name }) => name !== 'index')
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map(({ title, date, url }) => (
              <FileAnchor key={title} href={url}>
                <FileStack
                  gap={tokens.size.x16}
                  direction={{ xs: 'vertical', sm: 'horizontal' }}
                  className="file-listing--stack"
                >
                  <HeadingText
                    as="h3"
                    size="xs"
                    className="file-listing--title"
                  >
                    {title}
                  </HeadingText>

                  <BodyText as="div" size="xs">
                    {new Date(date).toLocaleDateString('en-US')}
                  </BodyText>
                </FileStack>
              </FileAnchor>
            ))
        ) : (
          <div>No Files</div>
        )}
      </Stack>
    </Area>
  );
}

const FileAnchor = styled(NextLink)`
  width: 100%;
`

const FileStack = styled(Stack)`
  justify-content: space-between;
`
