<h1>Gerenciador de Tarefas</h1>

<h2>Descrição</h2>
<p>Este projeto é um Gerenciador de Tarefas que permite criar, ler, atualizar e deletar tarefas. Com ele, é possível organizar tarefas e acompanhar o status de cada uma, utilizando uma interface web (frontend) e uma API REST (backend) desenvolvidos com tecnologias modernas.</p>

<h2>Estrutura do Projeto</h2>
<p>O projeto é dividido em duas partes:</p>
<ul>
  <li><strong>Frontend:</strong> Desenvolvido com React e TypeScript.</li>
  <li><strong>Backend:</strong> Desenvolvido com Node.js e Express, utilizando TypeScript e SQLite.</li>
</ul>

<h2>Funcionalidades</h2>
<ul>
  <li><strong>CRUD de Tarefas:</strong> Criação, leitura, atualização e remoção de tarefas.</li>
  <li><strong>Filtros de Status:</strong> Filtra tarefas por status (<em>pending</em>, <em>in_progress</em>, <em>done</em>).</li>
  <li><strong>Edição de Campo Específico:</strong> Permite a atualização de campos individuais nas tarefas usando PATCH.</li>
  <li><strong>Documentação da API:</strong> Documentação interativa com Swagger.</li>
</ul>

<h2>Tecnologias Utilizadas</h2>
<p><strong>Frontend:</strong> React, TypeScript</p>
<p><strong>Backend:</strong> Node.js, Express, TypeScript, SQLite (sem ORM/query builder)</p>
<h3>Bibliotecas</h3>
<ul>
  <li>Zod: Validação de dados</li>
  <li>Winston: Logging</li>
  <li>ESLint e Prettier: Padronização e formatação de código</li>
  <li>Swagger: Documentação da API</li>
</ul>

<h2>Pré-requisitos</h2>
<ul>
  <li>Node.js versão 16+</li>
  <li>NPM (ou Yarn)</li>
</ul>

<h2>Instalação</h2>
<h3>Backend</h3>
<ol>
  <li>Navegue até o diretório do backend:
    <pre><code>cd backend</code></pre>
  </li>
  <li>Instale as dependências:
    <pre><code>npm install</code></pre>
  </li>
  <li>Inicie o servidor de desenvolvimento:
    <pre><code>npm run dev</code></pre>
  </li>
  <li>Verifique e corrija a formatação com ESLint:
    <pre><code>npm run lint</code></pre>
  </li>
  <li>Formate o código com Prettier:
    <pre><code>npm run format</code></pre>
  </li>
</ol>

<h3>Frontend</h3>
<ol>
  <li>Navegue até o diretório do frontend:
    <pre><code>cd frontend</code></pre>
  </li>
  <li>Instale as dependências:
    <pre><code>npm install</code></pre>
  </li>
  <li>Inicie o servidor de desenvolvimento do frontend:
    <pre><code>npm run start</code></pre>
  </li>
</ol>

<h2>Endpoints da API</h2>
<h3>Lista de Endpoints</h3>
<ul>
  <li><strong>GET</strong> <code>/v1/tarefas</code>: Retorna todas as tarefas.</li>
  <li><strong>POST</strong> <code>/v1/tarefas/add</code>: Adiciona uma nova tarefa.</li>
  <li><strong>PUT</strong> <code>/v1/tarefas/:id</code>: Atualiza uma tarefa existente.</li>
  <li><strong>PATCH</strong> <code>/v1/tarefas/:id</code>: Atualiza um campo específico de uma tarefa.</li>
  <li><strong>DELETE</strong> <code>/v1/tarefas/:id</code>: Remove uma tarefa existente.</li>
</ul>

<h2>Estrutura de Dados</h2>
<p>Estrutura de uma tarefa:</p>
<pre><code>{
  "name": "Nome da Tarefa",
  "description": "Descrição da tarefa",
  "status": "pending"
}</code></pre>

<h2>Documentação da API com Swagger</h2>
<p>A documentação Swagger está disponível em <a href="http://localhost:8080/api-docs">http://localhost:8080/api-docs</a> após iniciar o backend.</p>

<h2>Fontes de Dados e Estudo</h2>
<p>Este projeto utilizou as seguintes fontes de dados e aprendizado durante o desenvolvimento:</p>
<ul>
  <li>Documentação oficial do <a href="https://expressjs.com/">Express.js</a></li>
  <li>Documentação do <a href="https://www.sqlite.org/docs.html">SQLite</a></li>
  <li>Documentação da <a href="https://react.dev/">React</a></li>
  <li>Video de como criar projeto express com o typescript <a href="https://www.youtube.com/watch?v=mfrz_kDRPNk">Express</li>
    <li>Video de como instalar e aplicar o prettier e o eslint no projeto <a href="https://www.youtube.com/watch?v=RO3l_xy7GeM">Eslint e Prettier</li>
  <li>Guia de como utilizar o Promises para evitar erros na aplicação com o <a href="https://medium.com/@xiaominghu19922/proper-error-handling-in-express-server-with-typescript-8cd4ffb67188">Express</a></li>
  <li>Guias de TypeScript, Zod, ESLint, Prettier e Swagger</li>
  <li>Guia de como criar documentação com o <a href="https://medium.com/@sagiweizmann/express-to-impress-documenting-apis-with-swagger-3744e95c1870">Swagger</li>
  <li>Guia de como criar documentação com o <a href="https://blog.logrocket.com/documenting-express-js-api-swagger/">Swagger</li>
  <li>Documentação do <a href="https://zod.dev/">Zod</li>
  <li>Guia de como utilizar as validações do <a href="https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j">Zod</li>
  <li>Guia de como utilizar as validações do <a href="https://dev.to/franciscomendes10866/schema-validation-with-zod-and-expressjs-111p">Zod</li>
  <li>Guia de como criar schemas e fazer validações com o <a href="https://blog.logrocket.com/schema-validation-typescript-zod/">Zod</li>
    <li>Video de como criar um modal flexível em<a href="https://www.youtube.com/watch?v=lIPhz8SlwAg">React</li>
        <li>Referências e soluções de problemas no <a href="https://stackoverflow.com/">Stack Overflow</a></li>
  <li>Tutoriais e referências no <a href="https://developer.mozilla.org/">MDN Web Docs</a></li>
</ul>
