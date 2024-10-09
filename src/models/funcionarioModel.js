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

function editar(idFuncionario, nome, cpf, email, senha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idFuncionario, nome, cpf, email, senha);
    var instrucaoSql = `
        UPDATE funcionario SET nome = '${nome}', cpf = '${cpf}', email = '${email}', senha = '${senha}'  WHERE id = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    editar
};