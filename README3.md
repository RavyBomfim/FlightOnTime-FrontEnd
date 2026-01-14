# Flight on Time - Estatísticas de Voos

Documentação completa das funcionalidades de **Overall Stats** e **Estatísticas Específicas** da API Flight on Time.

## 📊 Visão Geral

A API fornece um sistema completo de estatísticas que permite analisar os padrões de atrasos de voos através de múltiplas dimensões. O endpoint `/api/flights/stats` retorna um conjunto consolidado de métricas que incluem:

- **Estatísticas Gerais (Overall Stats)**: Visão consolidada de todos os voos
- **Estatísticas Específicas**: Análises detalhadas por diferentes critérios

## 🎯 Endpoint Principal

### GET `/api/flights/stats`

Retorna estatísticas agregadas de todos os voos cadastrados no sistema.

**URL Completa**: `http://localhost:8080/api/flights/stats`

**Método HTTP**: `GET`

**Autenticação**: Não requerida

**Resposta**: `200 OK`

---

## 📈 Estrutura da Resposta

### 1. Overall Stats (Estatísticas Gerais)

Fornece uma visão geral consolidada de todos os voos no sistema.

```json
{
  "overallStats": {
    "totalFlights": 1250,
    "delayedFlights": 387,
    "ontimeFlights": 863,
    "delayPercentage": 30.96
  }
}
```

**Campos:**
- `totalFlights`: Total de voos registrados no sistema
- `delayedFlights`: Quantidade de voos com status "Atrasado"
- `ontimeFlights`: Quantidade de voos com status "Pontual"
- `delayPercentage`: Percentual de voos atrasados (0-100)

**Casos de Uso:**
- Dashboard principal com KPIs gerais
- Comparação histórica de performance
- Relatórios executivos
- Indicadores de qualidade do serviço

---

### 2. Stats by Date (Estatísticas por Data)

Analisa a distribuição de atrasos ao longo do tempo, permitindo identificar dias críticos e padrões temporais.

```json
{
  "statsByDate": [
    {
      "date": "2025-01-15",
      "totalFlights": 45,
      "delayedFlights": 12,
      "delayPercentage": 26.67
    },
    {
      "date": "2025-01-14",
      "totalFlights": 52,
      "delayedFlights": 18,
      "delayPercentage": 34.62
    }
  ]
}
```

**Campos:**
- `date`: Data dos voos (formato ISO: YYYY-MM-DD)
- `totalFlights`: Total de voos naquela data
- `delayedFlights`: Voos atrasados naquela data
- `delayPercentage`: Percentual de atrasos na data

**Casos de Uso:**
- Identificar dias com maior índice de atrasos
- Análise de tendências temporais
- Planejamento operacional
- Gráficos de linha temporal
- Correlação com eventos externos (feriados, clima)

---

### 3. Stats by Airline (Estatísticas por Companhia Aérea)

Compara a performance de pontualidade entre diferentes companhias aéreas.

```json
{
  "statsByAirline": [
    {
      "airline": "LATAM Airlines",
      "totalFlights": 320,
      "delayedFlights": 89,
      "delayPercentage": 27.81
    },
    {
      "airline": "Gol Linhas Aéreas",
      "totalFlights": 285,
      "delayedFlights": 102,
      "delayPercentage": 35.79
    },
    {
      "airline": "Azul Linhas Aéreas",
      "totalFlights": 245,
      "delayedFlights": 67,
      "delayPercentage": 27.35
    }
  ]
}
```

**Campos:**
- `airline`: Nome da companhia aérea
- `totalFlights`: Total de voos da companhia
- `delayedFlights`: Voos atrasados da companhia
- `delayPercentage`: Taxa de atrasos da companhia

**Casos de Uso:**
- Ranking de companhias mais pontuais
- Comparação de performance entre operadoras
- Tomada de decisão na escolha de companhias
- Análise de SLA (Service Level Agreement)
- Benchmarking de mercado

---

### 4. Stats by Origin (Estatísticas por Aeroporto de Origem)

Identifica aeroportos com maior tendência de gerar voos atrasados.

```json
{
  "statsByOrigin": [
    {
      "origin": "GRU",
      "totalFlights": 450,
      "delayedFlights": 156,
      "delayPercentage": 34.67
    },
    {
      "origin": "CGH",
      "totalFlights": 380,
      "delayedFlights": 98,
      "delayPercentage": 25.79
    },
    {
      "origin": "GIG",
      "totalFlights": 310,
      "delayedFlights": 108,
      "delayPercentage": 34.84
    }
  ]
}
```

