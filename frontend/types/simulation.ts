export interface HistoryEntry {
  month: number;
  balance: number;
}

export interface SimulationResult {
  totalInvested: number;
  estimatedReturn: number;
  estimatedProfit: number;
  projectionHistory: HistoryEntry[];
}

export type NumericOrEmpty = number | '';
