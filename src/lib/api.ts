const API_BASE_URL = "http://localhost:8080/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface FlightPredictionRequest {
  companhia: string;
  origem: string;
  destino: string;
  data_partida: string;
}

export interface FlightPredictionResponse {
  predict: {
    predictionResult: string;
    predictionProbability: number;
  };
  weather: {
    temperature: string;
    precipitation: string;
    windSpeed: string;
  };
}

export interface Flight {
  id: number;
  airline: string;
  origin: string;
  destination: string;
  distanceKm: number;
  scheduledDeparture: string;
  scheduledArrival: string;
  predictionResult: string;
  predictionProbability: number;
  createdAt: string;
  updatedAt: string;
}

export interface Airline {
  airlineCode: string;
  airlineName: string;
}

export interface Airport {
  airportCode: string;
  airportName: string;
  airportCity: string;
  airportState: string;
}

class ApiService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async register(data: RegisterRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Erro ao registrar usuário");
    }

    return response.text();
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Erro ao fazer login");
    }

    return response.json();
  }

  async predictFlight(
    data: FlightPredictionRequest
  ): Promise<FlightPredictionResponse> {
    console.log("=== ENVIANDO PREDIÇÃO ===");
    console.log("Dados originais:", data);
    console.log("JSON stringified:", JSON.stringify(data));
    console.log("Headers:", this.getHeaders(true));

    const response = await fetch(`${API_BASE_URL}/flights/predict`, {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Erro do backend:", error);
      throw new Error(error.detail || error.erro || "Erro ao fazer predição");
    }

    const result = await response.json();
    console.log("Resposta do backend:", result);
    return result;
  }

  async getFlights(): Promise<Flight[]> {
    const response = await fetch(`${API_BASE_URL}/flights`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar voos");
    }

    return response.json();
  }

  async getFlight(id: number): Promise<Flight> {
    const response = await fetch(`${API_BASE_URL}/flights/${id}`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar voo");
    }

    return response.json();
  }

  async deleteFlight(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/flights/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar voo");
    }

    // DELETE geralmente retorna 204 No Content, não tenta parsear JSON
  }

  async searchFlightsByOrigin(origin: string): Promise<Flight[]> {
    const response = await fetch(
      `${API_BASE_URL}/flights/search/origin?origin=${origin}`,
      {
        method: "GET",
        headers: this.getHeaders(true),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar voos");
    }

    return response.json();
  }

  async searchFlightsByDestination(destination: string): Promise<Flight[]> {
    const response = await fetch(
      `${API_BASE_URL}/flights/search/destination?destination=${destination}`,
      {
        method: "GET",
        headers: this.getHeaders(true),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar voos");
    }

    return response.json();
  }

  async getDelayedFlights(): Promise<Flight[]> {
    const response = await fetch(`${API_BASE_URL}/flights/search/delayed`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar voos atrasados");
    }

    return response.json();
  }

  async getOnTimeFlights(): Promise<Flight[]> {
    const response = await fetch(`${API_BASE_URL}/flights/search/ontime`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar voos pontuais");
    }

    return response.json();
  }

  async getAirlines(): Promise<Airline[]> {
    console.log("🔵 getAirlines - Iniciando...");
    const token = localStorage.getItem("token");
    console.log(
      "🔵 Token no localStorage:",
      token ? `${token.substring(0, 20)}...` : "NULL"
    );

    const response = await fetch(`${API_BASE_URL}/airlines`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    console.log("🔵 getAirlines - Response status:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.error("🔴 Erro 401 - Token inválido ou expirado");
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      throw new Error("Erro ao buscar companhias aéreas");
    }

    const data = await response.json();
    console.log("🔵 getAirlines - Dados recebidos:", data.length, "companhias");
    return data;
  }

  async getAirports(): Promise<Airport[]> {
    console.log("🟢 getAirports - Iniciando...");
    const token = localStorage.getItem("token");
    console.log(
      "🟢 Token no localStorage:",
      token ? `${token.substring(0, 20)}...` : "NULL"
    );

    const response = await fetch(`${API_BASE_URL}/airports`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    console.log("🟢 getAirports - Response status:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.error("🔴 Erro 401 - Token inválido ou expirado");
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      throw new Error("Erro ao buscar aeroportos");
    }

    const data = await response.json();
    console.log("🟢 getAirports - Dados recebidos:", data.length, "aeroportos");
    return data;
  }
}

export const apiService = new ApiService();
