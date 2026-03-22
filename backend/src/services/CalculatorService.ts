export class CalculatorService {

    static simulate(initialValue: number, monthlyContribution: number, annualRatePercent: number, termMonths: number){
    
    // formula: (1 + taxa_anual)^(1/12) - 1
    const monthlyRate = Math.pow(1 + (annualRatePercent / 100), 1 / 12) - 1;

    let currentTotal = initialValue;
    let totalInvested = initialValue;
    const projectionHistory = [];

    projectionHistory.push({
        month: 0,
        invested: totalInvested,
        balance: currentTotal
    });

    for (let month = 1; month <= termMonths; month ++){
        currentTotal += currentTotal * monthlyRate;


        // add o aporte do mes
        currentTotal += monthlyContribution;
        totalInvested += monthlyContribution;
        
        projectionHistory.push({
            month,
            invested: parseFloat(totalInvested.toFixed(2)),
            balance: parseFloat(currentTotal.toFixed(2))
        });

    }

    const estimatedReturn = parseFloat(currentTotal.toFixed(2));
    const totalInvestedRounded = parseFloat(totalInvested.toFixed(2));
    const estimatedProfit = parseFloat((estimatedReturn - totalInvestedRounded).toFixed(2));

    return {
        totalInvested: totalInvestedRounded,
        estimatedReturn,
        estimatedProfit,
        projectionHistory
    };

    }


}