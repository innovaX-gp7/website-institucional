var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idFuncionario, nome, cpf, email FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cpf, email, cpf, fkEmpresaFuncio) {
    var instrucaoSql = `
        INSERT INTO funcionario (nome, cpf, email, senha, fkEmpresaFuncio) VALUES ('${nome}', '${cpf}', '${email}', '${cpf}', '${fkEmpresaFuncio}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};