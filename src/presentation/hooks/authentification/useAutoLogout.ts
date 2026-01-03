import { PublicRoutesNavigation } from "@/shared/constants/AppRoutesNavigation";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "./use-login";
import { useAppSelector } from "../redux";

const time = 15; // 15 minutes
const AUTO_LOGOUT_TIME = time * 60 * 1000; // en ms

export default function useAutoLogout() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { logout } = useLogin();
  const { userData } = useAppSelector((state) => state.authentification);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      // Déconnexion automatique
      await logout();
      navigate(`/${PublicRoutesNavigation.MAIN_PAGE}`); // ou ta route de connexion
    }, AUTO_LOGOUT_TIME);
  };

  useEffect(() => {
    if (userData) {
      // Events qui comptent comme "activité"
      const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

      events.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });

      // Démarrer le timer au premier rendu
      resetTimer();

      return () => {
        // Cleanup
        if (timerRef.current) clearTimeout(timerRef.current);
        events.forEach((event) => {
          window.removeEventListener(event, resetTimer);
        });
      };
    }
  }, [userData]);

  return null;
}
