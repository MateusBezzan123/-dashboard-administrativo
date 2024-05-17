# Dashboard Administrativo

Um dashboard administrativo simples para gerenciar uma lista de funcionários, incluindo funcionalidades de criação, leitura, atualização e exclusão de registros de funcionários.

## Funcionalidades

1. **Página Inicial do Dashboard**:
   - Exibição de uma tabela de funcionários com colunas para nome, cargo, departamento e ações (editar/excluir).
   - Botão para adicionar um novo funcionário.
   - Funcionalidade de ordenação e busca na lista de funcionários.

2. **Página de Adicionar Funcionário**:
   - Formulário para adicionar um novo funcionário com campos para nome, cargo, departamento e data de admissão.
   - Validação dos campos do formulário antes de enviar.

3. **Página de Editar Funcionário**:
   - Formulário para editar os detalhes de um funcionário existente.
   - Preenchimento automático do formulário com os detalhes atuais do funcionário.
   - Validação dos campos do formulário antes de enviar.

4. **API do Backend**:
   - Endpoints RESTful para operações CRUD:
     - `GET /api/employees` - Recuperar todos os funcionários.
     - `GET /api/employees/:id` - Recuperar um único funcionário pelo ID.
     - `POST /api/employees` - Criar um novo funcionário.
     - `PUT /api/employees/:id` - Atualizar um funcionário pelo ID.
     - `DELETE /api/employees/:id` - Excluir um funcionário pelo ID.

## Tecnologias Utilizadas

### Frontend
- **Framework**: Next.js
- **UI**: Chakra UI
- **Linguagem**: TypeScript

### Backend
- **Servidor**: Node.js com Express.js
- **Banco de Dados**: MongoDB (Mongoose)

## Como Executar o Projeto

### Frontend
1. Navegue até o diretório `employee-dashboard`:
   ```bash
   cd employee-dashboard
