var database = require("../database/config")

async function getByIdEmpresa(id) {
    const sql = `
        SELECT * FROM recomendacao 
        WHERE fkEmpresa = ${id} 
        ORDER BY created_at DESC 
        LIMIT 1;
    `;

    await database.executar(sql);
}

module.exports = {
    getByIdEmpresa
}