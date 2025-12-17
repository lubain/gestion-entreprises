import { IPhoneNumberValidator } from "../interfaces/services/IPhoneNumberValidator";

class PhoneNumberValidator implements IPhoneNumberValidator {
  // Expression régulière pour valider les numéros de téléphone à 10 chiffres
  private phoneRegex = /^\d{10}$/;

  /**
   * Valide un numéro de téléphone avec exactement 10 chiffres.
   * @param phoneNumber - Le numéro de téléphone à valider
   * @returns true si le numéro est valide, sinon false
   */
  isValid(phoneNumber: string): boolean {
    return this.phoneRegex.test(phoneNumber);
  }

  /**
   * Formate un numéro de téléphone en supprimant les espaces et les caractères spéciaux.
   * @param phoneNumber - Le numéro de téléphone à formater
   * @returns Le numéro formaté ou null si invalide
   */
  format(phoneNumber: string): string | null {
    // Suppression des espaces et des caractères spéciaux pour normalisation
    const normalizedNumber = phoneNumber.replace(/\D/g, "");

    if (!this.isValid(normalizedNumber)) return null;

    return normalizedNumber;
  }
}

export default PhoneNumberValidator;
