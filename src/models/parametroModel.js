var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(parametro, fkEmpresa, fkTipoParametro) {
    var instrucaoSql = `
        INSERT INTO parametroRecomendacao (parametro, fkEmpresa, fkTipoParametro) VALUES ('${parametro}', '${fkEmpresa}', '${fkTipoParametro}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function editar(id, parametro) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", id, parametro);
    var instrucaoSql = `
        UPDATE parametroRecomendacao SET modified_at = now() WHERE id = ${id};
    `;
    database.executar(instrucaoSql);
    var instrucaoSql = `
        UPDATE parametroRecomendacao SET parametro = '${parametro}' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAllParametro(idEmpresa) {
    const instrucaoSql = `SELECT * FROM parametroRecomendacao WHERE fkEmpresa = ${idEmpresa}`
    return database.executar(instrucaoSql)
}

function deletarParametro(id) {
    const instrucaoSql = `DELETE FROM parametroRecomendacao WHERE id = ${id}`
    return database.executar(instrucaoSql)
}

module.exports = {
    cadastrar,
    editar,
    getAllParametro,
    deletarParametro
};