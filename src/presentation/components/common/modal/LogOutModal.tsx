import { Dialog, DialogContent, Button, Slide } from "@mui/material";
import { X, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import useLogin from "@/presentation/hooks/use-login";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

// Transition personnalisée pour la modale
const SlideTransition = React.forwardRef<
  unknown,
  TransitionProps & { children: React.ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface LogOutModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const LogOutModal = ({ isOpen, handleClose }: LogOutModalProps) => {
  const { loading, logout } = useLogin();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
    handleClose();
  };

  // Fermer la modale avec Escape
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !loading) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, loading, handleClose]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={SlideTransition}
      keepMounted
      PaperProps={{
        className: "glass-modal",
        sx: {
          borderRadius: "20px",
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
          border: "1px solid rgba(226, 232, 240, 0.3)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
          },
          "@media (prefers-color-scheme: dark)": {
            border: "1px solid rgba(51, 65, 85, 0.3)",
          },
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(12px) saturate(150%)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="relative p-6">
          {/* Bouton de fermeture */}
          <motion.button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>

          {/* Contenu principal */}
          <div className="text-center">
            {/* Titre */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold mb-2"
            >
              Confirmer la déconnexion
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-base leading-relaxed"
            >
              Êtes-vous sûr de vouloir vous déconnecter ?
            </motion.p>

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 justify-center"
            >
              {/* Bouton Annuler */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  disabled={loading}
                  className="button-hover-effect focus-ring"
                  sx={{
                    minWidth: "100px",
                    height: "40px",
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderColor: "#e2e8f0",
                    color: "#64748b",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.2), transparent)",
                      transition: "left 0.6s ease",
                    },
                    "&:hover": {
                      borderColor: "#cbd5e1",
                      backgroundColor: "rgba(148, 163, 184, 0.15)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                    "&:disabled": {
                      opacity: 0.6,
                      transform: "none",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Annuler
                </Button>
              </motion.div>

              {/* Bouton Déconnecter */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  onClick={handleLogOut}
                  loading={loading}
                  className="button-hover-effect focus-ring"
                  startIcon={
                    <motion.div
                      whileHover={{ rotate: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <LogOut size={16} />
                    </motion.div>
                  }
                  sx={{
                    minWidth: "120px",
                    height: "40px",
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    background: `
                      linear-gradient(135deg,
                        #ef4444 0%,
                        #dc2626 50%,
                        #b91c1c 100%
                      )
                    `,
                    boxShadow: `
                      0 4px 14px rgba(239, 68, 68, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                      transition: "left 0.6s ease",
                    },
                    "&:hover": {
                      background: `
                        linear-gradient(135deg,
                          #dc2626 0%,
                          #b91c1c 50%,
                          #991b1b 100%
                        )
                      `,
                      transform: "translateY(-2px)",
                      boxShadow: `
                        0 8px 25px rgba(239, 68, 68, 0.6),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3)
                      `,
                      "&::before": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: `
                        0 4px 14px rgba(239, 68, 68, 0.4),
                        inset 0 2px 4px rgba(0, 0, 0, 0.2)
                      `,
                    },
                    "&:disabled": {
                      background:
                        "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                      boxShadow: "none",
                      transform: "none",
                      "&::before": {
                        display: "none",
                      },
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Déconnecter
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
