# 🐳 Docker - FlightOnTime Frontend

## 📦 Arquivos Docker

- **Dockerfile**: Build multi-stage otimizado para produção
- **docker-compose.yml**: Orquestração do container
- **nginx.conf**: Configuração do servidor web
- **.dockerignore**: Arquivos ignorados no build
- **.env.production**: Variáveis de ambiente para produção

## 🚀 Como usar

### Opção 1: Docker Build Direto

```bash
# Build da imagem
docker build -t flightontime-frontend .

# Rodar o container
docker run -d \
  -p 3000:80 \
  -e VITE_GOOGLE_CLIENT_ID=your-client-id \
  -e VITE_API_BASE_URL=http://localhost:8080/api \
  --name flightontime-frontend \
  flightontime-frontend
```

### Opção 2: Docker Compose (Recomendado)

```bash
# Subir o serviço
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar o serviço
docker-compose down
```

## 🔧 Configuração

### Variáveis de Ambiente

Edite o arquivo `.env.production` ou passe via linha de comando:

```bash
VITE_GOOGLE_CLIENT_ID=seu-google-client-id
VITE_API_BASE_URL=http://seu-backend:8080/api
```

### Portas

- **Container**: Porta 80 (nginx)
- **Host**: Porta 3000 (mapeada)

Para mudar a porta do host, edite `docker-compose.yml`:

```yaml
ports:
  - "8080:80" # Exemplo: mapear para porta 8080
```

## 🏗️ Build em Produção

### Build com variáveis de ambiente

```bash
# Passar variáveis no build
docker build \
  --build-arg VITE_GOOGLE_CLIENT_ID=your-id \
  --build-arg VITE_API_BASE_URL=https://api.seudominio.com/api \
  -t flightontime-frontend .
```

### Build otimizado

O Dockerfile usa multi-stage build:

1. **Stage 1 (builder)**: Instala dependências e compila o projeto
2. **Stage 2 (production)**: Apenas os arquivos estáticos + nginx

Resultado: Imagem final ~25MB (nginx alpine + arquivos estáticos)

## 📊 Comandos Úteis

```bash
# Ver containers rodando
docker ps

# Ver logs em tempo real
docker logs -f flightontime-frontend

# Entrar no container
docker exec -it flightontime-frontend sh

# Remover container e imagem
docker stop flightontime-frontend
docker rm flightontime-frontend
docker rmi flightontime-frontend

# Rebuild forçado
docker-compose up -d --build --force-recreate
```

## 🔒 Segurança

O nginx.conf inclui:

- Headers de segurança (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Compressão Gzip
- Cache de assets estáticos
- Proteção de arquivos sensíveis

## 🌐 Acesso

Após subir o container:

- **URL**: http://localhost:3000
- **Nginx**: Serve os arquivos estáticos e gerencia roteamento SPA

## 🔗 Integrando com Backend

Para conectar frontend e backend no Docker:

```yaml
version: "3.8"

services:
  backend:
    image: flightontime-backend
    ports:
      - "8080:8080"
    networks:
      - flightontime-network

  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_API_BASE_URL=http://backend:8080/api
    depends_on:
      - backend
    networks:
      - flightontime-network

networks:
  flightontime-network:
    driver: bridge
```

## 📝 Notas

- As variáveis `VITE_*` são injetadas durante o **build**, não no runtime
- Para mudar variáveis de ambiente, é necessário **rebuild** da imagem
- O nginx redireciona todas as rotas para `index.html` (suporte a SPA routing)
