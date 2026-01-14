# ✈️ FlightOnTime - Frontend

Sistema de monitoramento e predição de atrasos de voos em tempo real desenvolvido para hackaton.

Frontend React para o sistema de predição de atrasos de voos. Aplicação desenvolvida com React 19, TypeScript, shadcn/ui e Tailwind CSS 4.

## 📋 Sobre o Projeto

FlightOnTime é uma aplicação web que permite aos usuários fazer predições de atrasos de voos usando Machine Learning, monitorar informações de voos em tempo real, visualizar estatísticas e acessar um dashboard completo com dados meteorológicos e histórico de predições.

## 🚀 Funcionalidades

- ✅ **Autenticação JWT**: Sistema completo de login e registro com proteção de rotas
- ✅ **Dashboard Interativo**: Interface intuitiva para fazer predições de voos
- ✅ **Predição de Atrasos**: Formulário completo para predição usando Machine Learning
- ✅ **Visualização de Resultados**: Exibe probabilidade de atraso e dados meteorológicos em tempo real
- ✅ **Histórico de Voos**: Lista todas as predições realizadas com filtros avançados
- ✅ **Estatísticas**: Visualização de dados e análises de voos
- ✅ **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- ✅ **Componentes Reutilizáveis**: Usando shadcn/ui e Radix UI para componentes consistentes
- ✅ **Temas**: Suporte a tema claro e escuro com next-themes
- ✅ **Notificações**: Sistema de toast com Sonner para feedback ao usuário

## 🛠️ Tecnologias

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool ultrarrápido e dev server
- **React Router DOM 7** - Roteamento de páginas SPA
- **Tailwind CSS 4** - Framework CSS utility-first moderno
- **shadcn/ui** - Componentes de UI construídos com Radix UI
- **Radix UI** - Primitivos acessíveis para componentes React
- **Lucide React** - Biblioteca de ícones moderna
- **Sonner** - Notificações toast elegantes
- **next-themes** - Gerenciamento de temas
- **CMDK** - Command menu para busca rápida

## 📋 Pré-requisitos

- **Node.js 18+** ou superior
- **pnpm** (gerenciador de pacotes)
- **Backend API** rodando na porta 8080
- **API Python de Predição** rodando na porta 8000

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/RavyBomfim/FlightOnTime-FrontEnd.git
cd FlightOnTime-FrontEnd
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure a URL do backend (opcional)

Se o backend estiver rodando em uma porta diferente de 8080, edite o arquivo `src/lib/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:8080/api";
```

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em: **http://localhost:5173**

## 🏃‍♂️ Scripts Disponíveis

```bash
# Modo desenvolvimento com hot reload
pnpm dev

# Build para produção
pnpm build

# Preview do build de produção
pnpm preview

# Lint do código
pnpm lint
```

## 📖 Como Usar

### 1. Criar uma Conta

- Acesse a aplicação em `http://localhost:5173`
- Clique em "Registre-se" no header ou na página inicial
- Preencha seu email e senha (mínimo 6 caracteres)
- Clique em "Registrar"
- Você será redirecionado para a página de login

### 2. Fazer Login

- Na página de login, insira seu email e senha cadastrados
- Clique em "Entrar"
- Você será redirecionado automaticamente para o Dashboard

### 3. Fazer uma Predição de Voo

No Dashboard:

1. **Companhia Aérea**: Digite o código de 3 letras (ex: GOL, LATAM, Azul)
2. **Aeroporto de Origem**: Digite o código ICAO de 4 letras (ex: SBGR, SBBR)
3. **Aeroporto de Destino**: Digite o código ICAO de 4 letras (ex: SBSP, SBGL)
4. **Data e Hora de Partida**: Selecione a data e hora desejada do voo
5. Clique em "Fazer Predição"

### 4. Visualizar Resultados

Após a predição, você verá:

- **Status do Voo**: Indicador visual se o voo está Atrasado ou Pontual
- **Probabilidade**: Percentual exato de chance de atraso/pontualidade
- **Condições Meteorológicas**: Temperatura, precipitação e velocidade do vento
- **Detalhes do Voo**: Informações completas da rota, horários e companhia aérea

### 5. Histórico de Voos

- Navegue até a página "Flights" (Histórico) através do menu
- Veja todas as predições realizadas em formato de tabela
- **Filtre** por status: Todos, Atrasados ou Pontuais
- **Busque** por aeroporto, companhia ou outros campos
- **Delete** predições antigas clicando no ícone da lixeira

### 6. Estatísticas

- Acesse a página "Stats" para visualizar estatísticas gerais
- Veja análises e gráficos sobre predições realizadas

## 📁 Estrutura do Projeto

