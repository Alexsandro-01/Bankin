# Boas Vindas ao repositório do Bankin



## Contexto
Aplicação web fullstack, simulando uma carteira digital, que possibilita usuários se cadastrarem na aplicação, realizarem login e  conseguirem realizar transferências entre si.

## Tecnologias usadas

Front-end:

> Desenvolvido usando: 
* `React`
* `Typescript`
* `React-hooks`
* `CSS3`
* `HTML5`

Back-end:

> Desenvolvido usando:
* `NodeJS`
* `Typescript`
* `ExpressJS`
* `Sequelize-ORM`
* `PostgresSQL`
* `Jsonwebtoken`
* `Docker`

#

## Iniciando o projeto

> **Warning**: Na raíz do diretório de backend, há um arquivo chamado `jwt.key.example`. Antes de iniciar o projeto, troque o nome do arquivo para `jwt.key`. Esse arquivo é utilizado pelo jsonwebtoken para acriação de token para os usuários, o conteúdo pode 
ser trocado para uma chave de sua preferência.

<br />
O projeto está configurado com docker-compose, para iniciar o projeto basta executar o comando abaixo no terminal da raíz do projeto.

**Note**: As portas `3000`, `3001` e `5432` precisam estar livres para a plicação funcionar corretamente.

```bash
  docker-compose up
```

Para derrubar os serviços use

```bash
  docker-compose down
```

#

## Acessando os serviços

Front-end: `localhost:3000/` <br />
Back-end: `localhost:3001/` <br />

## Documentação da API

<b>Postman:</b> Há uma collection do `Postman` na raíz do diretório de Back-end chamada `Bankin.postman_collection.json`. Caso queira utilizar, basta importá-la no `Postman`. Essa coleção foi utilizada por mim enquanto construia a API. Alguns dados como `Bearer token`, com certeza vão estar desatualizados, então precisam ser substituídos pelos criados quando a aplicação estiver funcionando.

