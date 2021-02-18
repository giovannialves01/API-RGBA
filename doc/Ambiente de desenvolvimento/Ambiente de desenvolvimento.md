### Montando o ambiente de desenvolvimento

##### Softwares necessários

[Visual Studio Code (VSCode)](https://code.visualstudio.com/) *Recomendado para mexer com HTML, CSS e JavaScript*

[Eclipse](https://www.eclipse.org/) *Recomendado para mexer com Java*

[PostgreSQL v13.1](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

[DBeaver](https://dbeaver.io/download/) *Facilita a conexão com o banco de dados (Opcional)*

[Java JDK 15](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html)


##### Importação do projeto para o Eclipse

Após realizar o clone do repositório no GitHub, abra o Eclipse

No Eclipse, vá até ***File***, no canto da janela, e clique em ***Import...***

![a](Imagens/Importar.png)

A seguinte janela irá abrir, nela procure por ***Gradle*** e seleciona ***Existing Gradle Project*** e clique em ***Next***

![a](Imagens/Gradle.png)

Você será direcionado para o assistente de importação do **Gradle**, em ***Project root directory*** clique em ***Browse...*** e navegue até a pasta do repositório, mas não selecione ela! Dentro dela vá para **src** e selecione **SkillShare** e importe ela

![a](Imagens/Gradle2.png)

Clique em ***Next*** nas janelas seguintes e por fim em ***Finish***

Após a importação ter finalizado, clique com o direito no diretório do projeto, vá em ***Gradle*** e clique em ***Refresh Gradle Project***

![a](Imagens/GradleRefresh.png)

Após isso aguarde alguns instantes, o Gradle irá configurar as dependências do projeto

Com as dependências já baixadas e configuradas, procure por ***Application.java*** no pacote ***rgba***

![a](Imagens/Rodar.png)

Execute-o como uma aplicação Java, caso tudo corra bem, você verá o Spring sendo inicializado no console

Após isso acesse [localhost:8080](http://localhost:8080) e você verá a página inicial da aplicação