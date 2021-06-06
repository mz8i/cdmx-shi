export type VariableName = "SHI" | "WSI" | "ACI" | "CW_perc" | "CW_sqm";
export type TimeName = "c" | "f";
export type ScenarioName = "w1" | "w2" | "w3";
export type BudgetName = "b0" | "b1" | "b2" | "b3" | "b4";

export interface VariableSpec {
  variable: VariableName;
  time: TimeName;
  scenario: ScenarioName;
  budget: BudgetName;

  fullName: string;
}
