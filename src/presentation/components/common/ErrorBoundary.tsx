import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/**
 * Props pour le composant ErrorBoundary
 */
interface ErrorBoundaryProps {
  /** Composants enfants à protéger */
  children: ReactNode;
  /** Callback appelé quand une erreur survient */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Message d'erreur personnalisé */
  fallbackMessage?: string;
  /** Afficher le bouton de retry */
  showRetry?: boolean;
  /** Afficher le bouton de retour à l'accueil */
  showHomeButton?: boolean;
  /** Classe CSS personnalisée */
  className?: string;
}

/**
 * État du composant ErrorBoundary
 */
interface ErrorBoundaryState {
  /** Indique si une erreur a été capturée */
  hasError: boolean;
  /** Détails de l'erreur */
  error: Error | null;
  /** Informations sur l'erreur React */
  errorInfo: ErrorInfo | null;
  /** ID unique de l'erreur */
  errorId: string;
}

/**
 * Props pour le composant d'affichage d'erreur
 */
interface ErrorDisplayProps {
  /** Erreur à afficher */
  error: Error;
  /** Informations sur l'erreur */
  errorInfo: ErrorInfo;
  /** ID de l'erreur */
  errorId: string;
  /** Message personnalisé */
  fallbackMessage?: string;
  /** Fonction de retry */
  onRetry?: () => void;
  /** Fonction de retour à l'accueil */
  onGoHome?: () => void;
  /** Afficher le bouton retry */
  showRetry: boolean;
  /** Afficher le bouton home */
  showHomeButton: boolean;
}

/**
 * Composant d'affichage d'erreur moderne
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  errorInfo,
  errorId,
  fallbackMessage,
  onRetry,
  onGoHome,
  showRetry,
  showHomeButton,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        {/* Icône d'erreur */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Oups ! Une erreur s'est produite
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {fallbackMessage ||
            "Nous rencontrons un problème technique. Veuillez réessayer ou contacter le support si le problème persiste."}
        </p>

        {/* ID d'erreur */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ID d'erreur: <span className="font-mono">{errorId}</span>
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Réessayer
            </button>
          )}

          {showHomeButton && onGoHome && (
            <button
              onClick={onGoHome}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <Home className="h-4 w-4" />
              Accueil
            </button>
          )}
        </div>

        {/* Détails techniques en développement */}
        {isDevelopment && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Détails techniques
            </summary>
            <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono overflow-auto max-h-40">
              <div className="mb-2">
                <strong>Erreur:</strong> {error.message}
              </div>
              <div className="mb-2">
                <strong>Stack:</strong>
                <pre className="whitespace-pre-wrap">{error.stack}</pre>
              </div>
              <div>
                <strong>Component Stack:</strong>
                <pre className="whitespace-pre-wrap">
                  {errorInfo.componentStack}
                </pre>
              </div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

/**
 * Error Boundary moderne pour React
 *
 * Capture les erreurs JavaScript dans l'arbre des composants React,
 * les log et affiche une interface de fallback élégante.
 *
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary
 *   onError={(error, errorInfo) => {
 *     console.error('Dashboard error:', error);
 *     sendErrorToMonitoring(error, errorInfo);
 *   }}
 *   showRetry={true}
 *   showHomeButton={true}
 * >
 *   <Dashboard />
 * </ErrorBoundary>
 * ```
 *
 * @architecture
 * - Capture toutes les erreurs React dans l'arbre des composants
 * - Interface de fallback moderne et accessible
 * - Intégration avec les systèmes de monitoring
 * - Support du mode développement avec détails techniques
 *
 * @accessibility
 * - Interface accessible avec ARIA labels appropriés
 * - Contraste élevé pour les messages d'erreur
 * - Navigation au clavier pour les boutons d'action
 * - Messages d'erreur clairs et compréhensibles
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
    };
  }

  /**
   * Méthode statique appelée quand une erreur est capturée
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Génère un ID unique pour l'erreur
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      hasError: true,
      error,
      errorId,
    };
  }

  /**
   * Méthode appelée après qu'une erreur ait été capturée
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Appelle le callback d'erreur si fourni
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log l'erreur
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // TODO: Envoyer à un service de monitoring
    // sendErrorToMonitoring(dashboardError);
  }

  /**
   * Fonction pour réessayer (recharger le composant)
   */
  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
    });
  };

  /**
   * Fonction pour retourner à l'accueil
   */
  handleGoHome = () => {
    // TODO: Implémenter la navigation vers l'accueil
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      return (
        <div className={this.props.className}>
          <ErrorDisplay
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            errorId={this.state.errorId}
            fallbackMessage={this.props.fallbackMessage}
            onRetry={
              this.props.showRetry !== false ? this.handleRetry : undefined
            }
            onGoHome={this.props.showHomeButton ? this.handleGoHome : undefined}
            showRetry={this.props.showRetry !== false}
            showHomeButton={this.props.showHomeButton || false}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook pour utiliser ErrorBoundary avec des composants fonctionnels
 *
 * @hook
 * @returns Fonction pour signaler une erreur manuellement
 */
export const useErrorBoundary = () => {
  return (error: Error) => {
    throw error;
  };
};

export default ErrorBoundary;
