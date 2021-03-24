
<head>
       <p><img src="https://img.shields.io/badge/status%20do%20projeto-em desenvolvimento-blue?style=for-the-badge&logo=appveyor"></p>
       <p><img src="https://img.shields.io/badge/Sprint%20atual-Projeto%20sprint 1-blue?style=for-the-badge&logo=appveyor"></p>
       <p>
       <img src="https://img.shields.io/badge/dependências-JavaFX%3A%2014.0.2.1-blue">
       <img src="https://img.shields.io/badge/dependências-JDK%3A%2015.0.2-blue">
       <img src="https://img.shields.io/badge/dependências-Hibernate%3A%205.4.21-blue">
       <img src="https://img.shields.io/badge/dependências-PostgreSQL%20JDBC%3A%2042.2.16-blue">
       </p>
         
</head>


## SkillShare :brain::computer:	


# Disciplina Focal Point: Engenharia de Software II
* M2 (Master dos Masters): Prof. Walmir Duque
* P2 (PO dos PO´s): Prof. Claudio Lima

## Disciplinas Integradas

### Economia e Finanças
Prof. Cicero Soares da Silva

### Estruturas de Dados
Prof. Fernando Masanori Ashikaga

### Interação Humano Computador
Prof. Giuliano Araujo Bertoti

### Programação Orientada a Objeto
Prof. Gerson da Penha Neto

### Sistemas Operacionais
Prof. Eduardo Sakaue


#### Integrantes da equipe :girl::boy:

* [Giovanni dos Santos Alves](https://www.linkedin.com/in/giovanni-santos-546412154/) (*Scrum Master*)

* [Bárbara dos Santos Port](https://www.linkedin.com/in/b%C3%A1rbara-port-402158198/) (*Product Owner*)

* [Ana Carolina da Silva Lima](https://www.linkedin.com/in/ana-carolina-lima-099955136/) (*Development Team*)

* [Ana Clara Ferreira de Godoy](https://www.linkedin.com/in/ana-clara-godoy-2973381b2/) (*Development Team*)

* [Anna Yukimi Yamada](https://www.linkedin.com/in/anna-yukimi-yamada-6ba23b149/) (*Development Team*)

* [Bárbara Bidoia Bidetti](https://www.linkedin.com/in/barbara-bidetti-bb910a1b3/) (*Development Team*)

* [Felipe Silva](https://www.linkedin.com/in/felipe-silva-13b3b61a0/) (*Development Team*)

* [Nicholas Gabriel dos Santos Roque](https://www.linkedin.com/in/nicholas-gabriel-dos-santos-roque-9113511b2/) (*Development Team*)

* [Rafael Furtado Rodrigues dos Santos](https://www.linkedin.com/in/rafael-furtado-613a9712a/) (*Development Team*)


# O Desafio 
Nosso cliente é a empresa Ness Health. A demanda é o desenvolvimento de um LMS (Learning Management System) responsivo de estudo gratuito para os alunos matriculados. 

O site deverá oferecer as seguintes opções de cadastros:
* Cadastro de alunos realizado pelo gestor
* Cadastro do gestor
* Cadastro do tutor

Além dos cadastros, também serão disponibilizadas as bibliotecas de cursos para escolher e realizar matrículas nos cursos e dashboards para análises dinâmicas.

Os cursos terão vários tipos de materiais como vídeos e PDFs de forma a abranger as várias formas de aprendizagem para o aluno, o qual, também terá auxílio de um tutor durante seus estudos.

Haverá também um chatbot para sanar dúvidas do site.

# Índice
•      [O que é a SkillShare?](https://github.com/giovannialves01/API-RGBA/blob/main/README.md#skillshare)

•	[Visão da solução](https://github.com/giovannialves01/API-RGBA/blob/main/README.md#vis%C3%A3o-da-solu%C3%A7%C3%A3o)

•	[Benefícios](https://github.com/giovannialves01/API-RGBA/blob/main/README.md#benef%C3%ADcios)

•	[Principais deliverables](https://github.com/giovannialves01/API-RGBA/blob/main/README.md#principais-deliverables)

•	[Limites e Restrições da solução](https://github.com/giovannialves01/API-RGBA#limites-e-restri%C3%A7%C3%B5es-da-solu%C3%A7%C3%A3o)

•	[User Roles](https://github.com/giovannialves01/API-RGBA#user-roles)

•	[User Stories](https://github.com/giovannialves01/API-RGBA#user-stories)

•	[story Card](https://github.com/giovannialves01/API-RGBA#story-card)

•	[Artefatos e Tecnologias]()

•	[Cronograma de Entregas](https://github.com/giovannialves01/API-RGBA#cronograma-de-entregas)


# SkillShare
Em uma realidade em que o ensino online tornou-se essencial para a manutenção do conhecimento, a SkillShare tem o intuito de proporcionar treinamentos on-line e gratuitos para funcionários aperfeiçoarem suas habilidades técnicas!

 Atualmente 14,4% da população brasileira encontra-se desempregada. Dessa forma todos nós precisamos de mais qualificação para alcançarmos nossos objetivos profissionais. 
Apesar de existirem muitas plataformas de ensino online, elas são pagas, removendo assim o direito à educação de todos. 

Nós, da equipe RGBA, apresentamos a SkillShare que, pelo contrário, visa democratizar o ensino online, de forma a distribuir o aprendizado para todos.

Na SkillShare, os instrutores serão capazes de adicionar cursos, atividades e pílulas de conhecimento para que qualquer funcionário de uma empresa possa adquirir habilidades técnicas.

# Visão da Solução
A SkillShare é um site LMS que oferece cursos gratuitos on-line para aperfeiçoamento e aprendizagem dos colaboradores de uma empresa, ajustando-se as várias formas de aprendizado do usuário, além de permitir o controle e análise pelos gestores de sua staff. 

# Benefícios
* Gratuito
* Aprendizagem distribuída: vídeos, PDFs, slides
* Tutoria para auxílio da aprendizagem
* Dashboards para análises dinâmicas
* Chatbot para dúvidas
* Responsivo: acessível em vários dispositivos
* Emissão de cerificado
* Controle coorporativo
# Principais Deliverables 
* Interface de login com permissões e visualizações para perfis diferentes 
* Banco de dados de registro dos cursos 
* Banco de dados de registro dos alunos
* Banco de dados de registro dos tutores
* Banco de dados de registro dos gestores


# Limites e restrições da solução 

* O cadastro e o log-in deverá ser mediante CPF, que, apesar de ser um dado sensível, é a forma de certificar que o aluno existe. 

* As informações inseridas no site deverão ter tratamento LGPD. 

* A plataforma será em Java utilizando o Spring e o armazenamento de dados pelo PostgreSQL, conforme decidido pela equipe.

# User Roles 
Os usuários previstos estão descritos conforme imagem abaixo: 

![user_roles](https://user-images.githubusercontent.com/60778277/112249518-b2c04600-8c36-11eb-870c-dde55c0dee32.jpg)

### Detalhamento das funções dos perfis: 


# User Stories

# Story Card

# Cronograma de Entregas
|Data|Entrega|
|-----|--------|
|28/03|[SPRINT 1]()|
|18/04|[SPRINT 2]()|
|16/05|[SPRINT 2]()|
|05/06|[SPRINT 3]()|
