# RENTX 

## 1 - Link da documentação da API rest full - SWAGGER
`[http://localhost:3333/api-docs/](http://localhost:3333/api-docs/)`


## 2 - Sobre a Aplicação


## 3 - Como instalar localmente - passo a passo

### 3.1 - pré-requisitos em sua máquina.

#### O que você precisa ter instalado em sua máquina ? 2 coisas:

[3.1.1 - Docker](https://docs.docker.com/engine/install/)
[3.1.2 - Docker Compose](https://docs.docker.com/compose/install/)

### 3.2 - caso não tenha instalado em sua máquina os 2 itens acima, siga a documentação abaixo para instalar cada um.

#### `[3.1.1 - https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)`
#### `[3.1.2 - https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)`

## 4 - mapeamento de requisitos

## 5 - comandos docker
## Listar todos os containers
` docker ps -a `

## Listar todos os containers em execução
` docker ps `

## Apagar todos os containers
` docker compose down `

## Apagar um container especifico
` docker rm id_container `

## Levantar e iniciar um container do zero
` docker compose up `

## Levantar e iniciar um container do zero rodando em plano de fundo
` docker compose up -d `

## ver os logs do container rodando em plano de fundo
` docker logs name_container -f `

### 6 - comandos typeorm - migrations

## Criar uma migration
` yarn typeorm migration:create -n NameMigration `

## Rodar uma migration 
` yarn typeorm migration:run `


# Cadastro de carro

**Requisitos Funcionais**
1- deve ser possível cadastrar um novo carro

**Requisitos NÃO Funcionais**

**Regras de Negocio**

## 7 - tecnologias ultilizadas

## 8 - contatos do desenvolvedor