export class SupabaseError extends Error {
  code: string
  details: string | null
  status: number

  constructor(code: string, message: string, details: string | null = null, status: number = 500) {
    super(message)
    this.name = 'SupabaseError' // Nom de l'erreur
    this.code = code // Code d'erreur spécifique
    this.details = details // Détails supplémentaires sur l'erreur
    this.status = status // Code HTTP ou autre statut associé à l'erreur

    // Assure que le bon `stack` est généré dans les environnements modernes
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SupabaseError)
    }
  }
}
