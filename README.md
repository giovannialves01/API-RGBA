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

- <a href="#terceiraEntrega">A terceira entrega</a>
  - [O que fizemos?](#o-que-fizemos)
  - [Por que entregamos isso?](#por-que-entregamos-isso)
  - [Quais foram as partes mais trabalhosas?](#quais-foram-as-partes-mais-trabalhosas)
- <a href="#funcionamento">Nosso sistema em funcionamento até o momento</a>
- <a href="#userStories">User stories da entrega</a>
- <a href="#mockups">Mockups da entrega</a>
- <a href="#modeloBanco">Modelo conceitual do banco de dados</a>
- <a href="#burndown">Burndown da Sprint</a>


<h2 align="center" id="terceiraEntrega">A terceira entrega</h2>

#### O que fizemos?
<p align="justify">
Tendo em mente que esta é a terceira entrega de valor, colocamos diversas funções relevantes para o cliente e aluno. A partir dessa Sprint, a nossa aplicação possuirá os seguintes funções:
</p>

- Funções do administrador:
    1. Postar cursos na plataforma;
    2. Gerenciar os cursos;
    3. Adicionar um aluno a uma turma;
    4. Visualizar o registro de atividades do sistema;
    5. Criar banco de questões.

- Funções do gestor:
    1. Postar cursos na plataforma;
    2. Utilizar banco de questões para estruturar futuras avaliações.
    
- Funções do tutor:
    1. Visualizar cursos em que possui vínculo, as turmas desses cursos e os alunos também.

- Funções do aluno:
    1. Ser incluído em turmas para iniciar cursos;
    2. Visualizar todos os vídeos do curso que está inscrito;
    3. Realizar as atividades do curso;
    4. Responder quizzes do curso;
    5. Ler textos do curso;
    6. Visualizar aulas e atividades realizadas.


#### Por que entregamos isso?
<p align="justify">
A disponibilização de cursos e também o acesso a eles é a principal funcionalidade da nossa plataforma, tal que nosso projeto é um Learning Management System. Dessa forma, os alunos já podem realizar seus cursos para adquirir conhecimento nos assuntos que desejarem!
</p>


#### Quais foram as partes mais trabalhosas?
<p align="justify">
Para esta entrega, a maior dificuldade foi a implementação do Scorm, pois foi necessário uma pesquisa extensa para adquirir informações e orientações sobre o mesmo, além de uma curva de aprendizagem relevante para compreender suas funcionalidades e como integrá-las à SkillShare.
</p>

<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/cards_entregas/3.png" width="500px">
</p>

<h2 align="center" id="funcionamento">Nosso sistema em funcionamento até o momento</h2>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%201%20-%20upload%20curso.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%202%20-%20cria%C3%A7%C3%A3o%20de%20turma%20para%20o%20curso.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%203%20-%20gerir%20cursos.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%205%20-%20criar%20quest%C3%A3o.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%206%20-%20gerir%20quest%C3%B5es.gif">

<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Aluno%201%20-%20vendo%20cursos%20e%20fazendo%20um.gif">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Aluno%202%20-%20vendo%20o%20progresso.gif">

<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Tutor%201%20-%20ver%20sursos%2C%20turmas%20e%20alunos.gif">

<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%207%20-%20logs.gif">
</p>

<h2 align="center" id="userStories">User stories da entrega</h2>
<p align="justify">
Os story cards estão com a sua estimativa de esforço a partir de uma ferramentra Scrum chamada de Planning Poker, que baseia-se numa parte da sequência de Fibonacci, entre 0 e 89. A estimativa foi feita e utilizada para priorizar o backlog total. Cards com o valor de 0 são considerados desnecessários e deve ser descartados, 1 a 8 são considerados fáceis, já os de 13 a 89 (valor máximo) são de médio para difícil. 
Nessa entrega, os administradores e gestores poderão postar cursos, além de poderem adicionar turmas a esses cursos para que eles tenham alunos. O aluno poderá visualizar os cursos em que está inscrito e poderá acessar seu conteúdo, abrangendo de vídeos a PDFs, além de poder realizar quizzes e avaliações. O tutor também poderá visualizar as turmas dos cursos em que está vinculado.
</p>
<p align="center">
<img src="https://raw.githubusercontent.com/giovannialves01/API-RGBA/SPRINT-3/doc/User%20stories/priorizacao_entregas/entrega3/User%20activities%20e%20User%20tasks.png" width="500px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/User%20stories/priorizacao_entregas/entrega3/entrega3pt1.png" width="500px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/User%20stories/priorizacao_entregas/entrega3/entrega3pt2.png" width="500px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/User%20stories/priorizacao_entregas/entrega3/entrega3pt3.png" width="500px"><br>
</p>

<h2 align="center" id="mockups">Mockups da entrega :desktop_computer:</h2>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/sprint-3-rascunho/doc/Wireframes_Mockups/Entrega%203/Administrador__Logs_do_sistema.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Wireframes/Entrega%203/Administra%C3%A7%C3%A3o_%20Listagem%20de%20cursos.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Wireframes/Entrega%203/Administra%C3%A7%C3%A3o_%20Postagem%20de%20um%20curso.png">
</p>
<p align="center">
    <img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Wireframes/Entrega%203/Administra%C3%A7%C3%A3o_%20banco%20de%20quest%C3%B5es.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Wireframes/Entrega%203/Aluno_%20Detalhes%20do%20curso.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Wireframes/Entrega%203/Aluno_%20Listagem%20de%20cursos.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Wireframes/Entrega%203/Tutor_%20Listagem%20de%20cursos.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Wireframes/Entrega%203/Tutor_%20Listagem%20de%20todas%20as%20turmas%20de%20um%20curso.png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Wireframes/Entrega%203/Tutor_%20Listagem%20de%20todos%20os%20seus%20alunos.png">
</p>

<p align="center">
Você pode visualizar todos os mockups clicando <a href="https://github.com/giovannialves01/API-RGBA/tree/SPRINT-3/doc/Wireframes"><i>aqui</i></a>
</p>

<h2 align="center" id="modeloBanco">Modelo conceitual do banco de dados :card_file_box:</h2>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Banco%20de%20dados/Conceitual-sprint-3.png">
</p>

<h2 align="center" id="burndown">Burndown da Sprint</h2>
<p align="justify">Nossa Sprint foi "corrida", devido à quantidade de funcionalidades que nós tínhamos proposto para a entrega. Além disso, nossa principal e mais trabalhosa feature foi a integração de um Scorm Player na nossa plataforma. No final deu tudo certo, mas em vários momentos fomos surpreendidos por conta do desafio de implementar algo que nunca tínhamos visto antes.</p>
<p align="center">
    <img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Burndown/Burndown%20Sprint3.png">
</p>
