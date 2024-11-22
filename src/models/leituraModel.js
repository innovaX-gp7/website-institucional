var database = require("../database/config")

function getLeituraByIdEmpresa(idEmpresa) {
    const sql = `SELECT * FROM leitura WHERE fkEmpresa = ${idEmpresa};`
    return database.executar(sql)
}

module.exports = {
    getLeituraByIdEmpresa
};