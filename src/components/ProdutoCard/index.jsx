import './style.css';

function ProdutoCard({ nome, preco, imagem, descricao, children }) {
  return (
    <article className="produto-card">
      <img className="produto-card__imagem" src={imagem} alt={nome} />
      <div className="produto-card__conteudo">
        <h2>{nome}</h2>
        <p>{descricao}</p>
        <strong>R$ {Number(preco).toFixed(2)}</strong>
        {children}
      </div>
    </article>
  );
}

export default ProdutoCard;
