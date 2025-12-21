import { PostgrestError } from '@supabase/supabase-js'
import { SupabaseError } from './supabaseError'

export const handleError = (error: PostgrestError) => {
  if (error) {
    if (error.code === '23505') {
      throw new SupabaseError(
        'duplicate_proffessional',
        'Un proffessionel de sante avec cet email existe déjà'
      )
    } else if (error.code === 'PGRST116') {
      throw new SupabaseError('no_rows', 'Aucune ligne trouvée')
    }
    throw new SupabaseError(error.code, error.message, error.details)
  }
}
