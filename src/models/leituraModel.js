var database = require("../database/config")

function getLeituraByIdEmpresa(idEmpresa) {
    const sql = `
        SELECT *
        FROM leitura l
        WHERE l.ano = (
            SELECT MAX(l2.ano)
            FROM leitura l2
            WHERE l2.unidadeFederativa = l.unidadeFederativa
        ) 
        AND l.mes = (
            SELECT MAX(l3.mes)
            FROM leitura l3
            WHERE l3.unidadeFederativa = l.unidadeFederativa
            AND l3.ano = l.ano
        )
        AND fkEmpresa = 8;`
    return database.executar(sql)
}

module.exports = {
    getLeituraByIdEmpresa
};