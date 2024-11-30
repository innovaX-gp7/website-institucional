var database = require("../database/config")

function getLeituraDesmatamentoAtual() {
    const sql = `
        WITH ranked_data AS (
        SELECT 
            unidadeFederativa,
            ano,
            mes,
            areaDesmatada,
            ROW_NUMBER() OVER (PARTITION BY unidadeFederativa ORDER BY ano DESC, mes DESC) AS rn
        FROM leitura
        WHERE areaDesmatada IS NOT NULL
    )
    SELECT 
        unidadeFederativa,
        ano,
        mes,
        areaDesmatada
    FROM ranked_data
    WHERE rn = 1;
    `
    return database.executar(sql)
}

function getAlteracaoTemperaturaTotal(idEmpresa) {
    const sql = `
    SELECT 
    ROUND(
        (SUM(l1.temperaturaMensal) - SUM(IFNULL(l2.temperaturaMensal, 0))) / SUM(IFNULL(l2.temperaturaMensal, 1)) * 100, 
        2
    ) AS alteracaoPercentualTotalTemperatura
    FROM 
        leitura l1
    LEFT JOIN 
        leitura l2
    ON 
        l1.unidadeFederativa = l2.unidadeFederativa
        AND l1.ano = l2.ano + 1 
    WHERE 
        l1.fkEmpresa = ${idEmpresa}
        AND EXISTS (
            SELECT 1
            FROM leitura l3
            WHERE l3.fkEmpresa = ${idEmpresa} 
            AND l3.ano = l1.ano - 1 
            AND l3.unidadeFederativa = l1.unidadeFederativa
        );
    `

    return database.executar(sql)
}

function getMaiorDesmatamentoPercentual() {
    const sql = `
        SELECT 
    l1.unidadeFederativa,
    ROUND((l1.areaDesmatada - l2.areaDesmatada), 2) AS diferencaDesmatamento
    FROM 
        leitura l1
    JOIN 
        leitura l2
    ON 
        l1.unidadeFederativa = l2.unidadeFederativa
        AND l1.ano = l2.ano + 1
        LIMIT 1;
    `

    return database.executar(sql)
}

function getDesmatamentoTotalComparadoAnoAnterior() {
    const sql = `
            SELECT 
            ROUND(
                (SUM(l1.areaDesmatada) - SUM(IFNULL(l2.areaDesmatada, 0))) / NULLIF(SUM(IFNULL(l2.areaDesmatada, 1)), 0) * 100,
                2
            ) AS desmatamentoTotalComparadoPercentual
        FROM 
            leitura l1
        LEFT JOIN 
            leitura l2
            ON l1.unidadeFederativa = l2.unidadeFederativa
            AND l1.ano = l2.ano + 1  -- Comparando o ano atual com o ano anterior
        WHERE 
            l1.areaDesmatada IS NOT NULL  -- Garantir que há dados para o ano atual
            AND l2.areaDesmatada IS NOT NULL  -- Garantir que há dados para o ano anterior
            AND l1.ano = YEAR(CURDATE());  -- Ano atual
    `

    return database.executar(sql)
}

function getPrecipitacaoTemperaturaAtuais() {
    const sql = `
WITH ranked_data AS (
    SELECT 
        unidadeFederativa,
        ano,
        mes,
        temperaturaMensal,
        precipitacaoMensal,
        ROW_NUMBER() OVER (PARTITION BY unidadeFederativa ORDER BY ano DESC, mes DESC) AS rn
    FROM leitura
    WHERE unidadeFederativa IS NOT NULL 
      AND temperaturaMensal IS NOT NULL 
      AND precipitacaoMensal IS NOT NULL
)
    SELECT 
        unidadeFederativa,
        ano,
        mes,
        temperaturaMensal,
        precipitacaoMensal
    FROM ranked_data
    WHERE rn = 1;
    `
    return database.executar(sql)
}


module.exports = {
    getPrecipitacaoTemperaturaAtuais,
    getLeituraDesmatamentoAtual,
    getAlteracaoTemperaturaTotal,
    getMaiorDesmatamentoPercentual,
    getDesmatamentoTotalComparadoAnoAnterior,
};