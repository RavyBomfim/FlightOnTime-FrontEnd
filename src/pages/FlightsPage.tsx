import { useState, useEffect, useMemo } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter } from "lucide-react";

export default function FlightsPage() {
  const [filter, setFilter] = useState<"all" | "delayed" | "ontime">("all");
  const { flights, refetchFlights } = useData();

  useEffect(() => {
    if (flights.length === 0) {
      refetchFlights();
    }
  }, [flights.length, refetchFlights]);

  const filteredFlights = useMemo(() => {
    if (filter === "delayed") {
      return flights.filter((f) => f.predictionResult === "Atrasado");
    } else if (filter === "ontime") {
      return flights.filter((f) => f.predictionResult === "Pontual");
    }
    return flights;
  }, [flights, filter]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    try {
      // Formato: "2026-01-15T14:30:00"
      const date = new Date(dateString.replace(" ", "T"));

      if (isNaN(date.getTime())) {
        return "Data inválida";
      }

      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Erro ao formatar data:", dateString, error);
      return "Erro na data";
    }
  };

  const formatProbability = (prob: number) => {
    return (prob * 100).toFixed(1) + "%";
  };

  return (
    <div className="h-full bg-background">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-none">
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
                          {formatDate(flight.scheduledDepartureDate)}
                        </TableCell>
                        <TableCell>
                          {(flight.distanceMeters / 1000).toFixed(0)} km
                        </TableCell>
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
