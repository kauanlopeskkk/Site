import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';

const PORT = 3000;
const DB_FILE = new URL('./db.json', import.meta.url);

async function readDb() {
  const content = await readFile(DB_FILE, 'utf-8');
  return JSON.parse(content);
}

async function writeDb(data) {
  await writeFile(DB_FILE, `${JSON.stringify(data, null, 2)}\n`);
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://localhost:${PORT}`);

  if (request.method === 'OPTIONS') {
    sendJson(response, 200, {});
    return;
  }

  try {
    if (url.pathname === '/produtos' && request.method === 'GET') {
      const db = await readDb();
      sendJson(response, 200, db.produtos);
      return;
    }

    if (url.pathname === '/produtos' && request.method === 'POST') {
      const db = await readDb();
      const body = await readBody(request);

      if (!body.nome || !body.preco || !body.descricao) {
        sendJson(response, 400, { erro: 'Nome, preco e descricao sao obrigatorios' });
        return;
      }

      const novoProduto = {
        id: Date.now(),
        nome: body.nome,
        produto: body.produto || body.nome,
        preco: Number(body.preco),
        descricao: body.descricao,
        imagem: body.imagem || '',
      };

      db.produtos.push(novoProduto);
      await writeDb(db);
      sendJson(response, 201, novoProduto);
      return;
    }

    if (url.pathname.startsWith('/produtos/') && request.method === 'DELETE') {
      const db = await readDb();
      const id = Number(url.pathname.split('/')[2]);
      const produtosAtualizados = db.produtos.filter((produto) => produto.id !== id);

      if (produtosAtualizados.length === db.produtos.length) {
        sendJson(response, 404, { erro: 'Produto nao encontrado' });
        return;
      }

      db.produtos = produtosAtualizados;
      await writeDb(db);
      sendJson(response, 200, { ok: true });
      return;
    }

    sendJson(response, 404, { erro: 'Rota nao encontrada' });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { erro: 'Erro interno da API local' });
  }
});

server.listen(PORT, () => {
  console.log(`API local rodando em http://localhost:${PORT}/produtos`);
});
