export type Formula = (x: number) => number;

export interface FormulaSketchProps {
  formulaName: string;
  formula: Formula;
  min?: number;
  max?: number;
}
