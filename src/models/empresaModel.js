var database = require("../database/config")


function editar(idEmpresa, razaoSocial, nomeFantasia, cnpj) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idEmpresa, cnpj, nomeFantasia, razaoSocial);
    var instrucaoSql = `
        UPDATE empresa SET razaoSocial = '${razaoSocial}', nomeFantasia = '${nomeFantasia}', cnpj = '${cnpj}', modified_at = now() WHERE id = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idEmpresa) {
    let sql = `DELETE FROM usuario WHERE fkEmpresa = ${idEmpresa}`
    database.executar(sql)
    sql = `DELETE FROM logJAR WHERE fkEmpresa = ${idEmpresa}`
    database.executar(sql)
    sql = `DELETE FROM recomendacaoIA WHERE fkEmpresa = ${idEmpresa}`
    database.executar(sql)
    sql = `DELETE FROM leitura WHERE fkEmpresa = ${idEmpresa}`
    database.executar(sql)
    sql = `DELETE FROM parametroRecomendacao WHERE fkEmpresa = ${idEmpresa}`
    database.executar(sql)
    sql = `DELETE FROM empresa WHERE id = ${idEmpresa}`
    return database.executar(sql);
}

function getEmpresa(id) {
    let sql = `SELECT * FROM empresa WHERE id = '${id}';`
    let response = database.executar(sql)
    console.log(`Resposta do getEmpresa: ${response}`) 
    return response
}

function getEmpresaByCnpj(cnpj) {
    let sql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}';`
    let response = database.executar(sql)
    console.log(`Resposta do getEmpresa: ${response}`) 
    return response
}


module.exports = {
    editar,
    deletar,
    getEmpresa,
    getEmpresaByCnpj
};