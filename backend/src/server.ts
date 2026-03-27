// src/server.ts

import express from 'express';
import cors from 'cors';
import { prisma } from './database/prisma';
import { CalculatorService } from './services/CalculatorService';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/ping', (req, res) => {
    return res.json({ message: 'Servidor InvestSimulator rodando perfeitamente!' });
});

app.get('/simulations', async (req, res) => {
    try {
        const simulations = await prisma.simulation.findMany({
            orderBy: { createdAt: 'desc' } 
        });
        return res.json(simulations);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar simulações no banco de dados' });
    }
});


app.post('/simulations', async (req, res) => {
  try {
    const { 
      investName, investType, initialValue, 
      monthlyContribution, annualRate, rateType, termMonths 
    } = req.body;

    const result = CalculatorService.simulate({
      initialValue, 
      monthlyContribution, 
      annualRatePercent: annualRate, 
      termMonths
    });
    
    const savedSimulation = await prisma.simulation.create({
      data: {
        investName,
        investType,
        initialValue,
        monthlyContribution,
        annualRate,
        rateType,
        termMonths,
        totalInvested: result.totalInvested,
        estimatedReturn: result.estimatedReturn,
        estimatedProfit: result.estimatedProfit,
      }
    });
   
    return res.status(201).json({
      ...savedSimulation,
      projectionHistory: result.projectionHistory 
    });

  } catch (error) {
    console.error("Erro ao simular:", error);
    return res.status(500).json({ error: 'Erro interno ao processar a simulação.' });
  }
});

app.delete('/simulations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.simulation.delete({
      where: { id }
    });
    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar simulação.' });
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});