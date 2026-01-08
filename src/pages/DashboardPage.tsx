import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { apiService, type FlightPredictionResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import {
  Plane,
  LogOut,
  List,
  Cloud,
  Wind,
  Droplets,
  TrendingUp,
  Calendar,
  MapPin,
} from "lucide-react";

export default function DashboardPage() {
  const [airline, setAirline] = useState("");
  const [originIcao, setOriginIcao] = useState("");
  const [destinationIcao, setDestinationIcao] = useState("");
  const [scheduledDeparture, setScheduledDeparture] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<FlightPredictionResponse | null>(
    null
  );
  const { logout } = useAuth();
  const {
    airlines,
    airports,
    isLoading: loadingOptions,
    error: dataError,
    refetch,
    refetchFlights,
  } = useData();
  const navigate = useNavigate();

  const capitalize = (str: string) => {
    const exceptions = ["de", "da", "dos", "do", "das", "e"];
    const words = str.toLowerCase().split(/(\s+|\/)/);

    return words
      .map((word, index) => {
        // Pula espaços e barras
        if (word === " " || word === "/") {
          return word;
        }

        // Sempre capitaliza a primeira palavra
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }

        // Capitaliza palavra após barra
        if (index > 0 && words[index - 1] === "/") {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }

        // Mantém preposições e artigos em lowercase (exceto primeira palavra ou após barra)
        if (exceptions.includes(word.trim().toLowerCase())) {
          return word.toLowerCase();
        }

        // Capitaliza as outras palavras
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setPrediction(null);

    // Debug: verificar valores
    if (!airline || !originIcao || !destinationIcao || !scheduledDeparture) {
      setError(
        `Campos vazios detectados! airline: "${airline}", origin: "${originIcao}", destination: "${destinationIcao}", date: "${scheduledDeparture}"`
      );
      setLoading(false);
      return;
    }

    try {
      // Converter datetime-local para formato ISO esperado pelo backend
      const formattedDate = scheduledDeparture.includes("T")
        ? scheduledDeparture + ":00"
        : scheduledDeparture;

      const requestData = {
        companhia: airline,
        origem: originIcao,
        destino: destinationIcao,
        data_partida: formattedDate,
      };

      console.log("Dados antes de enviar:", requestData);

      const response = await apiService.predictFlight(requestData);
      console.log("Resposta recebida:", response);
      setPrediction(response);

      // Revalida o histórico de voos após predição bem-sucedida
      console.log("🔄 Revalidando histórico após predição");
      refetchFlights();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer predição");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatProbability = (prob: number) => {
    if (typeof prob !== "number" || isNaN(prob)) return "0.0%";
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
                <p className="text-sm text-gray-500">
                  Predição de Atrasos de Voos
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate("/flights")}>
                <List className="h-4 w-4 mr-2" />
                Histórico
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Nova Predição</CardTitle>
              <CardDescription>
                Preencha os dados do voo para obter a predição de atraso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {dataError &&
                  airlines.length === 0 &&
                  airports.length === 0 && (
                    <Alert variant="destructive">
                      <AlertDescription className="flex items-center justify-between">
                        <span>{dataError}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => refetch()}
                        >
                          Tentar Novamente
                        </Button>
                      </AlertDescription>
                    </Alert>
                  )}

                {loadingOptions ? (
                  <div className="text-center py-8 text-gray-500">
                    Carregando opções...
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="airline">Companhia Aérea</Label>
                      <Combobox
                        options={airlines.map((a) => ({
                          value: a.airlineCode,
                          label: a.airlineName,
                          searchLabel: a.airlineName,
                        }))}
                        value={airline}
                        onValueChange={setAirline}
                        placeholder="Selecione uma companhia aérea"
                        searchPlaceholder="Buscar companhia..."
                        emptyText="Nenhuma companhia encontrada"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="originIcao">Aeroporto de Origem</Label>
                      <Combobox
                        options={airports.map((a) => ({
                          value: a.airportCode,
                          label: `${capitalize(a.airportName)} (${capitalize(
                            a.airportCity
                          )}/${a.airportState})`,
                          searchLabel: `${capitalize(
                            a.airportName
                          )} ${capitalize(a.airportCity)} ${a.airportState}`,
                        }))}
                        value={originIcao}
                        onValueChange={setOriginIcao}
                        placeholder="Selecione o aeroporto de origem"
                        searchPlaceholder="Buscar aeroporto..."
                        emptyText="Nenhum aeroporto encontrado"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destinationIcao">
                        Aeroporto de Destino
                      </Label>
                      <Combobox
                        options={airports.map((a) => ({
                          value: a.airportCode,
                          label: `${capitalize(a.airportName)} (${capitalize(
                            a.airportCity
                          )}/${a.airportState})`,
                          searchLabel: `${capitalize(
                            a.airportName
                          )} ${capitalize(a.airportCity)} ${a.airportState}`,
                        }))}
                        value={destinationIcao}
                        onValueChange={setDestinationIcao}
                        placeholder="Selecione o aeroporto de destino"
                        searchPlaceholder="Buscar aeroporto..."
                        emptyText="Nenhum aeroporto encontrado"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scheduledDeparture">
                        Data e Hora de Partida
                      </Label>
                      <Input
                        id="scheduledDeparture"
                        type="datetime-local"
                        value={scheduledDeparture}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setScheduledDeparture(e.target.value)
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading || loadingOptions}
                    >
                      {loading ? "Processando..." : "Fazer Predição"}
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Results Card */}
          {prediction && (
            <Card className="lg:sticky lg:top-8 h-fit">
              <CardHeader>
                <CardTitle>Resultado da Predição</CardTitle>
                <CardDescription>Análise preditiva do voo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Flight Status */}
                <div className="text-center p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="mb-4">
                    <Badge
                      variant={
                        prediction.predict.predictionResult === "Atrasado"
                          ? "destructive"
                          : "default"
                      }
                      className="text-lg px-4 py-2"
                    >
                      {prediction.predict.predictionResult === "Atrasado"
                        ? "ATRASO PREVISTO"
                        : "VOO PONTUAL"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-3xl font-bold">
                    <TrendingUp className="h-8 w-8" />
                    <span>
                      {formatProbability(
                        prediction.predict.predictionProbability
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {prediction.predict.predictionResult === "Atrasado"
                      ? "Probabilidade de atraso"
                      : "Probabilidade de pontualidade"}
                  </p>
                </div>

                {/* Flight Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Detalhes do Voo
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Companhia</p>
                      <p className="font-semibold">
                        {airlines.find((a) => a.airlineCode === airline)
                          ?.airlineName || airline}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Origem</p>
                      <p className="font-semibold">
                        {airports.find((a) => a.airportCode === originIcao)
                          ?.airportName || originIcao}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Destino</p>
                      <p className="font-semibold">
                        {airports.find((a) => a.airportCode === destinationIcao)
                          ?.airportName || destinationIcao}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Partida</p>
                      <p className="font-semibold">
                        {new Date(scheduledDeparture).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weather Info */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Cloud className="h-5 w-5 mr-2" />
                    Condições Meteorológicas
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-xs text-gray-500">Temperatura</p>
                      <p className="font-semibold text-sm">
                        {prediction.weather.temperature}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Droplets className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-xs text-gray-500">Precipitação</p>
                      <p className="font-semibold text-sm">
                        {prediction.weather.precipitation}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Wind className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-xs text-gray-500">Vento</p>
                      <p className="font-semibold text-sm">
                        {prediction.weather.windSpeed}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
