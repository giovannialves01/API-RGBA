<h1 align="center">SkillShare :brain::computer:</h1>

<p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white">
    <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
</p>

<p align="center">
<img src="https://img.shields.io/badge/status-em desenvolvimento-blue?style=for-the-badge&logo=appveyor">
</p>

<p align="center">
<img src="https://img.shields.io/badge/Sprint%20atual-Sprint 1-blue?style=for-the-badge&logo=appveyor">
</p>

<h2 align="center">O que é o SkillShare? :brain::computer:</h2>

<p align="justify">É uma plataforma de ensino a distância (<b>EAD</b>) nos padrões <b>LMS</b>, que tem como objetivo disponibilizar a funcionários de empresas suporte em seu aprendizado de novas competências, utilizando para tal propósito materiais em vídeos, imagens, arquivos PDFs, slides e quizzes, tudo de forma gratuíta e de fácil acesso, democratizando assim o acesso a uma formação de qualidade em novas habilidades.</p>

<h2 align="center">Nosso desafio</h2>

<p align="justify">
A <b><i>Fatec Prof. Jessen Vidal</i></b>, juntamente com uma empresa parceira, <b><i>NESS Health</i></b>, propôs aos alunos o seguinte tema para o API <i>(Aprendizagem por Projetos Integrados)</i>: o desenvolvimento de uma plataforma LMS gratuita e de fácil acesso onde empresas possam disponibilizar conteúdos educacionais para o aprimoramento das habilidades de seus colaboradores. O sistema deverá ter quatro níveis de acesso. São eles aluno, tutor, gestor e administrador. Devemos fornecer as mais variadas opções de postagem de conteúdo comumente utilizadas no mercado e ser de fácil acesso para os alunos e proporcionar uma UX de qualidade superior ao se comparar com aplicações no formato Moodle, por exemplo.
</p>

<h2 align="center">Índices</h2>
Para navegar mais rapidamente e com facilidade, você pode utilizar os links dos índices abaixo

- <a href="#primeiraEntrega">A primeira entrega</a>
  - [O que fizemos?](#o-que-fizemos)
  - [Por que entregamos isso?](#por-que-entregamos-isso)
  - [Quais foram as partes mais trabalhosas?](#quais-foram-as-partes-mais-trabalhosas)
- <a href="#funcionamento">Nosso sistema em funcionamento até o momento</a>
- <a href="#userStories">User stories da entrega</a>
- <a href="#wireframes">Wireframes da entrega</a>
- <a href="#modeloBanco">Modelo conceitual do banco de dados</a>
- <a href="#burndown">Burndown da Sprint</a>


<h2 align="center" id="primeiraEntrega">A primeira entrega</h2>

##### O que fizemos?
<p align="justify">
Focando em uma entrega de valor ao cliente, nossa aplicação possuí os seguintes elementos básicos:
</p>

- Uma página de boas vindas
- Realização de login de contas cadastradas
- Para contas com a permissão de acesso de Administrador e Gestor, é possível cadastrar novos alunos
- Ao cadastrar um novo aluno, é um e-mail é enviado para o novo usuário, com os seus dados de login na plataforma

##### Por que entregamos isso?
<p align="justify">
Do ponto de vista das empresas que irão utilizar a plataforma, ao disponibilizarmos já uma forma de registrar seus alunos no sistema, damos a oportunidade de formarem um banco de dados consistente e gerir todos os seus colaboradores que irão se aproveitar dos benefícios da nossa plataforma.
</p>


##### Quais foram as partes mais trabalhosas?
<p align="justify">
Para esta entrega, as maiores dificuldades foram organizar toda a equipe para o trabalho em conjunto, realizar o levantamento de requisitos e saber de fato o que a plataforma precisará ter ao final do projeto e se habituar as novas tecnologias necessárias para a conclusão da aplicação.
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/main/doc/cards_entregas/1.png" width="500px">
</p>

<h2 align="center" id="funcionamento">Nosso sistema em funcionamento até o momento</h2>
gif aqui



<h2 align="center" id="userStories">User stories da entrega</h2>
<p align="justify">
Os story cards estão com a sua estimativa de esforço a partir da sequência de Fibonacci. A estimativa foi feita através do Planning Poker e também foi utilizada para priorizar o backlog total. Cards com o valor de 0 a 8 são considerados fáceis, já os de 13 a 89 (valor máximo) são de médio para difícil. Nessa entrega, os usuários deverão ser cadastrados por um administrador ou gestor para que tenham acesso à plataforma, recebendo por e-mail os dados da sua conta.
</p>
<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/main/doc/User%20stories/priorizacao_entregas/entrega1.png" width="500px">
</p>

<h2 align="center" id="wireframes">Wireframes da entrega</h2>
<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/main/doc/Wireframes/Entrega%201/pagina_inicial.png" width="400px">
</p>
<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/main/doc/Wireframes/Entrega%201/login.png" width="400px">
</p>
<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/main/doc/Wireframes/Entrega%201/inicial_adm_e_gestor_ok.png" width="400px">
</p>
<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/main/doc/Wireframes/Entrega%201/cadastro_aluno.png" width="400px">
</p>

<p align="center">
Você pode visualizar todos os wireframes clicando <a href="https://github.com/giovannialves01/API-RGBA/tree/main/doc/Wireframes"><i>aqui</i></a>
</p>

<h2 align="center" id="modeloBanco">Modelo conceitual do banco de dados</h2>

<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/main/doc/Banco%20de%20dados/conceitual2.jpeg" width="700px">
</p>

<h2 align="center" id="burndown">Burndown da Sprint</h2>
<p align="center">
    imagem do burndown aqui
</p>
