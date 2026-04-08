import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './database/prisma';
import { CalculatorService } from './services/CalculatorService';

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'invest_simulator_123456';

export interface AuthRequest extends Request {
  userId?: string;
}

// --- MIDDLEWARE DE AUTENTICAÇÃO (O "Segurança" da API) ---
function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O header vem como "Bearer <token>". Vamos pegar só o token.
  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.userId = decoded.id; // Anexamos o ID do usuário na requisição
    return next(); // Pode passar!
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
}

// ROTA DE CADASTRO
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }

    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ error: 'Email já cadastrado.' });

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Usuário não encontrado.' });

    // Verifica se a senha digitada bate com a criptografada no banco
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ error: 'Senha incorreta.' });

    // Gera o "crachá" (Token) com validade de 1 dia
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});


// GET: Busca apenas as simulações DO USUÁRIO LOGADO
app.get('/simulations', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const simulations = await prisma.simulation.findMany({
      where: { userId: req.userId }, // <-- Filtro de segurança!
      orderBy: { createdAt: 'desc' }
    });
    return res.json(simulations);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar histórico.' });
  }
});

// POST: Cria a simulação vinculada ao USUÁRIO LOGADO
app.post('/simulations', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { 
      investName, investType, initialValue, 
      monthlyContribution, annualRate, rateType, termMonths 
    } = req.body;

    const result = CalculatorService.simulate({
      initialValue, monthlyContribution, annualRatePercent: annualRate, termMonths
    });
    
    const savedSimulation = await prisma.simulation.create({
      data: {
        investName, investType, initialValue, monthlyContribution,
        annualRate, rateType, termMonths,
        totalInvested: result.totalInvested,
        estimatedReturn: result.estimatedReturn,
        estimatedProfit: result.estimatedProfit,
        userId: req.userId! // <-- Salvamos quem é o dono!
      }
    });
   
    return res.status(201).json({ ...savedSimulation, projectionHistory: result.projectionHistory });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao processar a simulação.' });
  }
});

// DELETE: Deleta a simulação verificando se o dono é o usuário logado
app.delete('/simulations/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Verifica se a simulação existe e se pertence ao cara logado
    const simulation = await prisma.simulation.findUnique({ where: { id } });
    if (!simulation || simulation.userId !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado ou simulação não existe.' });
    }

    await prisma.simulation.delete({ where: { id } });
    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar simulação.' });
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor Seguro rodando na porta http://localhost:${PORT}`);
});