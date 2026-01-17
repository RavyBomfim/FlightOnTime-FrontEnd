import { useState } from "react";
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
  Cloud,
  Wind,
  Droplets,
  TrendingUp,
  MapPin,
  Thermometer,
} from "lucide-react";

export default function DashboardPage() {
  const [airline, setAirline] = useState("");
  const [originIcao, setOriginIcao] = useState("");
  const [destinationIcao, setDestinationIcao] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<FlightPredictionResponse | null>(
    null
  );
  const {
    airlines,
    airports,
    isLoading: loadingOptions,
    error: dataError,
    refetch,
    refetchFlights,
  } = useData();

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

    if (
      !airline ||
      !originIcao ||
      !destinationIcao ||
      !departureDate ||
      !departureTime
    ) {
      setError(
        `Campos vazios detectados! airline: "${airline}", origin: "${originIcao}", destination: "${destinationIcao}", date: "${departureDate}", time: "${departureTime}"`
      );
      setLoading(false);
      return;
    }

    try {
      const formattedDate = `${departureDate}T${departureTime}:00`;

      const requestData = {
        companhia: airline,
        origem: originIcao,
        destino: destinationIcao,
        data_partida: formattedDate,
      };

      const response = await apiService.predictFlight(requestData);
      setPrediction(response);

      refetchFlights();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer predição");
    } finally {
      setLoading(false);
    }
  };

  const formatProbability = (prob: number) => {
    if (typeof prob !== "number" || isNaN(prob)) return "0.0%";
    return (prob * 100).toFixed(1) + "%";
  };

  return (
    <div className="h-full bg-background flex items-center justify-center">
      {/* Main Content */}
      <main className="w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="border-none">
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

                    <div className="flex gap-3">
                      <div className="space-y-2 w-full">
                        <Label htmlFor="departureDate">Data de Partida</Label>
                        <Input
                          id="departureDate"
                          type="date"
                          value={departureDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDepartureDate(e.target.value)
                          }
                          className="bg-background [&::-webkit-calendar-picker-indicator]:invert"
                          required
                        />
                      </div>

                      <div className="space-y-2 w-full">
                        <Label htmlFor="departureTime">Hora de Partida</Label>
                        <Input
                          id="departureTime"
                          type="time"
                          value={departureTime}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDepartureTime(e.target.value)
                          }
                          className="bg-background [&::-webkit-calendar-picker-indicator]:invert"
                          required
                        />
                      </div>
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
            <Card className="lg:sticky lg:top-8 h-fit border-none">
              <CardHeader>
                <CardTitle>Resultado da Predição</CardTitle>
                <CardDescription>Análise preditiva do voo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Flight Status */}
                <div className="text-center p-6 bg-background to-indigo-50 rounded-lg">
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
                        {new Date(
                          `${departureDate}T${departureTime}`
                        ).toLocaleString("pt-BR", {
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
                  {prediction.weather ? (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-background rounded-lg">
                        <Thermometer className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-gray-500">Temperatura</p>
                        <p className="font-semibold text-sm">
                          {prediction.weather.temperature}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <Droplets className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-gray-500">Precipitação</p>
                        <p className="font-semibold text-sm">
                          {prediction.weather.precipitation}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <Wind className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-gray-500">Vento</p>
                        <p className="font-semibold text-sm">
                          {prediction.weather.windSpeed}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Dados meteorológicos não disponíveis
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
