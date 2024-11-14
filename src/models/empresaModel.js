var database = require("../database/config")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
/*function cadastrar(razaoSocial, nomeFantasia, cnpj) {
    var instrucaoSql = `
        INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj) VALUES ('${razaoSocial}','${nomeFantasia}','${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} */

function editar(id, razaoSocial, nomeFantasia, cnpj) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", id, nome, cnpj, email, senha);
    var instrucaoSql = `
        UPDATE empresa SET razaoSocial = '${razaoSocial}' , nomeFantasia = '${nomeFantasia}', cnpj = '${cnpj}' WHERE id = ${id};
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

function getEmpresa(cnpj) {
    let sql = `SELECT id FROM empresa WHERE cnpj = ${cnpj};`

    return database.executar(sql)
}


module.exports = {
    editar,
    deletar,
    getEmpresa
};