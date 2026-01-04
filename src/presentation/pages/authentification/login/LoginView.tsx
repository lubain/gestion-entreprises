import { useState } from "react";
import * as z from "zod";
import useLogin from "@/presentation/hooks/authentification/use-login";
import {
  formSchema,
  UseLoginForm,
} from "@/presentation/hooks/authentification/use-login-form";
import { ChevronRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useToast } from "@/presentation/hooks/use-toast";

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false); // État pour la visibilité du mot de passe
  const { errors, register, handleSubmit } = UseLoginForm();
  const { login, loading } = useLogin();
  const toast = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      login(values.email, values.password);
    } catch (err) {
      toast.error(err.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
        {/* Header avec Logo */}
        <div className="bg-slate-800 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative z-10">
            <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-blue-500/30 transform rotate-3">
              G
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Gestion PME
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Votre tableau de bord tout-en-un
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="p-8 pt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                Email professionnel
              </label>
              <div className="relative group">
                <input
                  type="email"
                  {...register("email")}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white group-hover:border-slate-300"
                  placeholder="nom@entreprise.com"
                />
                <Mail
                  className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
              </div>
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Mot de passe
                </label>
                <a
                  href="#"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"} // Type dynamique
                  {...register("password")}
                  className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white group-hover:border-slate-300"
                  placeholder="••••••••"
                />
                <Lock
                  className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />

                {/* Bouton Toggle Show/Hide */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl transition-all transform hover:translate-y-[-1px] active:translate-y-[1px] shadow-lg shadow-slate-900/20 flex justify-center items-center gap-2 mt-4"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  Se connecter <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Vous n'avez pas de compte ?{" "}
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Contactez le support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
