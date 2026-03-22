import express from 'express';
import cors from 'cors';
import { prisma } from './database/prisma';
import { CalculatorService } from './services/CalculatorService';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
    return res.json({ message: 'Servidor InvestSImulator rodando perfeitamente!'});
});

app.get('/simulations', async (req, res) => {
    try{
        const simulations = await prisma.simulation.findMany();
        return res.json(simulations);
    } catch (error) {

        return res.status(500).json({error: 'Erro ao buscar simulações no banco de dados'});

    }
});


//rota 1 para criar simulacao, calcular e salvar no banco
app.post('/simulations', async (req, res) => {
  try {
    const { 
      investName, investType, initialValue, 
      monthlyContribution, annualRate, rateType, termMonths 
    } = req.body;

   
    const result = CalculatorService.simulate(
      initialValue, 
      monthlyContribution, 
      annualRate, 
      termMonths
    );

    
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


// rota 2 get para buscar o histórico com o intuito de montar a tabela do dashboard
app.get('/simulations', async (req, res) => {
  try {
    const simulations = await prisma.simulation.findMany({
      orderBy: { createdAt: 'desc' } // Traz as mais recentes primeiro
    });
    return res.json(simulations);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar histórico.' });
  }
});


// rota delete para o botão de lixeira no frontend
app.delete('/simulations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.simulation.delete({
      where: { id }
    });
    return res.status(204).send(); // 204 = No Content (Sucesso, sem corpo)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar simulação.' });
  }
});


const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {

    console.log (`Servidor rodando na porta http://localhost:${PORT}`);
});