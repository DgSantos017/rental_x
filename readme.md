### Documentation
http://localhost/3000/api-docs

# DOCKER

## Listar todos os containers
### docker ps -a

## Listar todos os containers em execução
### docker ps

## Apagar todos os containers
### docker compose down

## Apagar um container especifico
### docker rm id_container

## Levantar e iniciar um container do zero
### docker compose up 

## Levantar e iniciar um container do zero em plano de fundo
### docker compose up -d

## ver os logs do container rodando em plano de fundo
### docker logs name_container -f


# MIGRATIONS

## CRIAR UMA MIGRATION
### yarn typeorm migration:create src/database/migrations/name_migration