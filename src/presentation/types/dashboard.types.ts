/**
 * Types TypeScript modernes pour le dashboard
 *
 * Ce fichier contient toutes les interfaces et types utilisés
 * dans l'écosystème du dashboard avec une approche
 * stricte et moderne de la sécurité des types.
 */

/**
 * États de chargement standardisés
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Interface de base pour les réponses d'API
 */
export interface ApiResponse<T> {
  /** Données de la réponse */
  data: T;
  /** Statut de la réponse */
  status: "success" | "error";
  /** Message optionnel */
  message?: string;
  /** Code d'erreur optionnel */
  errorCode?: string;
}

/**
 * Interface pour les erreurs standardisées
 */
export interface DashboardError {
  /** Code d'erreur unique */
  code: string;
  /** Message d'erreur lisible */
  message: string;
  /** Détails techniques optionnels */
  details?: Record<string, unknown>;
  /** Timestamp de l'erreur */
  timestamp: Date;
}

/**
 * Métriques de santé calculées
 */
export interface HealthMetrics {
  /** Score de santé global (0-100) */
  overallScore: number;
  /** Statut textuel de la santé */
  status: "Excellente" | "Bonne" | "Moyenne" | "À surveiller" | "Préoccupante";
  /** Couleur associée au statut */
  statusColor: string;
  /** Tendance par rapport à la période précédente */
  trend?: {
    /** Valeur de la tendance en pourcentage */
    value: number;
    /** Direction de la tendance */
    direction: "up" | "down" | "stable";
    /** Période de comparaison */
    period: string;
  };
  /** Dernière mise à jour */
  lastUpdated: Date;
}

/**
 * Statistiques d'appointments
 */
export interface AppointmentStatistics {
  /** Rendez-vous complétés */
  completed: number;
  /** Rendez-vous à venir */
  upcoming: number;
  /** Rendez-vous annulés */
  cancelled: number;
  /** Rendez-vous manqués */
  missed: number;
  /** Total des rendez-vous */
  total: number;
  /** Taux de présence (en pourcentage) */
  attendanceRate: number;
}

/**
 * Données pour les graphiques d'appointments
 */
export interface AppointmentChartData {
  /** Nom de la période (mois, semaine, etc.) */
  period: string;
  /** Nombre de rendez-vous pour cette période */
  count: number;
  /** Date de la période */
  date: Date;
  /** Type de rendez-vous majoritaire */
  primaryType?: string;
}

/**
 * Configuration de thème pour les composants
 */
export interface ThemeConfig {
  /** Mode sombre activé */
  isDarkMode: boolean;
  /** Palette de couleurs primaires */
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  /** Tailles de police */
  fontSizes: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  /** Espacements */
  spacing: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
}

/**
 * Props communes pour tous les composants du dashboard
 */
export interface BaseDashboardProps {
  /** Classes CSS additionnelles */
  className?: string;
  /** ID de test pour les tests automatisés */
  testId?: string;
  /** Indicateur de chargement */
  loading?: boolean;
  /** Erreur à afficher */
  error?: DashboardError | null;
}

/**
 * Configuration de layout responsive
 */
export interface ResponsiveConfig {
  /** Configuration mobile */
  mobile: {
    columns: number;
    spacing: string;
    fontSize: string;
  };
  /** Configuration tablette */
  tablet: {
    columns: number;
    spacing: string;
    fontSize: string;
  };
  /** Configuration desktop */
  desktop: {
    columns: number;
    spacing: string;
    fontSize: string;
  };
}

/**
 * Données de tendance pour les métriques
 */
export interface TrendData {
  /** Valeur actuelle */
  current: number;
  /** Valeur précédente */
  previous: number;
  /** Pourcentage de changement */
  changePercent: number;
  /** Direction du changement */
  direction: "increase" | "decrease" | "stable";
  /** Période de comparaison */
  comparisonPeriod: string;
  /** Indicateur si la tendance est positive */
  isPositive: boolean;
}

/**
 * Configuration d'accessibilité
 */
export interface AccessibilityConfig {
  /** Support des lecteurs d'écran */
  screenReaderSupport: boolean;
  /** Navigation au clavier */
  keyboardNavigation: boolean;
  /** Contraste élevé */
  highContrast: boolean;
  /** Taille de police augmentée */
  largeFonts: boolean;
  /** Réduction des animations */
  reducedMotion: boolean;
}

/**
 * Événements du dashboard
 */
export interface DashboardEvents {
  /** Clic sur une carte de statistique */
  onStatCardClick?: (statType: string) => void;
  /** Clic sur un élément de graphique */
  onChartElementClick?: (data: AppointmentChartData) => void;
  /** Changement de période de vue */
  onPeriodChange?: (period: string) => void;
  /** Actualisation des données */
  onRefresh?: () => void;
  /** Erreur survenue */
  onError?: (error: DashboardError) => void;
}

/**
 * Configuration de performance
 */
export interface PerformanceConfig {
  /** Intervalle de rafraîchissement automatique (ms) */
  autoRefreshInterval?: number;
  /** Nombre maximum d'éléments à afficher */
  maxItems?: number;
  /** Pagination activée */
  enablePagination?: boolean;
  /** Mise en cache activée */
  enableCaching?: boolean;
  /** Durée de cache (ms) */
  cacheDuration?: number;
}

/**
 * Métadonnées pour les composants
 */
export interface ComponentMetadata {
  /** Nom du composant */
  name: string;
  /** Version du composant */
  version: string;
  /** Dernière mise à jour */
  lastUpdated: Date;
  /** Auteur/équipe responsable */
  maintainer: string;
  /** Description courte */
  description: string;
}

/**
 * Union type pour les différents types de notifications
 */
export type NotificationType = "success" | "error" | "warning" | "info";

/**
 * Interface pour les notifications
 */
export interface Notification {
  /** ID unique de la notification */
  id: string;
  /** Type de notification */
  type: NotificationType;
  /** Titre de la notification */
  title: string;
  /** Message de la notification */
  message: string;
  /** Durée d'affichage (ms) */
  duration?: number;
  /** Action optionnelle */
  action?: {
    label: string;
    handler: () => void;
  };
  /** Timestamp de création */
  createdAt: Date;
}

/**
 * Type guard pour vérifier si un objet est une erreur de dashboard
 */
export const isDashboardError = (error: unknown): error is DashboardError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    "timestamp" in error
  );
};

/**
 * Type guard pour vérifier si un objet est une réponse d'API valide
 */
export const isApiResponse = <T>(
  response: unknown
): response is ApiResponse<T> => {
  return (
    typeof response === "object" &&
    response !== null &&
    "data" in response &&
    "status" in response
  );
};
