import type { PageHeaderProps } from './types';

import { Stack } from 'components/shared/Stack';
import { DataText, HeadingText } from 'components/shared/Text';
import { tokens } from 'tokens';

export function PageHeader({
  title,
  subtitle,
  date,
  ...props
}: PageHeaderProps) {
  return (
    <Stack
      as="header"
      gap={{
        xs: tokens.size.x8,
        sm: tokens.size.x12,
      }}
      justify="center"
      {...props}
    >
      <HeadingText as="h1" size={{ xs: 'lg', sm: 'xl' }}>
        {title}
      </HeadingText>

      {subtitle && (
        <HeadingText as="h2" size="md">
          {subtitle}
        </HeadingText>
      )}

      {date && (
        <DataText as="div" size="xs">
          {new Date(date)?.toLocaleDateString() ?? '—'}
        </DataText>
      )}
    </Stack>
  );
}
