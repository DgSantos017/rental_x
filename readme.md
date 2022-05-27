# RENTX 

**Mini-sumário**
- 1 - Link da documentação/endpints da API rest full - SWAGGER
- 2 - Sobre a Aplicação
- 3 - Como rodar o backend localmente - passo a passo
- 4 - Como rodar os testes
- 5 - Mapeamento de requisitos
- 6 - Comandos docker
- 7 - Comandos typeorm - migrations
- 8 - Tecnologias ultilizadas
- 9 - Contatos do desenvolvedor


## 1 - Link da documentação/endpints da API rest full - SWAGGER
[http://localhost:3333/api-docs/](http://localhost:3333/api-docs/)


## 2 - Sobre a Aplicação


## 3 - Como rodar o backend localmente - passo a passo

### 3.1 - pré-requisitos em sua máquina.

#### O que você precisa ter instalado em sua máquina ? só 2 coisinhas, são elas:

[Docker](https://www.docker.com/) <br />
[Docker Compose](https://docs.docker.com/compose/)

### 3.2 - caso não tenha instalado em sua máquina os 2 itens acima, segue o link da documentação abaixo para instalar cada um (docker e docker compose).

[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/) <br />
[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

### 3.3 - faça o fork deste repositório em sua conta do github <br />
- uma vez dentro deste repositório, o botão do Fork fica no canto superior direito da tela
- agora em seu computador, abra o terminal e rode os comandos abaixo de acordo com cada tópico

### 3.4 - com o repositório presente em sua conta do github, faça o clone para vincular a sua máquina.

`git clone https://github.com/DgSantos017/rental_x.git` <br />
ou <br />
`git clone git@github.com:DgSantos017/rental_x.git`

- obs: quando voce fez o Fork, se voce alterou o nome do repositório, substitua também o nome acima `rental_x` pelo nome escolheu na hora do Fork.

### 3.5 - Entre no diretório do projeto
`cd rental_x`

### 3.6 - iniciar e levantar o servidor backend, junto com os containers Docker
#### 3.6.1 - o comando do passo acima, depende da versão do docker compose, voce pode verificar isso com o comando abaixo
`docker compose version`

#### 3.6.2 - se a versão é > 2.0.1, rode o comando abaixo
`docker-compose up -d`


#### 3.6.3 - se a versão é < 1.29, rode o comando abaixo
`docker compose up -d`

- curiosidade: - a flag acima `-d` serve para rodar o docker em plano de fundo

### 3.7 - para confirmação, rode o comando abaixo
`docker logs rentx -f` 

#### 3.7.1 - se estiver tudo ok, a mensagem abaixo vai aparecer
`running in port 3333`

- para facilitar nossas vidas, deixei os comandos Docker e TypeORM(Migrations) que precisam ser usados no tópico 5 e 6 abaixo desta documentação

## 4 - Como rodar os testes
### Rode o comando abaixo
`yarn test`

## 5 - Mapeamento de requisitos

### 4.1 - Cadastro de carro

**Requisitos Funcionais**
- deve ser possível cadastrar um novo carro

**Regras de negócio**
- Não deve ser possível cadastrar um carro com uma placa já existente
- Não deve ser possível alterar a placa de um carro já cadastrado
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro deve ser um user admin

### 4.2 - Listagem de carros

**Requisitos Funcionais**
- deve ser possível listar todos os carros disponíveis

#### 4.3 - Cadastro de especificação no carro

**Requisitos Funcionais**
- deve ser possível cadastrar uma especificação para um carro
- deve ser possível listar todas as especificações
- deve ser possível listar todos os carros

**Regras de negócio**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
- O usuário responsável pelo cadastro deve ser um user admin



## 6 - Comandos docker

### 5.1 - Listar todos os containers criados
` docker ps -a `

### 5.2 - Listar todos os containers rodando em execução
` docker ps `

### 5.3 - Apagar todos os containers
` docker compose down `

###  5.4 - Apagar um container especifico
` docker rm id_container `

### 5.5 - Levantar e iniciar um container do zero
` docker compose up `

### 5.6 - Levantar e iniciar um container do zero rodando em plano de fundo
` docker compose up -d `

### 5.7 - ver os logs do container rodando em plano de fundo
` docker logs name_container -f `

### 5.8 - parar o container que está rodando no diretório presente
`docker compose stop`

### 5.9 - iniciar o container que está rodando no diretório presente
`docker compose start`

## 7 - Comandos typeorm - migrations

### 6.1 - Criar uma migration
` yarn typeorm migration:create -n NameMigration `

### 6.2 - Rodar as migrations que foram criadas
` yarn typeorm migration:run `


## 8 - Tecnologias ultilizadas

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="Node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
<img alt="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
<img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<img alt="PostgreSQL" src ='https://img.shields.io/badge/postgres-%23007ACC.svg?style=for-the-badge&logo=postgres&logoColor=white'>
<img alt="TypeORM" src ='https://img.shields.io/badge/typeorm-%23007ACC.svg?style=for-the-badge&logo=postgtypeormres&logoColor=green'>
<img alt="Insominia" src="https://img.shields.io/badge/insominia-6DA55F?style=for-the-badge&logo=insomnia&logoColor=purple%27%3E"/>
<img alt="Docker" src="https://img.shields.io/badge/docker-%23007ACC.svg?style=for-the-badge&logo=docker&logoColor=white"/>
<img alt="VSCODE" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/>
<img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
<img alt="GitHub" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
<img alt="Linux" src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"/>
<img alt="Ubuntu" src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"/>
<img alt="Heroku" src="https://img.shields.io/badge/heroku-6DA55F?style=for-the-badge&logo=heroku&logoColor=purple%27%3E"/>



## 9 - Contatos do desenvolvedor

<p align="left">
  <a href="https://www.linkedin.com/in/diogo-santos01/" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
  <a href = "mailto:diogosantosferreira.01@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://instagram.com/diogo__.js" target="_blank">
    <img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
    <a target="_blank" href="https://wa.me/5598981163277"><img target="_blank" src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"></a> 
</p>  

---
⌨️ made with ❤️ by [Diogo Santos](https://gist.github.com/DgSantos017) 😊
