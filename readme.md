# Projeto Node.js com TypeScript

Este é um projeto backend utilizando Node.js com TypeScript. O projeto segue uma arquitetura organizada em camadas, utilizando boas práticas de desenvolvimento, e é configurado para ser escalável e fácil de manter.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tutoriais](#tutoriais)
  - [Como Criar um Novo Endpoint](#como-criar-um-novo-endpoint)

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado na sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 20 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd nome-do-repositorio
   ```
3. Criação do arquivo `.env`

No diretório do projeto, há um arquivo chamado `.env-example`, você precisa criar um novo arquivo chamado `.env`, copiando os mesmos itens e preenchendo-os com os valores corretos.

4. Instale as dependências:
   ```bash
   npm install
   ```
5. Inicie o Projeto
   ```bash
   npm start
   ```

# Estrutura do Projeto

```
src/
├── business/
├── config/
├── controllers/
├── database/
├── models/
├── repository/
├── routes/
├── services/
```

- business/: Intermediário entre controllers e services, e lidando com a validação e regras.
- config/: Configurações da aplicação.
- controllers/: Contém os controladores que lidam com as requisições HTTP.
- database/: configuração do banco.
- models/: Define os modelos de dados (ORM).
- repository/: Camada de acesso ao banco de dados.
- routes/: Define as rotas da aplicação.
- services/: Contém a validação da persistencia dos dados e é responsável por chamar a repository

# Tutoriais

## Como Criar um Novo Endpoint

Vamos criar um novo endpoint de exemplo para manipular uma entidade `User`. O endpoint será `/api/users`.

Para isso vai ser criado seguindo a seguinte ideologia, divisão de responsabilidade e uso de `Interface` e `Injação de Dependência`, cada classe vai ter sua interface, exemplo:

**FAÇA EM ARQUIVOS SEPARADOS**

```typescript
interface ControllerInterface{
  funca1();
  funcao2();
}

@injectable()
class Controller implement ControllerInterface {
  funca1() {
    ...
  }

  funcao2() {
    ...
  }
}
```

Para configurar a injeção de dependência acesse `src\shared\container\index.ts` nesse arquivo deve ser adicionado qual sua classe e qual sua interface

```typescript
this.container
  .bind<UserControllerInterface>('UserControllerInterface')
  .to(UserController);
```

Seguir este padrão para toda a estrutura que possui classes, mesmo em projetos menores, pode não trazer muitas vantagens imediatas. No entanto, é uma boa prática, pois facilita a implementação de testes no futuro e torna o código mais flexível. Por exemplo, se for necessário criar uma nova repository ao mudar o banco de dados, essa abordagem torna o processo mais prático e **seguro**.

`Router -> Controller -> Business -> Service -> Repository`

1. Criando a Rota
   No arquivo `src/routes/userRoute.ts`, adicione o seguinte código:

```typescript
const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.post('/', UserController.createUser);

export default userRouter;
```

E no arquivo src/routes/index.ts, importe e adicione a rota:

```typescript
const routes = Router();

routes.use('/api/users', userRouter);

export default routes;
```

2. Criando o Controller

No arquivo `src/controllers/UserController.ts`, crie o seguinte código:

```typescript
interface UserControllerInterface {
  getUser(req: Request, res: Response): Promise<void>;
  createUser(req: Request, res: Response): Promise<void>;
}

@injectable()
class UserController implement UserControllerInterface{
  public static async getAllUsers(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const users = await UserBusiness.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async createUser(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const user = await UserBusiness.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
```

3. Criando o Business

No arquivo `src/business/UserBusiness.ts`, adicione o seguinte:

```typescript
interface UserBusinessInterface {
  getUser(): Promise<User[]>;
  createUser(data: Partial<User>): Promise<User>;
}

@injectable()
class UserBusiness {
  public static async getAllUsers(): Promise<User[]> {
    return await UserService.getAllUsers();
  }

  public static async createUser(data: Partial<User>): Promise<User> {
    return await UserService.createUser(data);
  }
}

export default UserBusiness;
```

4. Criando o Service

No arquivo `src/services/UserService.ts`, adicione o seguinte:

```typescript
interface UserServiceInterface {
  getAllUsers(): Promise<User[]>;
  createUser(data: Partial<User>): Promise<User>;
}

@injectable()
class UserService {
  public static async getAllUsers() {
    return await UserRepository.findAll();
  }

  public static async createUser(data: any) {
    return await UserRepository.create(data);
  }
}

export default UserService;
```

5. Criando o Repositório
   No arquivo src/repositories/UserRepository.ts, adicione o seguinte:

```typescript
import { prismaClient } from '../../database/prismaClient';

interface UserRepositoryInterface {
  findAll(): Promise<User[]>;
  create(data: Partial<User>): Promise<User>;
}

@injectable()
class UserRepository {
  public static async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  public static async create(data: Partial<User>): Promise<User> {
    return await prisma.user.create({ data });
  }
}

export default UserRepository;
```

6. Criando o Modelo

Caso a tabela não exista no arquivo `prisma/schema.prisma` é necessário criar a sua tabela:

```prisma
model User {
  id         String   @id @default(uuid())
  email      String   @unique
  name       String
  password   String
  createdAt  DateTime @default(now())
  updatedAt  DateTime? @default(now())
  deletedAt  DateTime?

  @@map("users")
}
```

Após escrever sua tabela é necessario rodar um comando para ele executar a alterção do banco usando migrations

```
npm prisma migrate dev --name create_users_table
```
