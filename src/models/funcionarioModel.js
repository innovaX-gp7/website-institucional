var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idFuncionario, cpf, email FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cpf, email) {
    var instrucaoSql = `
        INSERT INTO funcionario (nome, cpf, email, senha) VALUES ('${nome}', '${cpf}', '${email}', '${cpf}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};