import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LogOut } from 'lucide-react';

interface LogoutNavigationItemProps {
  onLogoutClick: () => void;
}

export const LogoutNavigationItem: React.FC<LogoutNavigationItemProps> = ({ onLogoutClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onLogoutClick();
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <LogOut size={20} />
        </ListItemIcon>
        <ListItemText primary="Déconnecter" />
      </ListItemButton>
    </ListItem>
  );
};
