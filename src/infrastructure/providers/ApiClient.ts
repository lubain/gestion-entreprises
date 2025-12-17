class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string, defaultHeaders: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
      ...defaultHeaders, // Permet d'ajouter des headers personnalisés
    };
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: Record<string, unknown>,
    customHeaders?: HeadersInit,
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: { ...this.headers, ...customHeaders },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Erreur API: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("Erreur API :", error);
      throw error;
    }
  }

  async get<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, "GET", undefined, customHeaders);
  }

  async post<T>(
    endpoint: string,
    body: Record<string, unknown>,
    customHeaders?: HeadersInit,
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", body, customHeaders);
  }

  async put<T>(
    endpoint: string,
    body: Record<string, unknown>,
    customHeaders?: HeadersInit,
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", body, customHeaders);
  }

  async delete<T>(
    endpoint: string,
    customHeaders?: HeadersInit,
  ): Promise<T> {
    return this.request<T>(endpoint, "DELETE", undefined, customHeaders);
  }
}

export default ApiClient;
