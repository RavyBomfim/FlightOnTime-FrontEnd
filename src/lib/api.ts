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
  distanceMeters: number;
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

export interface OverallStats {
  totalFlights: number;
  delayedFlights: number;
  ontimeFlights: number;
  delayPercentage: number;
}

export interface StatsByDate {
  date: string;
  totalFlights: number;
  delayedFlights: number;
  delayPercentage: number;
}

export interface StatsByAirline {
  airline: string;
  totalFlights: number;
  delayedFlights: number;
  delayPercentage: number;
}

export interface StatsByOrigin {
  origin: string;
  totalFlights: number;
  delayedFlights: number;
  delayPercentage: number;
}

export interface StatsByDestination {
  destination: string;
  totalFlights: number;
  delayedFlights: number;
  delayPercentage: number;
}

export interface StatsByRoute {
  origin: string;
  destination: string;
  totalFlights: number;
  delayedFlights: number;
  delayPercentage: number;
}

export interface FlightStats {
  overallStats: OverallStats;
  statsByDate: StatsByDate[];
  statsByAirline: StatsByAirline[];
  statsByOrigin: StatsByOrigin[];
  statsByDestination: StatsByDestination[];
  statsByRoute: StatsByRoute[];
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
    const response = await fetch(`${API_BASE_URL}/flights/predict`, {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || error.erro || "Erro ao fazer predição");
    }

    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/airlines`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      throw new Error("Erro ao buscar companhias aéreas");
    }

    return response.json();
  }

  async getAirports(): Promise<Airport[]> {
    const response = await fetch(`${API_BASE_URL}/airports`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      throw new Error("Erro ao buscar aeroportos");
    }

    return response.json();
  }

  async getFlightStats(): Promise<FlightStats> {
    const response = await fetch(`${API_BASE_URL}/flights/stats`, {
      method: "GET",
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      throw new Error("Erro ao buscar estatísticas de voos");
    }

    return response.json();
  }
}

export const apiService = new ApiService();
