import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plane, LogOut, Home, Trash2, Filter } from "lucide-react";

export default function FlightsPage() {
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "delayed" | "ontime">("all");
  const { logout } = useAuth();
  const { flights, refetchFlights } = useData();
  const navigate = useNavigate();

  // Carrega os voos na primeira montagem
  useEffect(() => {
    if (flights.length === 0) {
      console.log("📋 FlightsPage: Carregando histórico inicial");
      refetchFlights();
    }
  }, [flights.length, refetchFlights]);

  // Calcula os voos filtrados usando useMemo
  const filteredFlights = useMemo(() => {
    if (filter === "delayed") {
      return flights.filter((f) => f.predictionResult === "Atrasado");
    } else if (filter === "ontime") {
      return flights.filter((f) => f.predictionResult === "Pontual");
    }
    return flights;
  }, [flights, filter]);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este voo?")) {
      return;
    }

    try {
      await apiService.deleteFlight(id);
      // Revalida o cache após deletar
      refetchFlights();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar voo");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatProbability = (prob: number) => {
    return (prob * 100).toFixed(1) + "%";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plane className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Flight on Time
                </h1>
                <p className="text-sm text-gray-500">Histórico de Predições</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Histórico de Voos</CardTitle>
                <CardDescription>
                  Lista de todas as predições realizadas
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={filter === "delayed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("delayed")}
                >
                  Atrasados
                </Button>
                <Button
                  variant={filter === "ontime" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("ontime")}
                >
                  Pontuais
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {filteredFlights.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum voo encontrado
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Companhia</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead>Partida</TableHead>
                      <TableHead>Distância</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Probabilidade</TableHead>
                      <TableHead>Data Criação</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFlights.map((flight) => (
                      <TableRow key={flight.id}>
                        <TableCell className="font-medium">
                          {flight.id}
                        </TableCell>
                        <TableCell>{flight.airline}</TableCell>
                        <TableCell>{flight.origin}</TableCell>
                        <TableCell>{flight.destination}</TableCell>
                        <TableCell>
                          {formatDate(flight.scheduledDeparture)}
                        </TableCell>
                        <TableCell>{flight.distanceKm} km</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              flight.predictionResult === "Atrasado"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {flight.predictionResult}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatProbability(flight.predictionProbability)}
                        </TableCell>
                        <TableCell>{formatDate(flight.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(flight.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
