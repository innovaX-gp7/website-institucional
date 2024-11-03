var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, cnpj, email, senha FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cnpj, email, senha) {
    var instrucaoSql = `
        INSERT INTO empresa (nome, cnpj, email, senha) VALUES ('${nome}', '${cnpj}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(id, nome, cnpj, email, senha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", id, nome, cnpj, email, senha);
    var instrucaoSql = `
        UPDATE empresa SET nome = '${nome}', cnpj = '${cnpj}', email = '${email}', senha = '${senha}' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    let sql = `DELETE FROM usuario WHERE fkEmpresa = ${id}`
    database.executar(sql)
    sql = `DELETE FROM logJAR WHERE fkEmpresa = ${id}`
    database.executar(sql)
    sql = `DELETE FROM recomendacaoIA WHERE fkEmpresa = ${id}`
    database.executar(sql)
    sql = `DELETE FROM leitura WHERE fkEmpresa = ${id}`
    database.executar(sql)
    sql = `DELETE FROM parametroRecomendacao WHERE fkEmpresa = ${id}`
    database.executar(sql)
    sql = `DELETE FROM empresa WHERE id = ${id}`
    return database.executar(sql);
}


module.exports = {
    autenticar,
    cadastrar,
    editar,
    deletar
};