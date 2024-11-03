
create database if not exists InnovaxDB;
use InnovaxDB;

create table empresa (
id int not null auto_increment,
nome varchar(50) not null,
email varchar(45) not null,
cnpj varchar(14) default null,
senha varchar(45) not null,
primary key (id),
unique key email (email),
unique key cnpj (cnpj)
);

create table funcionario (
id int not null auto_increment,
nome varchar(50) not null,
cpf varchar(11) default null,
email varchar(45) not null,
senha varchar(45) not null,
primary key (id),
unique key email (email),
unique key cnpj (cpf),
fkEmpresaFuncio int,
constraint fk_empresa_funcio foreign key (fkEmpresaFuncio) references empresa(id)
)auto_increment=10;

create table leitura (
id int primary key not null auto_increment,
areaDesmatada decimal (4,2) not null,
temperaturaMensal  decimal (4,2) not null,
precipitacaoMensal decimal (4,2) not null,
cidade varchar(45),
unidadeFederativa varchar(50),
mes tinyint, 
ano year
)auto_increment=100;


create table recomendacoesIA (
id int primary key not null auto_increment,
unidadeFederativa varchar(50) not null,
recomendacao varchar(100) not null,
fkEmpresa int,
constraint fk_empresa foreign key (fkEmpresa) references empresa(id)
)auto_increment=1000;


create table parametrosRecomendacoes (
id int primary key not null auto_increment,
limiteArea decimal (4,2),
horarioNotificacoes time,
fkEmpresaRecomendacoes int,
constraint fk_empresa_recom foreign key (fkEmpresaRecomendacoes) references empresa(id)
);


create table logsJAR (
id int primary key auto_increment,
descricao varchar(1000),
dataHora datetime,
fkLogEmpresa int,
constraint fk_empresa_log foreign key (fkLogEmpresa) references empresa(id)
);

create table promptIA (
id int primary key auto_increment,
descricao varchar(1000),
dataHora datetime
);










