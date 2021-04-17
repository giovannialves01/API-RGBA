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
<img src="https://img.shields.io/badge/Sprint%20atual-Sprint%202-blue?style=for-the-badge&logo=appveyor">
</p>

<h2 align="center">O que é o SkillShare? :brain::computer:</h2>

<p align="justify">É uma plataforma de ensino a distância (<b>EAD</b>) nos padrões <b>LMS</b>, que tem como objetivo disponibilizar a funcionários de empresas suporte em seu aprendizado de novas competências, utilizando para tal propósito materiais em vídeos, imagens, arquivos PDFs, slides e quizzes, tudo de forma gratuita e de fácil acesso, democratizando assim o acesso a uma formação de qualidade em novas habilidades.</p>

<h2 align="center">Nosso desafio</h2>

<p align="justify">
A <b><i>Fatec Prof. Jessen Vidal</i></b>, juntamente com uma empresa parceira, <b><i>NESS Health</i></b>, propôs aos alunos o seguinte tema para o API <i>(Aprendizagem por Projetos Integrados)</i>: o desenvolvimento de uma plataforma LMS gratuita e de fácil acesso, na qual empresas possam disponibilizar conteúdos educacionais para o aprimoramento das habilidades de seus colaboradores. O sistema deverá ter quatro níveis de acesso. São eles: aluno, tutor, gestor e administrador. Devemos fornecer as mais variadas opções de postagem de conteúdo comumente utilizadas no mercado e ser de fácil acesso para os alunos e proporcionar uma UX de qualidade superior ao se comparar com aplicações no formato Moodle, por exemplo.
</p>

<h2 align="center">Índices</h2>
Para navegar rapidamente e com mais facilidade, você pode utilizar os links dos índices abaixo!

- <a href="#segundaEntrega">A segunda entrega</a>
  - [O que fizemos?](#o-que-fizemos)
  - [Por que entregamos isso?](#por-que-entregamos-isso)
  - [Quais foram as partes mais trabalhosas?](#quais-foram-as-partes-mais-trabalhosas)
- <a href="#funcionamento">Nosso sistema em funcionamento até o momento</a>
- <a href="#userStories">User stories da entrega</a>
- <a href="#wireframes">Wireframes da entrega</a>
- <a href="#modeloBanco">Modelo conceitual do banco de dados</a>
- <a href="#burndown">Burndown da Sprint</a>


<h2 align="center" id="primeiraEntrega">A segunda entrega</h2>

#### O que fizemos?
<p align="justify">
Tendo em mente que esta é a segunda entrega de valor, colocamos diversas funções relevantes para o cliente. A partir dessa Sprint, a nossa aplicação possuirá os seguintes funções:
</p>

- Funções do administrador e do gestor:
    1. Inserção de destaques;
    2. Postagem de pílulas de conhecimento;
    3. Postagem de eventos;
    4. Adição de conteúdo na biblioteca;
    5. Cadastro de todos os tipos de usuário.
- Funções do aluno:
    1. Acessar a biblioteca e baixar conteúdo;
    2. Visualizar pílulas de conhecimento;
    3. Visualizar destaques;
    4. Visualizar eventos.
- Adição do chatbot.

#### Por que entregamos isso?
<p align="justify">
Tendo em vista a utilidade da plataforma proposta, incluímos a inserção do conteúdo para diferenciar a nossa plataforma das outras. O Chatbot auxilia os novos usuários a conhecerem a SkillShare e pode explicar várias funcionalidades do nosso sistema. Os estudantes podem adquirir conhecimento de outras formas, não somente através de cursos! Gestores e administradores já podem manipular o conteúdo postado para tornar a plataforma cada vez mais completa e enriquecedora.
</p>


#### Quais foram as partes mais trabalhosas?
<p align="justify">
Para esta entrega, a maior dificuldade foi a administração do tempo, pois aconteceram imprevistos. Desenvolvemos várias funcionalidades para o nosso sistema em um curto período. Foi trabalhoso e demandou muita insistência e comunicação entre os integrantes da equipe, mas no final tudo ocorreu como previsto e conseguimos aproveitar ao máximo o nosso tempo para implementarmos as novas funções da aplicação.
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/main/doc/cards_entregas/2.png" width="500px">
</p>

<h2 align="center" id="funcionamento">Nosso sistema em funcionamento até o momento</h2>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Gifs/chatbot%20e%20home.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Gifs/login%20e%20biblioteca.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Gifs/cadastro%20aluno.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Gifs/aluno%20biblioteca.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Gifs/cadastro%20pilulas.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Gifs/aluno%20pilulas%20e%20noticias.gif">
</p>

<h2 align="center" id="userStories">User stories da entrega</h2>
<p align="justify">
Os story cards estão com a sua estimativa de esforço a partir de uma ferramentra Scrum chamada de Planning Poker, que baseia-se numa parte da sequência de Fibonacci, entre 0 e 89. A estimativa foi feita e utilizada para priorizar o backlog total. Cards com o valor de 0 são considerados desnecessários e deve ser descartados, 1 a 8 são considerados fáceis, já os de 13 a 89 (valor máximo) são de médio para difícil. Nessa entrega, os usuários deverão ser cadastrados por um administrador ou gestor para que tenham acesso à plataforma, recebendo por e-mail os dados da sua conta. Seguindo o fluxo da plataforma, os administradores e gestores poderão inserir conteúdo na biblioteca, poderão adicionar pílulas de conhecimento a um curso e ainda terão a possibilidade de criar postagens sobre eventos e notícias. O aluno, por sua vez, será possibilitado de visualizar essas publicações.
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/User%20stories/priorizacao_entregas/entrega2/User%20activities%20e%20User%20tasks.png" width="500px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/User%20stories/priorizacao_entregas/entrega2/entrega2pt1.png" width="500px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/User%20stories/priorizacao_entregas/entrega2/entrega2pt2.png" width="500px"><br>
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/User%20stories/priorizacao_entregas/entrega2/entrega2pt3.png" width="340px">
</p>

<h2 align="center" id="wireframes">Mockups da entrega :desktop_computer:</h2>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Wireframes/Landing%20page.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Wireframes/Administrador.jpg">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Wireframes/P%C3%A1gina%20do%20aluno.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Wireframes/Biblioteca.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Wireframes/Not%C3%ADcias.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Sprint%202/Wireframes/P%C3%ADlulas.jpg">
</p>

<p align="center">
Você pode visualizar todos os mockups clicando <a href="https://github.com/giovannialves01/API-RGBA/tree/SPRINT-2/doc/Sprint%202/Wireframes"><i>aqui</i></a>
</p>

<h2 align="center" id="modeloBanco">Modelo conceitual do banco de dados :card_file_box:</h2>

<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Banco%20de%20dados/Conceitual-sprint-2.png">
</p>

<h2 align="center" id="burndown">Burndown da Sprint</h2>
<p align="justify">Tivemos grandes imprevistos para esta Sprint, por isso tivemos um gráfico de burndown mais incomum. Apenas a partir do dia 8 de abril tivemos resultados razoáveis, que foram combinados na nossa reunião que ocorreu no mesmo dia. Somente nos três últimos dias da Sprint estivemos menos atarefados.</p>
<p align="center">
    <img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-2/doc/Burndown/Burndown%20Sprint2.png">
</p>
