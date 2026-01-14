import { useState, useEffect } from "react";
import { apiService, type FlightStats } from "@/lib/api";
import { useData } from "@/contexts/DataContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Plane,
  MapPin,
  Route,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function StatsPage() {
  const [stats, setStats] = useState<FlightStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { airports } = useData();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiService.getFlightStats();
      setStats(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar estatísticas"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAirportName = (code: string) => {
    const airport = airports.find((a) => a.airportCode === code);
    return airport ? airport.airportName : code;
  };

  const formatPercentage = (value: number) => {
    return value.toFixed(2) + "%";
  };

  const getDelayColor = (percentage: number) => {
    if (percentage < 20) return "text-green-600 bg-green-50";
    if (percentage < 35) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Estatísticas de Voos</h1>
        <p className="text-gray-500">
          Análise completa de desempenho e pontualidade
        </p>
      </div>

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total de Voos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">
                {stats.overallStats.totalFlights}
              </span>
              <Plane className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              Voos Atrasados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-red-600">
                {stats.overallStats.delayedFlights}
              </span>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              Voos Pontuais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-green-600">
                {stats.overallStats.ontimeFlights}
              </span>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              Taxa de Atrasos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-orange-600">
                {formatPercentage(stats.overallStats.delayPercentage)}
              </span>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stats by Airline */}
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Por Companhia Aérea
            </CardTitle>
            <CardDescription>
              Performance de pontualidade por operadora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Companhia</TableHead>
                  <TableHead className="text-right">Voos</TableHead>
                  <TableHead className="text-right">Atrasados</TableHead>
                  <TableHead className="text-right">Taxa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.statsByAirline
                  .sort((a, b) => b.totalFlights - a.totalFlights)
                  .map((stat) => (
                    <TableRow key={stat.airline}>
                      <TableCell className="font-medium">
                        {stat.airline}
                      </TableCell>
                      <TableCell className="text-right">
                        {stat.totalFlights}
                      </TableCell>
                      <TableCell className="text-right">
                        {stat.delayedFlights}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="secondary"
                          className={getDelayColor(stat.delayPercentage)}
                        >
                          {formatPercentage(stat.delayPercentage)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stats by Origin */}
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Por Origem
            </CardTitle>
            <CardDescription>
              Aeroportos com mais voos atrasados na partida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aeroporto</TableHead>
                  <TableHead className="text-right">Voos</TableHead>
                  <TableHead className="text-right">Atrasados</TableHead>
                  <TableHead className="text-right">Taxa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.statsByOrigin
                  .sort((a, b) => b.delayPercentage - a.delayPercentage)
                  .slice(0, 10)
                  .map((stat) => (
                    <TableRow key={stat.origin}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{stat.origin}</div>
                          <div className="text-xs text-gray-500">
                            {getAirportName(stat.origin)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {stat.totalFlights}
                      </TableCell>
                      <TableCell className="text-right">
                        {stat.delayedFlights}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="secondary"
                          className={getDelayColor(stat.delayPercentage)}
                        >
                          {formatPercentage(stat.delayPercentage)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stats by Destination */}
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Por Destino
            </CardTitle>
            <CardDescription>
              Aeroportos com mais voos atrasados na chegada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aeroporto</TableHead>
                  <TableHead className="text-right">Voos</TableHead>
                  <TableHead className="text-right">Atrasados</TableHead>
                  <TableHead className="text-right">Taxa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.statsByDestination
                  .sort((a, b) => b.delayPercentage - a.delayPercentage)
                  .slice(0, 10)
                  .map((stat) => (
                    <TableRow key={stat.destination}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">
                            {stat.destination}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getAirportName(stat.destination)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {stat.totalFlights}
                      </TableCell>
                      <TableCell className="text-right">
                        {stat.delayedFlights}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="secondary"
                          className={getDelayColor(stat.delayPercentage)}
                        >
                          {formatPercentage(stat.delayPercentage)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stats by Route */}
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Por Rota
            </CardTitle>
            <CardDescription>Rotas mais problemáticas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rota</TableHead>
                  <TableHead className="text-right">Voos</TableHead>
                  <TableHead className="text-right">Atrasados</TableHead>
                  <TableHead className="text-right">Taxa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.statsByRoute
                  .sort((a, b) => b.delayPercentage - a.delayPercentage)
                  .slice(0, 10)
                  .map((stat, index) => (
                    <TableRow
                      key={`${stat.origin}-${stat.destination}-${index}`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{stat.origin}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-semibold">
                            {stat.destination}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {stat.totalFlights}
                      </TableCell>
                      <TableCell className="text-right">
                        {stat.delayedFlights}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="secondary"
                          className={getDelayColor(stat.delayPercentage)}
                        >
                          {formatPercentage(stat.delayPercentage)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Stats by Date */}
      <Card className="mt-6 border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Evolução Temporal
          </CardTitle>
          <CardDescription>Histórico de atrasos por data</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Total de Voos</TableHead>
                <TableHead className="text-right">Voos Atrasados</TableHead>
                <TableHead className="text-right">Taxa de Atrasos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.statsByDate.slice(0, 15).map((stat) => (
                <TableRow key={stat.date}>
                  <TableCell className="font-medium">
                    {new Date(stat.date).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    {stat.totalFlights}
                  </TableCell>
                  <TableCell className="text-right">
                    {stat.delayedFlights}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={getDelayColor(stat.delayPercentage)}
                    >
                      {formatPercentage(stat.delayPercentage)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
