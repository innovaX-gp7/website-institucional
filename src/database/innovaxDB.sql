drop database if exists InnovaxDB;
create database if not exists InnovaxDB;
use InnovaxDB;

create table empresa (
id int not null auto_increment,
razaoSocial varchar(80) not null,
nomeFantasia varchar(50) not null,
cnpj varchar(14) default null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
modified_at datetime,
primary key (id),
unique key cnpj (cnpj)
);

create table userRole(
  id int primary key  not null auto_increment,
  nome varchar(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at datetime
);

create table usuario (
id int not null auto_increment,
nome varchar(50) not null,
cpf varchar(11) default null,
email varchar(45) not null,
senha varchar(45) not null,
fkEmpresa int,
fkUserRole int,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
modified_at datetime,
primary key (id),
unique key email (email),
unique key cpf (cpf),
constraint fk_empresa_funcio foreign key (fkEmpresa) references empresa(id),
constraint fk_role_usuario foreign key (fkUserRole) references userRole(id)
)auto_increment=10;

create table leitura (
id int primary key not null auto_increment,
areaDesmatada decimal (6,2) not null,
temperaturaMensal  decimal (4,2) not null,
precipitacaoMensal decimal (4,2) not null,
cidade varchar(45),
unidadeFederativa varchar(50) not null,
mes tinyint, 
ano year,
fkEmpresa int,
constraint fk_empresa_leitu foreign key (fkEmpresa) references empresa(id)
)auto_increment=100;


create table recomendacao (
id int primary key not null auto_increment,
recomendacao varchar(100) not null,
unidadeFederativa varchar(50) not null,
dataHora datetime not null,
fkEmpresa int,
fkPrompt int,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint fk_empresa foreign key (fkEmpresa) references empresa(id)
)auto_increment=1000;

create table tipoParametro (
id int primary key auto_increment,
nome varchar(45),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
modified_at datetime    
);

create table parametroRecomendacao (
id int primary key not null auto_increment,
parametro DECIMAL(6,2),
fkEmpresa int,
fkTipoParametro int,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
modified_at datetime,
constraint fk_empresa_recom foreign key (fkEmpresa) references empresa(id),
constraint fk_tipo_parametro foreign key (fkTipoParametro) references tipoParametro(id)
);

create table logJAR (
id int primary key auto_increment,
descricao varchar(1000),
dataHora datetime,
fkEmpresa int,
constraint fk_empresa_log foreign key (fkEmpresa) references empresa(id)
);


insert into userRole (nome)
values ('Representante'),
('Gerente'),
('Funcionário');

insert into tipoParametro (nome) values ('Área'),
('Temperatura'),
('Precipitação');