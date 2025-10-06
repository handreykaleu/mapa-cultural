import express, { Express } from 'express';
import 'dotenv/config';
import mainRouter from './routes/indexRoutes'; 
import { setupSwagger } from './swagger'; 
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const app: Express = express();

// Store em memória para fins de desenvolvimento / teste
const eventos: any[] = [];

// Middlewares
app.use(express.json());

app.post('/eventos', (req, res) => {
  console.log('Dados recebidos no corpo da requisição:', req.body);

  const { nome, data } = req.body;
  if (!nome || !data) {
    return res.status(400).json({ 
      error: 'Os campos "nome" e "data" são obrigatórios.' 
    });
  }

  const newEvent = {
    id: Date.now(),
    ...req.body
  };

  eventos.push(newEvent);

  res.status(201).json(newEvent);
});

app.get('/eventos', (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const ev = eventos.find(e => String(e.id) === String(id));
      if (!ev) return res.status(404).json({ error: 'Evento não encontrado.' });
      return res.json(ev);
    }

    res.json(eventos);
  } catch (error) {
    console.error('Erro ao obter eventos:', error);
    res.status(500).json({ error: 'Erro interno ao obter eventos.' });
  }
});

app.put('/eventos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const idx = eventos.findIndex(e => String(e.id) === String(id));
    if (idx === -1) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'É necessário enviar ao menos um campo para atualizar.' });
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'nome') && !req.body.nome) {
      return res.status(400).json({ error: 'O campo "nome" não pode ser vazio.' });
    }
    if (Object.prototype.hasOwnProperty.call(req.body, 'data') && !req.body.data) {
      return res.status(400).json({ error: 'O campo "data" não pode ser vazio.' });
    }

    const updatedEvent = {
      ...eventos[idx],
      ...req.body,
      id: eventos[idx].id 
    };

    eventos[idx] = updatedEvent;
    console.log(`Evento ${id} atualizado:`, updatedEvent);
    res.json(updatedEvent);
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar evento.' });
  }
});

app.delete('/eventos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const idx = eventos.findIndex(e => String(e.id) === String(id));
    if (idx === -1) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    eventos.splice(idx, 1);
    console.log(`Evento ${id} removido.`);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    res.status(500).json({ error: 'Erro interno ao deletar evento.' });
  }
});

// Configura a documentação do Swagger
setupSwagger(app);

// Define a porta a partir do .env ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação da API disponível em http://localhost:${PORT}/docs`);
});