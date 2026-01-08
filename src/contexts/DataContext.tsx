/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { apiService, type Airline, type Airport, type Flight } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface DataContextType {
  airlines: Airline[];
  airports: Airport[];
  flights: Flight[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  refetchFlights: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  // Limpa o cache quando o token muda (login/logout)
  useEffect(() => {
    console.log("🔄 Token mudou - limpando cache");
    setAirlines([]);
    setAirports([]);
    setFlights([]);
    setError(null);
  }, [token]);

  const fetchData = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log("🔄 DataContext: Buscando dados do backend...");

      const [airlinesData, airportsData] = await Promise.all([
        apiService.getAirlines(),
        apiService.getAirports(),
      ]);

      setAirlines(airlinesData);
      setAirports(airportsData);
      console.log("✅ DataContext: Dados carregados e cacheados");
    } catch (err) {
      console.error("❌ DataContext: Erro ao carregar dados:", err);
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // Se já tem dados em cache, limpa o erro e não busca novamente
    if (airlines.length > 0 && airports.length > 0) {
      setError(null);
      setIsLoading(false);
      console.log("✅ DataContext: Usando dados do cache");
      return;
    }

    // Só busca se ainda não tem dados em cache
    if (token && airlines.length === 0 && airports.length === 0) {
      fetchData();
    }
  }, [token, airlines.length, airports.length, fetchData]);

  const refetch = async () => {
    await fetchData();
  };

  const fetchFlights = async () => {
    if (!token) return;

    try {
      console.log("🔄 DataContext: Buscando histórico de voos...");
      const flightsData = await apiService.getFlights();
      setFlights(flightsData);
      console.log("✅ DataContext: Histórico carregado e cacheado");
    } catch (err) {
      console.error("❌ DataContext: Erro ao carregar histórico:", err);
    }
  };

  const refetchFlights = async () => {
    await fetchFlights();
  };

  return (
    <DataContext.Provider
      value={{
        airlines,
        airports,
        flights,
        isLoading,
        error,
        refetch,
        refetchFlights,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
