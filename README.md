<h1>Portal Solar Frontend</h1>
<h2>Visão Geral</h2>

<p>
Este projeto é o frontend para o Portal Solar, uma aplicação React que consome uma API para fornecer informações sobre geradores solares baseados na despesa de luz do usuário. O frontend é desenvolvido utilizando React, TypeScript e várias bibliotecas para facilitar o desenvolvimento e a experiência do usuário.
</p>

<h2>Tecnologias Utilizadas</h2>

<ul>
<li>React 18</li>
<li>TypeScript</li>
<li>React Router</li>
<li>Axios</li>
<li>React Hook Form</li>
<li>TailwindCSS</li>
<li>Pré-requisitos</li>
</ul>

<p>Certifique-se de que a API do Portal Solar está rodando antes de iniciar o frontend.</p>

<strong>Node.js e npm</strong> instalados na máquina.

<h2>Instalação</h2>

Clone o Repositório

```bash
  git clone https://github.com/jonatasvenancio167/portal_solar_front
  cd portal_solar_front
  npm install
```

Certifique-se de que a API está rodando.

<h2>Link da API</h2>

```bash
https://github.com/jonatasvenancio167/portal_solar_api
```

<strong>Você deverá primeiro rodar o back-end pra depois executar o front-end!</strong>

<h2>Inicie o frontend:</h2>

```bash
npm start
```
O frontend deve rodar na porta 3001.<br>
Abra o navegador e acesse http://localhost:3001.

<h2>Estrutura do Projeto</h2>

A estrutura do projeto é organizada da seguinte forma:

```
/src
  /components  # Componentes reutilizáveis
  /pages       # Páginas principais da aplicação
  /services    # Serviços para chamadas de API
  /utils       # Funções utilitárias
  App.tsx      # Componente principal da aplicação
  index.tsx    # Ponto de entrada da aplicação
  index.css # configuração do tailwind e estilizações globais
```
