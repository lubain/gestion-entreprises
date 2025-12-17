export interface RepositoryReponse<T> {
  data: T | null
  error?: {
    code: string
    message: string
  }
}

export interface PaginatedResponse<T> {
  date: T[]
  total: number
  page: number
  pageSize: number // Nombre d'element sur chaque page
}
