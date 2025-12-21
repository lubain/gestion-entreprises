import * as React from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordLogin({errors, register}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={errors.password !== undefined}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          height: { xs: '48px', lg: '44px' }, // Légèrement plus compact sur desktop
          fontSize: { xs: '16px', lg: '15px' },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#27aae1',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#27aae1',
            borderWidth: '1px',
          },
          // Styles pour l'autofill webkit
          '& input': {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px white inset !important',
              WebkitTextFillColor: '#374151 !important',
              borderRadius: '8px !important',
              transition: 'background-color 5000s ease-in-out 0s !important',
            },
            '&:-webkit-autofill:hover': {
              WebkitBoxShadow: '0 0 0 1000px white inset !important',
              WebkitTextFillColor: '#374151 !important',
            },
            '&:-webkit-autofill:focus': {
              WebkitBoxShadow: '0 0 0 1000px white inset !important',
              WebkitTextFillColor: '#374151 !important',
            },
            '&:-webkit-autofill:active': {
              WebkitBoxShadow: '0 0 0 1000px white inset !important',
              WebkitTextFillColor: '#374151 !important',
            },
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#27aae1',
        },
        '& .MuiFormHelperText-root': {
          fontSize: { xs: '12px', lg: '12px' },
          marginTop: { xs: '4px', lg: '3px' },
        },
      }}
    >
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        placeholder="Entrez votre mot de passe"
        {...register("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{
                color: 'text.secondary',
                padding: { xs: '8px', lg: '7px' },
                '&:hover': {
                  color: '#27aae1',
                }
              }}
            >
              {!showPassword ? <EyeOff size={16} className="lg:w-5 lg:h-5" /> : <Eye size={16} className="lg:w-5 lg:h-5" />}
            </IconButton>
          </InputAdornment>
        }
      />
      {errors.password && (
        <FormHelperText error>{errors.password.message}</FormHelperText>
      )}
    </FormControl>
  );
}