**Campos:**
- `origin`: Código IATA do aeroporto de origem (3 letras)
- `totalFlights`: Total de voos partindo deste aeroporto
- `delayedFlights`: Voos atrasados saindo deste aeroporto
- `delayPercentage`: Taxa de atrasos nas partidas

**Casos de Uso:**
- Identificar aeroportos problemáticos para partidas
- Planejamento de conexões
- Análise de infraestrutura aeroportuária
- Otimização de malha aérea
- Alertas para passageiros

---

### 5. Stats by Destination (Estatísticas por Aeroporto de Destino)

Analisa aeroportos com maior dificuldade de receber voos no horário.

```json
{
  "statsByDestination": [
    {
      "destination": "GRU",
      "totalFlights": 420,
      "delayedFlights": 145,
      "delayPercentage": 34.52
    },
    {
      "destination": "BSB",
      "totalFlights": 295,
      "delayedFlights": 76,
      "delayPercentage": 25.76
    },
    {
      "destination": "SDU",
      "totalFlights": 270,
      "delayedFlights": 95,
      "delayPercentage": 35.19
    }
  ]
}
```

**Campos:**
- `destination`: Código IATA do aeroporto de destino (3 letras)
- `totalFlights`: Total de voos chegando neste aeroporto
- `delayedFlights`: Voos atrasados chegando neste aeroporto
- `delayPercentage`: Taxa de atrasos nas chegadas

**Casos de Uso:**
- Identificar aeroportos com problemas de capacidade
- Planejamento de tempo de conexão
- Análise de congestionamento
- Otimização de slots de pouso
- Gestão de recursos aeroportuários

---

### 6. Stats by Route (Estatísticas por Rota)

Analisa rotas específicas (origem-destino) e seus índices de pontualidade.

```json
{
  "statsByRoute": [
    {
      "origin": "GRU",
      "destination": "CGH",
      "totalFlights": 125,
      "delayedFlights": 42,
      "delayPercentage": 33.60
    },
    {
      "origin": "GIG",
      "destination": "BSB",
      "totalFlights": 98,
      "delayedFlights": 28,
      "delayPercentage": 28.57
    },
    {
      "origin": "CGH",
      "destination": "SDU",
      "totalFlights": 87,
      "delayedFlights": 31,
      "delayPercentage": 35.63
    }
  ]
}
```

**Campos:**
- `origin`: Código IATA do aeroporto de origem
- `destination`: Código IATA do aeroporto de destino
- `totalFlights`: Total de voos nesta rota
- `delayedFlights`: Voos atrasados nesta rota
- `delayPercentage`: Taxa de atrasos específica da rota

**Casos de Uso:**
- Identificar rotas mais problemáticas
- Planejamento de viagens
- Análise de corredores aéreos
- Otimização de frequências
- Precificação dinâmica baseada em confiabilidade
- Recomendações personalizadas de rotas

---

## 🔧 Exemplo de Requisição Completa

### cURL

```bash
curl -X GET "http://localhost:8080/api/flights/stats" \
  -H "Accept: application/json"
```

### JavaScript (Fetch API)

```javascript
fetch('http://localhost:8080/api/flights/stats')
  .then(response => response.json())
  .then(data => {
    console.log('Overall Stats:', data.overallStats);
    console.log('Stats by Date:', data.statsByDate);
    console.log('Stats by Airline:', data.statsByAirline);
    console.log('Stats by Origin:', data.statsByOrigin);
    console.log('Stats by Destination:', data.statsByDestination);
    console.log('Stats by Route:', data.statsByRoute);
  })
  .catch(error => console.error('Erro:', error));
```

### Python (requests)

```python
import requests

response = requests.get('http://localhost:8080/api/flights/stats')
stats = response.json()

print(f"Total de voos: {stats['overallStats']['totalFlights']}")
print(f"Percentual de atrasos: {stats['overallStats']['delayPercentage']:.2f}%")

# Listar companhias com maior índice de atraso
airlines = sorted(stats['statsByAirline'], 
                 key=lambda x: x['delayPercentage'], 
                 reverse=True)

print("\nTop 3 companhias com mais atrasos:")
for airline in airlines[:3]:
    print(f"- {airline['airline']}: {airline['delayPercentage']:.2f}%")
```

