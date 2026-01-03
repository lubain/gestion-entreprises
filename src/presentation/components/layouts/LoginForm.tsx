import * as z from "zod";
import useLogin from "@/presentation/hooks/authentification/use-login";
import { useToast } from "../common/toast/Toast";
import EmailLogin from "./EmailLogin";
import PasswordLogin from "./PasswordLogin";
import {
  formSchema,
  UseLoginForm,
} from "@/presentation/hooks/authentification/use-login-form";
import { Link } from "react-router-dom";
import ScrollToTop from "../common/navigation/ScrollToTop";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@mui/material";

export default function LoginForm() {
  const toast = useToast();
  const { errors, register, handleSubmit } = UseLoginForm();
  const { login, loading } = useLogin();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      login(values.email, values.password);
    } catch (err) {
      toast.error(err.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 p-4 pt-10 sm:pt-14 lg:pt-18">
      <ScrollToTop />

      {/* Carte de connexion - Design compact pour desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md lg:max-w-sm xl:max-w-md overflow-hidden rounded-xl bg-white shadow-xl"
      >
        {/* En-tête avec design moderne */}
        <div className="relative">
          {/* Gradient de fond */}
          <div className="bg-gradient-to-r from-pme-primary to-pme-secondary h-20 lg:h-16 rounded-t-xl"></div>

          {/* Icône utilisateur centrée qui déborde */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6">
            <div className="w-12 h-12 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <User size={30} className="lg:w-6 lg:h-6 text-pme-primary" />
            </div>
          </div>
        </div>

        {/* Contenu avec espacement pour l'icône */}
        <div className="pt-8 lg:pt-6 pb-4 lg:pb-3 text-center">
          <h1 className="text-3xl lg:text-3xl font-bold text-pme-fonce mb-1">
            Connexion
          </h1>
          <p className="text-sm lg:text-sm text-gray-600">
            Accédez à votre espace personnel pme
          </p>
        </div>

        {/* Contenu du formulaire - Compact sur desktop */}
        <div className="px-6 lg:px-4 py-4 lg:py-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 lg:space-y-3"
          >
            {/* Champ Email */}
            <div>
              <div className="flex items-center mb-2 lg:mb-1">
                <Mail size={16} className="text-pme-primary mr-2" />
                <span className="text-sm lg:text-sm font-medium text-slate-700">
                  Email
                </span>
              </div>
              <EmailLogin errors={errors} register={register} />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <div className="flex items-center mb-2 lg:mb-1">
                <Lock size={16} className="text-pme-primary mr-2" />
                <span className="text-sm lg:text-sm font-medium text-slate-700">
                  Mot de passe
                </span>
              </div>
              <PasswordLogin errors={errors} register={register} />
            </div>

            {/* Lien mot de passe oublié */}
            <div className="text-right">
              <Link
                to="/auth/forgot-password"
                className="text-sm lg:text-sm font-medium text-pme-primary hover:text-pme-secondary transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton de connexion */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-1"
            >
              <Button
                type="submit"
                className="w-full py-2.5 lg:py-2.5 bg-gradient-to-r from-pme-primary to-pme-secondary hover:from-pme-primary/90 hover:to-pme-secondary/90 text-white font-medium rounded-lg shadow-md transition-all duration-200 text-sm lg:text-base"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-3 w-3 lg:h-3 lg:w-3 text-white"
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
                    <span className="text-sm lg:text-sm">Connexion...</span>
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </motion.div>
          </form>
        </div>

        {/* Pied de page ultra-compact pour desktop */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 lg:px-3 py-2 lg:py-1.5">
          <p className="text-xs lg:text-xs text-center text-slate-500 leading-tight lg:leading-tight">
            En vous connectant, vous acceptez nos{" "}
            <a href="#" className="text-pme-primary hover:underline">
              CGU
            </a>{" "}
            et{" "}
            <a href="#" className="text-pme-primary hover:underline">
              Politique
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
