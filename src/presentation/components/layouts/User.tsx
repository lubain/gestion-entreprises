import { utilisateurs_role_enum } from "@/domain/models/enums";
import { useAppSelector } from "@/presentation/hooks/redux";
import { AdminRoutesNavigations } from "@/shared/constants/AppRoutesNavigation";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  LayoutDashboard,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { LogOutModal } from "../common/modal/LogOutModal";

// Composant pour l'icône utilisateur
export const User = () => {
  const user = useAppSelector((state) => state.authentification.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [isNotOnLayoutDashboard, setIsNotOnLayoutDashboard] =
    React.useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateToDashboard = () => {
    switch (user?.role) {
      case utilisateurs_role_enum.ADMIN:
        navigate(`/${AdminRoutesNavigations.DASHBOARD}`);
        break;
      default:
        break;
    }
  };

  const handleNavigateToProfile = () => {
    switch (user?.role) {
      case utilisateurs_role_enum.ADMIN:
        navigate(`/${AdminRoutesNavigations.DASHBOARD}`);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setIsNotOnLayoutDashboard(!location.pathname.includes("/admin/"));
  }, [location.pathname]);

  const handleCloseModal = async () => {
    setIsLogOutModalOpen(false);
  };

  const handleOpenModal = async () => {
    handleClose();
    setIsLogOutModalOpen(true);
  };

  return (
    <Stack direction="row" alignItems="center">
      <Tooltip title="User menu" enterDelay={1000}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="user menu"
          size="small"
        >
          <UserIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {isLogOutModalOpen && (
        <LogOutModal
          isOpen={isLogOutModalOpen}
          handleClose={handleCloseModal}
        />
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {user?.id && isNotOnLayoutDashboard && (
          <MenuItem
            onClick={handleNavigateToDashboard}
            className="flex items-center gap-2"
          >
            <LayoutDashboard /> <Typography>Tableau de bord</Typography>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleClose();
            handleNavigateToProfile();
          }}
          className="flex items-center gap-2"
        >
          <UserIcon /> <Typography>Profil</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} className="flex items-center gap-2">
          <SettingsIcon /> <Typography>Parametre</Typography>
        </MenuItem>
        <MenuItem onClick={handleOpenModal} className="flex items-center gap-2">
          <LogOutIcon /> <Typography>Déconnexion</Typography>
        </MenuItem>
      </Menu>
    </Stack>
  );
};
