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
<img src="https://img.shields.io/badge/status-Concluído-blue?style=for-the-badge&logo=appveyor">
</p>

<p align="center">
<img src="https://img.shields.io/badge/Sprint%20atual-Sprint%204-blue?style=for-the-badge&logo=appveyor">
</p>

<h2 align="center">O que é o SkillShare? :brain::computer:</h2>

<p align="justify">É uma plataforma de ensino a distância (<b>EAD</b>) nos padrões <b>LMS</b>, que tem como objetivo disponibilizar a funcionários de empresas suporte em seu aprendizado de novas competências, utilizando para tal propósito materiais em vídeos, imagens, arquivos PDFs, slides e quizzes, tudo de forma gratuita e de fácil acesso, democratizando assim o acesso a uma formação de qualidade em novas habilidades.</p>

<h2 align="center">Nosso desafio</h2>

<p align="justify">
A <b><i>Fatec Prof. Jessen Vidal</i></b>, juntamente com uma empresa parceira, <b><i>NESS Health</i></b>, propôs aos alunos o seguinte tema para o API <i>(Aprendizagem por Projetos Integrados)</i>: o desenvolvimento de uma plataforma LMS gratuita e de fácil acesso, na qual empresas possam disponibilizar conteúdos educacionais para o aprimoramento das habilidades de seus colaboradores. O sistema deverá ter quatro níveis de acesso. São eles: aluno, tutor, gestor e administrador. Devemos fornecer as mais variadas opções de postagem de conteúdo comumente utilizadas no mercado e ser de fácil acesso para os alunos e proporcionar uma UX de qualidade superior ao se comparar com aplicações no formato Moodle, por exemplo.
</p>

<h2 align="center">Índices</h2>
Para navegar rapidamente e com mais facilidade, você pode utilizar os links dos índices abaixo!

