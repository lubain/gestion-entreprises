export interface ISupabaseEdgeFunctionService {
  callEdgeFunction<T>(
    functionName: string,
    data?: Record<string, unknown>,
    method?: "POST" | "GET",
  ): Promise<T>;
}
