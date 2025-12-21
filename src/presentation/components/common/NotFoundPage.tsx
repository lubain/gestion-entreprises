import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicRoutesNavigation } from "@/shared/constants/AppRoutesNavigation";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page non trouvée</h1>
      <p className="text-lg text-gray-600 mb-4">
        Oups ! La page que vous recherchez n'existe pas.
      </p>
      <Link
        to={PublicRoutesNavigation.MAIN_PAGE}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default PageNotFound;