- <a href="#terceiraEntrega">A quarta entrega</a>
  - [O que fizemos?](#o-que-fizemos)
  - [Por que entregamos isso?](#por-que-entregamos-isso)
  - [Quais foram as partes mais trabalhosas?](#quais-foram-as-partes-mais-trabalhosas)
- <a href="#funcionamento">Nosso sistema em funcionamento até o momento</a>
- <a href="#userStories">User stories da entrega</a>
- <a href="#mockups">Mockups da entrega</a>
- <a href="#modeloBanco">Modelo conceitual do banco de dados</a>
- <a href="#burndown">Burndown da Sprint</a>


<h2 align="center" id="terceiraEntrega">A quarta entrega</h2>

#### O que fizemos?
<p align="justify">
Finalizamos a construção da plataforma. Nesta entrega as funcionalidades desenvolvidas são:
</p>

- Realização de avaliações finais:
    * O aluno, quando finalizar o curso, poderá visualizar uma opção para realizar a avaliação final do curso, que posteriormente será analisada por um tutor. Este, por sua vez, dará um feedback, que também poderá ser visto pelo aluno.
    * Quando o aluno receber o feedback da avaliação, será possível visualizar a nota dela e as considerações do tutor do curso.

- Dashboard:
   * Visualização de gráficos da plataforma em geral e, também, de um curso específico selecionado. É possível visualizar a quantidade de usuários da plataforma, a quantidade de alunos, a quantidade de cursos. Para um curso em específico é possível visualizar gráficos envolvendo as notas das avaliações finais, o engajamento dos alunos, tempo médio para finalizar o curso, por exemplo!

- Certificado:
    * Emissão de certificado a partir da conclusão de um curso
    * O aluno poderá realizar o <i>download</i> de um PDF do certificado!

- Feedback:
    * O tutor poderá visualizar a resolução de alguma avaliação de um aluno. A partir disso, será possível o tutor realizar o feedback da avaliação, de forma a dar sugestões e parabenizar o aluno.
    
#### Por que entregamos isso?
<p align="justify">
O feedback e as notas permitem finalizar o curso de forma a visualizarmos o aproveitamento do conteúdo aprendido. As análises de relatórios por gráficos cria <i>insights</i> e a aparição de pontos a serem melhorados na plataforma ou em um curso em específico. 
</p>

#### Quais foram as partes mais trabalhosas?
<p align="justify">
Para esta entrega, a maior dificuldade foi a implementação dos gráficos para a análise dos dados da plataforma, pois é necessário que os dados estejam agrupados de forma coerente para que tenham algum sentido e para que realmente sejam úteis para o usuário.
</p>

<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/cards_entregas/4.png" width="500px">
</p>

<h2 align="center" id="funcionamento">Nosso sistema em funcionamento até o momento</h2>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/gifs/Adm-1-upload-de-um-curso.gif" width="600px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%202%20-%20cria%C3%A7%C3%A3o%20de%20turma%20para%20o%20curso.gif" width="600px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%203%20-%20gerir%20cursos.gif" width="600px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/gifs/Adm-5-criar-questo.gif" width="600px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%206%20-%20gerir%20quest%C3%B5es.gif" width="600px">

<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/gifs/Aluno-1-vendo-cursos-e-fazendo-u.gif" width="600px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Aluno%202%20-%20vendo%20o%20progresso.gif" width="600px">

<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Tutor%201%20-%20ver%20sursos%2C%20turmas%20e%20alunos.gif" width="600px">

<img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Sprint%203/GIFs/Adm%207%20-%20logs.gif">
</p>

<h2 align="center" id="userStories">User stories da entrega</h2>
<p align="justify">
Os story cards estão com a sua estimativa de esforço a partir de uma ferramentra Scrum chamada de Planning Poker, que baseia-se numa parte da sequência de Fibonacci, entre 0 e 89. A estimativa foi feita e utilizada para priorizar o backlog total. Cards com o valor de 0 são considerados desnecessários e deve ser descartados, 1 a 8 são considerados fáceis, já os de 13 a 89 (valor máximo) são de médio para difícil. 
Nessa entrega, os administradores e gestores podem visualizar relatórios para analisar o engajamento na plataforma. Os alunos podem realizar e visualizar as notas das avaliações e o feedback dado pelo tutor.
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/User%20stories/priorizacao_entregas/entrega4/User%20activities%20e%20User%20tasks.png" width="500px">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/User%20stories/priorizacao_entregas/entrega4/entrega4.png" width="500px">
</p>

<h2 align="center" id="mockups">Mockups da entrega :desktop_computer:</h2>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/Wireframes/Entrega%204/Adm_%20dashboard%20(2).png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/Wireframes/Entrega%204/Administra%C3%A7%C3%A3o_%20criar%20prova%20final%20do%20curso%20(1).png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/Wireframes/Entrega%204/Tutor_%20dar%20feedback%20ao%20aluno%20(1).png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/Wireframes/Entrega%204/Aluno_%20Detalhes%20do%20curso%20(2).png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/Wireframes/Entrega%204/Aluno_%20avalia%C3%A7%C3%A3o%20final%20de%20um%20curso%20(1).png">
</p>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/Wireframes/Entrega%204/Aluno_%20certificados%20(1).png">
</p>


<p align="center">
Você pode visualizar todos os mockups clicando <a href="https://github.com/giovannialves01/API-RGBA/tree/main/doc/Wireframes"><i>aqui</i></a>
</p>

<h2 align="center" id="modeloBanco">Modelo conceitual do banco de dados :card_file_box:</h2>
<p align="center">
<img src="https://github.com/giovannialves01/API-RGBA/blob/main/doc/Banco%20de%20dados/Conceitual-sprint-4.png">
</p>

<h2 align="center" id="burndown">Burndown da Sprint</h2>
<p align="justify">Nossa Sprint foi tranquila. Começamos a fazer os mock-ups dessa Sprint no final da Sprint 3, o que agilizou a validação. Não tivemos imprevistos e até terminamos alguns dias antes do que planejávamos. A funcionalidade mais trabalhosa, o dashboard, começou a ser desenvolvida com antecedência e não tivemos problemas.</p>
<p align="center">
    <img src="https://github.com/giovannialves01/API-RGBA/blob/SPRINT-3/doc/Burndown/Burndown%20Sprint3.png">
</p>