```
FlightOnTime-FrontEnd/
├── public/                        # Arquivos estáticos
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes shadcn/ui
│   │   │   ├── alert.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── combobox.tsx
│   │   │   ├── command.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sonner.tsx
│   │   │   └── table.tsx
│   │   ├── header.tsx             # Header com navegação
│   │   ├── footer.tsx             # Footer da aplicação
│   │   └── ProtectedRoute.tsx     # Proteção de rotas autenticadas
│   ├── contexts/
│   │   ├── AuthContext.tsx        # Contexto de autenticação JWT
│   │   └── DataContext.tsx        # Contexto de dados globais
│   ├── lib/
│   │   ├── api.ts                 # Serviço de API e requisições HTTP
│   │   └── utils.ts               # Funções utilitárias (cn, etc)
│   ├── pages/
│   │   ├── HomePage.tsx           # Página inicial/landing
│   │   ├── LoginPage.tsx          # Página de autenticação
│   │   ├── RegisterPage.tsx       # Página de cadastro
│   │   ├── DashboardPage.tsx      # Dashboard principal com predições
│   │   ├── FlightsPage.tsx        # Histórico de voos e filtros
│   │   └── StatsPage.tsx          # Estatísticas e análises
│   ├── assets/                    # Imagens e recursos
│   ├── App.tsx                    # Componente raiz com rotas
│   ├── App.css                    # Estilos globais
│   ├── main.tsx                   # Entry point da aplicação
│   └── index.css                  # Estilos Tailwind base
├── components.json                # Configuração shadcn/ui
├── tailwind.config.ts             # Configuração Tailwind CSS
├── tsconfig.json                  # Configuração TypeScript
├── vite.config.ts                 # Configuração Vite
└── package.json                   # Dependências e scripts
```

## 🌐 Páginas e Rotas

| Rota         | Componente    | Descrição                                   | Proteção  |
| ------------ | ------------- | ------------------------------------------- | --------- |
| `/`          | HomePage      | Página inicial/landing page                 | Pública   |
| `/login`     | LoginPage     | Autenticação de usuários                    | Pública   |
| `/register`  | RegisterPage  | Cadastro de novos usuários                  | Pública   |
| `/dashboard` | DashboardPage | Painel principal com formulário de predição | Protegida |
| `/flights`   | FlightsPage   | Listagem e busca de histórico de voos       | Protegida |
| `/stats`     | StatsPage     | Estatísticas e análises de dados            | Protegida |

## 🔐 Autenticação

O projeto utiliza um sistema de autenticação JWT completo:

- **AuthContext**: Gerencia estado de autenticação global
- **ProtectedRoute**: HOC que protege rotas privadas
- **Token JWT**: Armazenado no localStorage
- **Renovação automática**: Refresh token quando necessário
- **Redirecionamento**: Redireciona para login quando não autenticado

## 🎨 Componentes UI

O projeto utiliza componentes customizados baseados em **shadcn/ui** e **Radix UI**:

- **Alert** - Alertas e mensagens
- **Badge** - Tags e indicadores de status
- **Button** - Botões com variantes (default, outline, ghost, etc)
- **Card** - Cartões de conteúdo
- **Combobox** - Seletor com busca
- **Command** - Command palette/menu
- **Dialog** - Modais e diálogos
- **Input** - Campos de entrada de texto
- **Label** - Rótulos para formulários
- **Popover** - Popups e tooltips
- **Separator** - Divisores visuais
- **Sonner** - Notificações toast
- **Table** - Tabelas de dados

## 🎯 Códigos de Aeroportos (ICAO)

### Principais aeroportos brasileiros:

| Código   | Aeroporto                       | Cidade         |
| -------- | ------------------------------- | -------------- |
| **SBGR** | Guarulhos - GRU                 | São Paulo      |
| **SBSP** | Congonhas - CGH                 | São Paulo      |
| **SBBR** | Presidente Juscelino Kubitschek | Brasília       |
| **SBGL** | Galeão - GIG                    | Rio de Janeiro |
| **SBRF** | Guararapes - REC                | Recife         |
| **SBSV** | Deputado Luís Eduardo Magalhães | Salvador       |
| **SBPA** | Salgado Filho - POA             | Porto Alegre   |
| **SBCT** | Afonso Pena                     | Curitiba       |
| **SBCF** | Tancredo Neves - CNF            | Belo Horizonte |
| **SBKP** | Viracopos - VCP                 | Campinas       |

### Principais Companhias Aéreas:

- **GOL** - Gol Linhas Aéreas
- **TAM** / **LATAM** - LATAM Airlines Brasil
- **AZU** / **Azul** - Azul Linhas Aéreas Brasileiras
- **AAL** - American Airlines
- **UAL** - United Airlines

## 🔗 Links Relacionados

- **Backend API**: [FlightOnTime-BackEnd](https://github.com/RavyBomfim/FlightOnTime-BackEnd)
- **API Python de Machine Learning**: [FlightOnTime-DataScience](https://github.com/RavyBomfim/FlightOnTime-DataScience)

## 🐛 Troubleshooting

### Backend não está respondendo

Verifique se o backend está rodando na porta 8080:

```bash
curl http://localhost:8080/api/health
```

### Erros de predição

Certifique-se de que a API Python está rodando na porta 8000.

### Problemas de CORS

Configure o backend para aceitar requisições do frontend (http://localhost:5173).

## 📝 Licença

Este projeto foi desenvolvido para fins de hackaton.

## 👥 Contribuidores

- [RavyBomfim](https://github.com/RavyBomfim)
