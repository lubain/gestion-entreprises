import { BLACK, PRIMARY } from "@/shared/constants/Color";
import { extendTheme } from "@mui/material/styles";

export const appTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "& .MuiListItemIcon-root": {
            color: { light: BLACK, dark: "#FFF" },
          },
          "& .MuiSvgIcon-root": {
            color: { light: BLACK, dark: "#FFF" },
          },
          "& svg": {
            color: { light: BLACK, dark: "#FFF" },
          },
          "& .MuiListItemText-root": {
            "& .MuiTypography-root": {
              color: { light: BLACK, dark: "#FFF" },
            },
          },
          "&.Mui-selected": {
            "& .MuiListItemIcon-root": {
              color: PRIMARY,
            },
            "& .MuiSvgIcon-root": {
              color: PRIMARY,
            },
            "& svg": {
              color: PRIMARY,
            },
            "& .MuiListItemText-root": {
              "& .MuiTypography-root": {
                color: PRIMARY,
              },
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
