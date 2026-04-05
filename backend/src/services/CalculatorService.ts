
export interface SimulationDTO {
  initialValue: number;
  monthlyContribution: number;
  annualRatePercent: number;
  termMonths: number;
}

export class CalculatorService {
  
  private static round(value: number): number {
    return parseFloat(value.toFixed(2));
  }

  static simulate({ initialValue, monthlyContribution, annualRatePercent, termMonths }: SimulationDTO) {
    const monthlyRate = Math.pow(1 + (annualRatePercent / 100), 1 / 12) - 1;

    let currentTotal = initialValue;
    let totalInvested = initialValue;
    const projectionHistory = [];

    projectionHistory.push({
      month: 0,
      invested: this.round(totalInvested),
      balance: this.round(currentTotal)
    });

    for (let month = 1; month <= termMonths; month++) {
      currentTotal += currentTotal * monthlyRate;
      currentTotal += monthlyContribution;
      totalInvested += monthlyContribution;
      
      projectionHistory.push({
        month,
        invested: this.round(totalInvested),
        balance: this.round(currentTotal)
      });
    }

    const estimatedReturn = this.round(currentTotal);
    const totalInvestedRounded = this.round(totalInvested);
    const estimatedProfit = this.round(estimatedReturn - totalInvestedRounded);

    return {
      totalInvested: totalInvestedRounded,
      estimatedReturn,
      estimatedProfit,
      projectionHistory
    };
  }
}