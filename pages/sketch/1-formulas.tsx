import { useMemo } from 'react'
import type { FormulaSketchProps } from 'components/site/FormulaSketch/types'

import { FormulaSketch } from 'components/site/FormulaSketch'
import { Area } from 'components/shared/Area'
import { PageHeader } from 'components/shared/PageHeader'
import { Stack } from 'components/shared/Stack'
import { HtmlTitle } from 'components/shared/HtmlTitle'
import { tokens } from 'tokens'
import { AutoGrid } from 'components/shared/Grid'

export const meta = {
  title: 'Formulas',
  date: '2022-04-03',
}

export default function FormulaList() {
  const formulaList = useMemo(() => getFormulas(), [])

  return (
    <>
      <HtmlTitle title={meta.title} />

      <Stack gap={{ xs: tokens.size.x32, sm: tokens.size.x48 }}>
        <PageHeader title={meta.title} date={meta.date} />
        <Area width={tokens.width.x768}>
          <AutoGrid gap={tokens.size.x16} width={tokens.width.x256}>
            {formulaList.map((config, i) => (
              <FormulaSketch key={i} {...config} />
            ))}
          </AutoGrid>
        </Area>
      </Stack>
    </>
  )
}

function getFormulas(): FormulaSketchProps[] {
  return [
    {
      formulaName: 'f(x) = sin(x)',
      formula: (x: number) => Math.sin(x),
    },
    {
      formulaName: 'f(x) = cos(x)',
      formula: (x: number) => Math.cos(x),
    },
    {
      formulaName: 'f(x) = tan(x)',
      formula: (x: number) => Math.tan(x),
      min: -4,
      max: 4,
    },
    {
      formulaName: 'f(x) = log(x)',
      formula: (x: number) => Math.log(x),
      min: 0,
    },
  ]
}
