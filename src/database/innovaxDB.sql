
create database if not exists InnovaxDB;
use innovaxDB;

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
fk_empresa_funcio int,
constraint fk_empresa_funcio foreign key (fk_empresa_funcio) references empresa(id)
)auto_increment=10;

create table dashboard (
id int primary key not null auto_increment,
unidadeFederativa varchar(50) not null,
mes tinyint, 
ano year,
areaDesmatada decimal (4,2) not null,
temperaturaMensal  decimal (4,2) not null,
precipitaçãoMensal decimal (4,2) not null,
fk_empresa int,
constraint fk_empresa foreign key (fk_empresa) references empresa(id)
)auto_increment=100;


create table recomendacoesIA (
id int primary key not null auto_increment,
unidadeFederativa varchar(50) not null,
recomendacao varchar(100) not null,
fk_dashboard int,
constraint fk_dashboard foreign key (fk_dashboard) references dashboard(id)
)auto_increment=1000;


create table parametrosRecomendacoes (
id int primary key not null auto_increment,
limiteArea decimal (4,2),
horarioNotificacoes time,
fk_empresa_recom int,
constraint fk_empresa_recom foreign key (fk_empresa_recom) references empresa(id)
)auto_increment=10000;