### Java (RestTemplate)

```java
RestTemplate restTemplate = new RestTemplate();
String url = "http://localhost:8080/api/flights/stats";

FlightStatsDTO stats = restTemplate.getForObject(url, FlightStatsDTO.class);

System.out.println("Total de voos: " + stats.getOverallStats().getTotalFlights());
System.out.println("Voos atrasados: " + stats.getOverallStats().getDelayedFlights());
System.out.println("Taxa de atraso: " + stats.getOverallStats().getDelayPercentage() + "%");
```

---

## 🚀 Performance e Otimizações

### Cache

O sistema utiliza **Spring Cache** para otimizar o desempenho das consultas estatísticas:

```java
@Cacheable(value = "flightStats", unless = "#result == null")
public FlightStatsDTO getFlightStats()
```

**Características:**
- Cache automático da resposta completa
- Invalidação ao deletar voos
- Reduz carga no banco de dados
- Melhora tempo de resposta significativamente

### Agregação no Banco

Todas as estatísticas são calculadas usando **agregações nativas do banco de dados**, evitando carregar todos os voos na memória:

```java
// Exemplo de query otimizada
@Query("SELECT f.date, COUNT(f), " +
       "SUM(CASE WHEN f.predictionResult = :status THEN 1 ELSE 0 END) " +
       "FROM Flight f GROUP BY f.date ORDER BY f.date DESC")
List<Object[]> findStatsGroupedByDate(@Param("status") String status);
```

**Benefícios:**
- Processamento eficiente mesmo com milhares de voos
- Baixo uso de memória
- Queries otimizadas pelo SGBD
- Escalabilidade para grandes volumes

---

## 📊 Casos de Uso Práticos

### Dashboard Executivo

```javascript
// Exibir métricas principais
const { overallStats } = stats;

displayMetric('Total de Voos', overallStats.totalFlights);
displayMetric('Taxa de Atrasos', overallStats.delayPercentage + '%');
displayMetric('Voos Pontuais', overallStats.ontimeFlights);
```

### Gráfico de Evolução Temporal

```javascript
// Criar gráfico de linha com atrasos por data
const chartData = stats.statsByDate.map(stat => ({
  x: stat.date,
  y: stat.delayPercentage
}));

createLineChart('delay-timeline', chartData);
```

### Ranking de Companhias

```javascript
// Top 5 companhias mais pontuais
const topAirlines = stats.statsByAirline
  .sort((a, b) => a.delayPercentage - b.delayPercentage)
  .slice(0, 5);

displayRanking(topAirlines);
```

### Mapa de Calor de Aeroportos

```javascript
// Visualizar aeroportos problemáticos
const airportHeatmap = stats.statsByOrigin.map(stat => ({
  airport: stat.origin,
  intensity: stat.delayPercentage,
  flights: stat.totalFlights
}));

renderHeatMap(airportHeatmap);
```

### Matriz de Rotas

```javascript
// Criar matriz origem-destino
const routeMatrix = {};

stats.statsByRoute.forEach(route => {
  if (!routeMatrix[route.origin]) {
    routeMatrix[route.origin] = {};
  }
  routeMatrix[route.origin][route.destination] = route.delayPercentage;
});

renderRouteMatrix(routeMatrix);
```

---

## 🔍 Filtragem e Análise Avançada

### Identificar Piores Performers

```javascript
// Encontrar entidades com taxa de atraso > 40%
const problematicAirlines = stats.statsByAirline
  .filter(a => a.delayPercentage > 40);

const problematicOrigins = stats.statsByOrigin
  .filter(o => o.delayPercentage > 40);

const problematicRoutes = stats.statsByRoute
  .filter(r => r.delayPercentage > 40);
```

### Análise de Tendências

```javascript
// Calcular média móvel de 7 dias
function calculateMovingAverage(statsByDate, window = 7) {
  return statsByDate.map((stat, index, array) => {
    const slice = array.slice(Math.max(0, index - window + 1), index + 1);
    const avg = slice.reduce((sum, s) => sum + s.delayPercentage, 0) / slice.length;
    
    return {
      date: stat.date,
      delayPercentage: stat.delayPercentage,
      movingAverage: avg
    };
  });
}
```

### Comparação entre Períodos

