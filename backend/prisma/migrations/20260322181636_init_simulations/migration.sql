-- CreateTable
CREATE TABLE "Simulation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "investName" TEXT NOT NULL,
    "investType" TEXT NOT NULL,
    "initialValue" REAL NOT NULL,
    "monthlyContribution" REAL NOT NULL,
    "annualRate" REAL NOT NULL,
    "rateType" TEXT NOT NULL,
    "termMonths" INTEGER NOT NULL,
    "totalInvested" REAL NOT NULL,
    "estimatedReturn" REAL NOT NULL,
    "estimatedProfit" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
