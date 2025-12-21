export interface AppError extends Error {
  code?: string; // Si un code d'erreur est attendu
}
