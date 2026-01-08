# Flight on Time - Frontend

Frontend React para o sistema de predição de atrasos de voos. Aplicação desenvolvida com React, TypeScript, shadcn/ui e Tailwind CSS.

## 🚀 Funcionalidades

- ✅ **Autenticação JWT**: Sistema completo de login e registro
- ✅ **Dashboard Interativo**: Interface intuitiva para fazer predições de voos
- ✅ **Predição de Atrasos**: Formulário para predição usando Machine Learning
- ✅ **Visualização de Resultados**: Exibe probabilidade de atraso e dados meteorológicos
- ✅ **Histórico de Voos**: Lista todas as predições realizadas com filtros
- ✅ **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela
- ✅ **Componentes Reutilizáveis**: Usando shadcn/ui para componentes consistentes

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router** - Navegação
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ ou superior
- pnpm (gerenciador de pacotes)
- **Backend API** rodando na porta 8080
- **API Python de Predição** rodando na porta 8000

## 🔧 Instalação

### 1. Instale as dependências

```bash
pnpm install
```

### 2. Configure a URL do backend (opcional)

Se o backend estiver rodando em uma porta diferente de 8080, edite o arquivo `src/lib/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:8080/api";
```

### 3. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em: `http://localhost:5173`

## 📖 Como Usar

### 1. Criar uma Conta

- Acesse a página de registro clicando em "Registre-se"
- Preencha seu email e senha (mínimo 6 caracteres)
- Clique em "Registrar"

### 2. Fazer Login

- Na página de login, insira seu email e senha
- Clique em "Entrar"
- Você será redirecionado para o Dashboard

### 3. Fazer uma Predição

No Dashboard:

1. **Companhia Aérea**: Digite o código de 3 letras (ex: GOL, LATAM, Azul)
2. **Aeroporto de Origem**: Digite o código ICAO de 4 letras (ex: SBGR, SBBR)
3. **Aeroporto de Destino**: Digite o código ICAO de 4 letras (ex: SBSP, SBGL)
4. **Data e Hora de Partida**: Selecione a data e hora desejada
5. Clique em "Fazer Predição"

### 4. Visualizar Resultados

Após a predição, você verá:

- **Status do Voo**: Atrasado ou Pontual
- **Probabilidade**: Percentual de chance de atraso/pontualidade
- **Condições Meteorológicas**: Temperatura, precipitação e vento
- **Detalhes do Voo**: Informações completas da rota

### 5. Histórico de Voos

- Clique em "Histórico" no topo da página
- Veja todas as predições realizadas
- Filtre por: Todos, Atrasados ou Pontuais
- Delete predições antigas clicando no ícone da lixeira

## 🗂️ Estrutura do Projeto

```
FlightOnTime-FrontEnd/
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes shadcn/ui
│   │   └── ProtectedRoute.tsx     # Proteção de rotas autenticadas
│   ├── contexts/
│   │   └── AuthContext.tsx        # Contexto de autenticação
│   ├── lib/
│   │   ├── api.ts                 # Serviço de API
│   │   └── utils.ts               # Utilitários
│   ├── pages/
│   │   ├── LoginPage.tsx          # Página de login
│   │   ├── RegisterPage.tsx       # Página de registro
│   │   ├── DashboardPage.tsx      # Dashboard principal
│   │   └── FlightsPage.tsx        # Histórico de voos
│   ├── App.tsx                    # Componente raiz
│   └── main.tsx                   # Entry point
└── ...
```

## 🎯 Códigos de Aeroportos

### Principais aeroportos brasileiros (Código ICAO):

- **SBGR** - Guarulhos (São Paulo)
- **SBSP** - Congonhas (São Paulo)
- **SBBR** - Brasília
- **SBGL** - Galeão (Rio de Janeiro)
- **SBRF** - Recife
- **SBSV** - Salvador
- **SBPA** - Porto Alegre
- **SBCT** - Curitiba
- **SBCF** - Confins (Belo Horizonte)

### Companhias Aéreas:

- **GOL** - Gol Linhas Aéreas
- **TAM** / **LATAM** - LATAM Airlines
- **AZU** / **Azul** - Azul Linhas Aéreas

## 🔗 Links Relacionados

- [Backend API](https://github.com/RavyBomfim/FlightOnTime-BackEnd)
- [API Python de Machine Learning](https://github.com/RavyBomfim/FlightOnTime-DataScience)
