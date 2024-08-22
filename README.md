# Projeto Backend com KoaJS e PostgreSQL

Este projeto configura uma API backend utilizando Node.js com o framework KoaJS, integrando com AWS Cognito para autenticação e autorização. O projeto usa PostgreSQL como banco de dados relacional e é gerenciado via Docker Compose para facilitar a configuração e execução.

## Configuração e Execução

### 1. Atualização do Docker Compose

Antes de iniciar, é importante garantir que o arquivo `docker-compose.yml` esteja atualizado com as variáveis corretas. Verifique e ajuste as variáveis de ambiente no arquivo `docker-compose.yml` conforme necessário para a sua configuração.

### 2. Executando o Ambiente

Para iniciar o ambiente, utilize o Docker Compose. Execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build
```

O Docker Compose irá construir as imagens e iniciar os contêineres para a aplicação e o banco de dados.

### 3. Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **`Dockerfile`**: Arquivo para construir a imagem da aplicação.
- **`docker-compose.yml`**: Arquivo para configurar e gerenciar os serviços Docker.
- **`src/`**: Código-fonte da aplicação, incluindo configurações e middleware.

### 4. Rotas da API

- **`/auth`**: Rota pública para autenticação e registro de usuários.
- **`/me`**: Rota protegida para acessar informações do usuário logado.
- **`/edit-account`**: Rota protegida para editar informações da conta do usuário.
- **`/users`**: Rota protegida para listar todos os usuários (somente admin).
- **`/confirm`**: Rota para confirmar conta através do código de confirmação vindo do Cognito.

### 5. Verificando Logs

Para visualizar os logs dos contêineres, você pode usar:

```bash
docker-compose logs
```

Para logs de um serviço específico, use:

```bash
docker-compose logs <NOME_DO_SERVIÇO>
```

### 6. Parando os Contêineres

Para parar os contêineres, use:

```bash
docker-compose down
```

### 7. Limpeza (Opcional)

Se precisar limpar volumes persistentes e recriar o ambiente do zero, use:

```bash
docker-compose down -v
docker-compose up --build
```

### 8. Referências

- [Documentação do Docker](https://docs.docker.com/)
- [Documentação do Docker Compose](https://docs.docker.com/compose/)
- [Documentação do KoaJS](https://koajs.com/)
- [Documentação do TypeORM](https://typeorm.io/)