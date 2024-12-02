var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(parametro, fkEmpresa, fkTipoParametro) {
    var instrucaoSql = `
        INSERT IGNORE INTO parametroRecomendacao (parametro, fkEmpresa, fkTipoParametro) VALUES ('${parametro}', '${fkEmpresa}', '${fkTipoParametro}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function editar(parametro,  idEmpresa, fkTipoParametro) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",parametro,  fkTipoParametro);
    var instrucaoSql = `
        UPDATE parametroRecomendacao SET parametro = '${parametro}', modified_at = now() WHERE fkTipoParametro = ${fkTipoParametro} AND fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAllParametro(idEmpresa) {
    const instrucaoSql = `SELECT * FROM parametroRecomendacao WHERE fkEmpresa = ${idEmpresa}`
    return database.executar(instrucaoSql)
}

function deletarParametro(idEmpresa) {
    const instrucaoSql = `DELETE FROM parametroRecomendacao WHERE fkEmpresa = ${idEmpresa}`
    return database.executar(instrucaoSql)
}

module.exports = {
    cadastrar,
    editar,
    getAllParametro,
    deletarParametro
};