var database = require("../database/config")

function getByIdEmpresa(id) {
    const sql = `
        SELECT * FROM recomendacao 
        WHERE fkEmpresa = ${id} 
        ORDER BY created_at DESC 
        LIMIT 1;
    `;

    return database.executar(sql);
}

module.exports = {
    getByIdEmpresa
}