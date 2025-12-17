import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import ScrollToTop from "../common/navigation/ScrollToTop";
import { useForgotPassword } from "@/presentation/hooks/use-forgot-password";

export default function ForgotPasswordForm() {
  const { email, setEmail, loading, isSubmitted, sendResetLink } =
    useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendResetLink(email);
    } catch (error) {
      // L'erreur est déjà gérée dans le hook
      console.error("Erreur lors de l'envoi du lien:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 px-4 py-10">
        <ScrollToTop />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl p-8"
        >
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Email envoyé !
            </h2>
            <p className="text-slate-600 mb-6">
              Nous avons envoyé un lien de réinitialisation à{" "}
              <strong>{email}</strong>. Vérifiez votre boîte de réception et
              suivez les instructions.
            </p>
            <Link
              to="/auth/login"
              className="inline-flex items-center text-pme-primary hover:text-pme-secondary font-medium transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 px-4 py-10">
      <ScrollToTop />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl p-8"
      >
        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Mot de passe oublié
          </h1>
          <p className="text-slate-600 text-sm">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-slate-400 text-sm"
              disabled={loading}
            />
          </div>

          {/* Bouton d'envoi */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pme-primary to-pme-secondary hover:from-pme-primary/90 hover:to-pme-secondary/90 text-white font-medium rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Envoi en cours...
              </div>
            ) : (
              "Envoyer le lien"
            )}
          </button>
        </form>

        {/* Lien retour */}
        <div className="text-center mt-6">
          <Link
            to="/auth/login"
            className="inline-flex items-center text-slate-600 hover:text-pme-primary font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la connexion
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
