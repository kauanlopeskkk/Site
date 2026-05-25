import React from 'react';
import './style.css';

function Home(nome,produto,preco,descricao) {
return (
<div className="container">
  <form action="get">
        <h1>Ola, Seja Bem-vindo ao nosso site produtos baratos </h1>
        <p>Fica a disposição de nossos clientes</p>
        <h3>produto esta em destaque</h3>

        <label htmlFor="Nome">Nome:</label>
        <input type="text" id="nome" name="Nome" />

        <label htmlFor="Produto">Produto:</label>
        <input type="text" id="produto" name="Produto" />

        <label htmlFor="Preco">Preco:</label>
        <input type="text" id="preco" name="Preco" />
        
        <label htmlFor="Descricao">Descricao:</label>
        <input type="text" id="descricao" name="Descricao" /> 
        
    </form>
   {produtos.map((produto) => (
     <div key={produto.id}>
       <h4>{produto.nome}</h4>
       <p>{produto.descricao}</p>
       <p>Preço: R$ {produto.preco.toFixed(2)}</p>
     </div>
   ))}

</div>
)



export default Home;
}