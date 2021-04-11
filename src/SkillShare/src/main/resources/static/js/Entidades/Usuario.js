class Usuario{
    constructor() {
        
        this.nome;
        this.email;
        this.cpf;
        this.senha;
        this.contatos;

    }

    setNome(nome){
        this.nome = nome;
    }
    setEmail(email){
        this.email = email;
    }
    setCpf(cpf){
        this.cpf = cpf;
    }
    setSenha(senha){
        this.senha = senha;
    }
    setContatos(contatos){
        this.contatos = contatos;
    }

    getNome(){
        return this.nome;
    }
    getEmail(){
        return this.email;
    }
    getCpf(){
        return this.cpf;
    }
    getSenha(){
        return this.senha;
    }
    getContatos(){
        return this.contatos;
    }

    /**
     * Retorna o objeto com suas informações no formato JSON
     * 
     * @author Rafael Furtado
     * @returns JSON
     */
    toData(){
        let data = {
            nome: this.nome,
            email: this.email,
            cpf: this.cpf,
            senha: this.senha,
            contatos: this.contatos
        }

        return data;
    }

    async toTableData(){
        let users = await serverRequester.fazerGet("/alunos", {});

        let tableData = {};
        tableData["columns"] = {
            nome: "Nome",
            cpf: "CPF",
            email: "E-mail"
        };
        tableData["extraConfigs"] = [
            "editRowInfo",
            "deleteRowInfo"
        ];

        tableData["rows"] = users["responseJson"];

        return tableData;
    }

}
