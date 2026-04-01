-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Simulation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
