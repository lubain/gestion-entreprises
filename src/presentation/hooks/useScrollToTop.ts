import { useEffect } from 'react';

/**
 * Configuration pour le comportement de scroll
 */
export interface ScrollToTopConfig {
  /** Position Y cible (par défaut: 0) */
  top?: number;
  /** Position X cible (par défaut: 0) */
  left?: number;
  /** Comportement de scroll (par défaut: 'smooth') */
  behavior?: ScrollBehavior;
  /** Délai avant le scroll en ms (par défaut: 0) */
  delay?: number;
  /** Condition pour activer le scroll (par défaut: true) */
  enabled?: boolean;
}

/**
 * Hook pour gérer le scroll automatique vers le haut
 * Respecte le principe de responsabilité unique (SRP)
 */
export const useScrollToTop = (
  trigger: any,
  config: ScrollToTopConfig = {}
) => {
  const {
    top = 0,
    left = 0,
    behavior = 'smooth',
    delay = 0,
    enabled = true
  } = config;

  useEffect(() => {
    if (!enabled) return;

    const scrollToTop = () => {
      window.scrollTo({
        top,
        left,
        behavior
      });
    };

    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [trigger, top, left, behavior, delay, enabled]);
};

/**
 * Hook spécialisé pour les steppers
 * Respecte le principe ouvert/fermé (OCP)
 */
export const useStepperScrollToTop = (
  activeStep: number,
  config: ScrollToTopConfig = {}
) => {
  const defaultConfig: ScrollToTopConfig = {
    behavior: 'smooth',
    delay: 100,
    enabled: true,
    ...config
  };

  useScrollToTop(activeStep, defaultConfig);
};

/**
 * Hook pour scroll conditionnel
 * Respecte le principe de substitution de Liskov (LSP)
 */
export const useConditionalScrollToTop = (
  trigger: any,
  condition: () => boolean,
  config: ScrollToTopConfig = {}
) => {
  useScrollToTop(trigger, {
    ...config,
    enabled: condition()
  });
};