```javascript
// Comparar esta semana vs semana anterior
const thisWeek = stats.statsByDate.slice(0, 7);
const lastWeek = stats.statsByDate.slice(7, 14);

const thisWeekAvg = average(thisWeek.map(s => s.delayPercentage));
const lastWeekAvg = average(lastWeek.map(s => s.delayPercentage));

const improvement = lastWeekAvg - thisWeekAvg;
console.log(`Melhora de ${improvement.toFixed(2)}% em relação à semana anterior`);
```

---

## 📋 Estrutura de Dados Completa

### FlightStatsDTO

```java
public class FlightStatsDTO {
    private OverallStats overallStats;
    private List<StatsByDate> statsByDate;
    private List<StatsByAirline> statsByAirline;
    private List<StatsByOrigin> statsByOrigin;
    private List<StatsByDestination> statsByDestination;
    private List<StatsByRoute> statsByRoute;
}
```

### Modelos de Estatísticas

Todos os modelos de estatísticas específicas seguem o mesmo padrão:

```java
{
    private [identificador]; // date, airline, origin, destination, etc.
    private long totalFlights;
    private long delayedFlights;
    private double delayPercentage;
}
```

---

## ⚠️ Observações Importantes

1. **Cálculo de Percentual**: O `delayPercentage` é calculado como `(delayedFlights / totalFlights) * 100`

2. **Status de Voo**: O sistema reconhece dois status:
   - `"Atrasado"`: Voo com predição de atraso
   - `"Pontual"`: Voo com predição de pontualidade

3. **Ordenação**:
   - `statsByDate`: Ordenado por data descendente (mais recente primeiro)
   - Outras listas: Sem ordenação específica (pode implementar no frontend)

4. **Cache**: As estatísticas são cacheadas. Para obter dados atualizados imediatamente após adicionar/remover voos, o cache é invalidado automaticamente

5. **Performance**: Com agregação no banco de dados, o endpoint permanece rápido mesmo com milhares de registros

---

## 🔗 Endpoints Relacionados

Para complementar a análise estatística, utilize também:

- `GET /api/flights` - Lista todos os voos
- `GET /api/flights/search/delayed` - Apenas voos atrasados
- `GET /api/flights/search/ontime` - Apenas voos pontuais
- `GET /api/flights/search/origin?origin=GRU` - Voos de uma origem
- `GET /api/flights/search/destination?destination=CGH` - Voos para um destino
- `GET /api/flights/search/route?origin=GRU&destination=CGH` - Voos de uma rota específica

---

## 💡 Exemplos de Visualizações Recomendadas

### 1. Dashboard Principal
- Card com KPIs do Overall Stats
- Gráfico de pizza: Pontual vs Atrasado
- Gráfico de linha: Evolução temporal (statsByDate)

### 2. Análise de Companhias
- Gráfico de barras horizontais ordenado por delayPercentage
- Tabela com ranking completo
- Filtros por volume mínimo de voos

### 3. Mapa de Aeroportos
- Mapa geográfico com marcadores
- Tamanho/cor dos marcadores baseado em delayPercentage
- Tooltip com detalhes (totalFlights, delayedFlights)

### 4. Matriz de Rotas
- Heatmap origem-destino
- Cores representando taxa de atraso
- Filtro por volume mínimo

### 5. Análise Temporal
- Gráfico de linha com média móvel
- Identificação de picos de atraso
- Comparação entre períodos

---

## 📚 Documentação Adicional

- [README Principal](README.md) - Configuração e instalação
- [Swagger UI](http://localhost:8080/swagger-ui.html) - Documentação interativa da API
- [Arquitetura](ARQUITETURA.md) - Detalhes da arquitetura do sistema

---

## 🤝 Contribuindo

Para adicionar novas dimensões de estatísticas:

1. Criar novo DTO em [src/main/java/com/flightontime/api/dto](src/main/java/com/flightontime/api/dto)
2. Adicionar query agregada em [FlightRepository](src/main/java/com/flightontime/api/repository/FlightRepository.java)
3. Implementar cálculo em [FlightService.getFlightStats()](src/main/java/com/flightontime/api/service/FlightService.java)
4. Adicionar ao [FlightStatsDTO](src/main/java/com/flightontime/api/dto/FlightStatsDTO.java)

---

**Desenvolvido para o Hackaton Oracle Next Education (ONE)**
