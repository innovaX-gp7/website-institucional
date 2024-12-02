var database = require("../database/config")

function getLeituraDesmatamentoAtual() {
    const sql = `
        SELECT 
            unidadeFederativa,
            SUM(areaDesmatada) AS areaDesmatada
        FROM leitura
        WHERE areaDesmatada IS NOT NULL
        GROUP BY unidadeFederativa;
    `
    return database.executar(sql)
}

function getAlteracaoTemperaturaTotal() {
    const sql = `
            WITH MaxAno AS (
            -- Encontrar o ano mais recente presente na tabela
            SELECT MAX(ano) AS anoMaisRecente
            FROM leitura
            WHERE temperaturaMensal IS NOT NULL
        ),
        AnoAnterior AS (
            -- Encontrar o ano anterior ao mais recente
            SELECT (anoMaisRecente - 1) AS anoAnterior
            FROM MaxAno
        ),
        CTE AS (
            -- Selecionar as temperaturas para os anos 2024 e 2023
            SELECT 
                ano, 
                temperaturaMensal
            FROM leitura
            WHERE temperaturaMensal IS NOT NULL
            AND (ano = (SELECT anoMaisRecente FROM MaxAno) OR ano = (SELECT anoAnterior FROM AnoAnterior))
        )
        -- Calcular a média geral de temperatura para cada ano
        SELECT 
            'Geral' AS unidadeFederativa, 
            (SELECT anoMaisRecente FROM MaxAno) AS ano_recente,
            (SELECT anoAnterior FROM AnoAnterior) AS ano_anterior,
            ROUND(
                (AVG(CASE WHEN ano = (SELECT anoMaisRecente FROM MaxAno) THEN temperaturaMensal END) 
                - AVG(CASE WHEN ano = (SELECT anoAnterior FROM AnoAnterior) THEN temperaturaMensal END)) 
                / AVG(CASE WHEN ano = (SELECT anoAnterior FROM AnoAnterior) THEN temperaturaMensal END) * 100, 
                2
            ) AS diferenca_percentual
        FROM CTE;
    `

    return database.executar(sql)
}

function getMaiorDesmatamentoPercentual() {
    const sql = `
        with anoAnterior as (
            select unidadeFederativa, sum(areaDesmatada) somaDesmatamento
            from leitura
            where ano = year(curdate()) - 2
            group by unidadeFederativa
        ), anoAtual as (
            select unidadeFederativa, sum(areaDesmatada) somaDesmatamento
            from leitura
            where ano = year(curdate()) - 1
            group by unidadeFederativa
        )
        select anoAtual.unidadeFederativa, (anoAtual.somaDesmatamento - anoAnterior.somaDesmatamento)/anoAnterior.somaDesmatamento * 100 AS percentual
        from anoAtual
        join anoAnterior on anoAnterior.unidadeFederativa = anoAtual.unidadeFederativa
        where (anoAtual.somaDesmatamento - anoAnterior.somaDesmatamento) = (
            select max(anoAtual.somaDesmatamento - anoAnterior.somaDesmatamento)
            from anoAtual
            join anoAnterior on anoAnterior.unidadeFederativa = anoAtual.unidadeFederativa
        );
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