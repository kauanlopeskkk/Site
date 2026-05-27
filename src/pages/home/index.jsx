import { useEffect, useState } from 'react';
import ProdutoCard from '../../components/ProdutoCard';
import './style.css';

const imagemPadrao = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80';

const produtosMockados = [
  {
    id: 1,
    nome: 'Relogio moderno',
    preco: 89.9,
    descricao: 'Produto em destaque com acabamento bonito e preco acessivel.',
    imagem: imagemPadrao,
  },
  {
    id: 2,
    nome: 'Fone bluetooth',
    preco: 59.99,
    descricao: 'Fone sem fio para ouvir musicas e atender chamadas no dia a dia.',
    imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    nome: 'Mochila casual',
    preco: 74.5,
    descricao: 'Mochila resistente para estudos, trabalho e passeios.',
    imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
  },
];

const TrashIcon = () => (
  <svg className="trash-icon" viewBox="0 0 24 24" aria-hidden="true" role="img">
    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    produto: '',
    preco: '',
    descricao: '',
    imagem: '',
  });

  useEffect(() => {
    const buscarProdutos = setTimeout(() => {
      setProdutos(produtosMockados);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(buscarProdutos);
  }, []);

  function atualizarFormData(event) {
    const { name, value } = event.target;

    setFormData((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function enviarProduto(event) {
    event.preventDefault();

    const novoProduto = {
      id: Date.now(),
      nome: formData.nome,
      produto: formData.produto || formData.nome,
      preco: Number(formData.preco),
      descricao: formData.descricao,
      imagem: formData.imagem || imagemPadrao,
    };

    setErro('');
    setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);
    setFormData({
      nome: '',
      produto: '',
      preco: '',
      descricao: '',
      imagem: '',
    });
  }

  function deletarProduto(id) {
    setErro('');
    setProdutos((produtosAtuais) => produtosAtuais.filter((produto) => produto.id !== id));
  }

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="container">
      <form onSubmit={enviarProduto}>
        <h1>Ola, seja bem-vindo ao nosso site de produtos baratos</h1>
        <p>Fica a disposicao de nossos clientes</p>
        <h3>Produto em destaque</h3>

        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value={formData.nome} onChange={atualizarFormData} required />

        <label htmlFor="produto">Produto:</label>
        <input type="text" id="produto" name="produto" value={formData.produto} onChange={atualizarFormData} />

        <label htmlFor="preco">Preco:</label>
        <input type="number" id="preco" name="preco" value={formData.preco} onChange={atualizarFormData} min="0" step="0.01" required />

        <label htmlFor="descricao">Descricao:</label>
        <input type="text" id="descricao" name="descricao" value={formData.descricao} onChange={atualizarFormData} required />

        <label htmlFor="imagem">Imagem:</label>
        <input type="url" id="imagem" name="imagem" value={formData.imagem} onChange={atualizarFormData} />
        <button type="submit">Enviar o Produto</button>

      </form>

      {erro && <p className="erro">{erro}</p>}

      {produtos.map((produto) => (
        <ProdutoCard
          key={produto.id}
          nome={produto.nome || produto.produto}
          preco={produto.preco}
          imagem={produto.imagem || imagemPadrao}
          descricao={produto.descricao}
        >
          <button className="trash-button" type="button" onClick={() => deletarProduto(produto.id)} aria-label="Deletar produto">
            <TrashIcon />
          </button>
        </ProdutoCard>
      ))}
    </div>
  );
}

export default Home;
