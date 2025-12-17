import { OutlinedInput, FormControl, FormHelperText } from "@mui/material";

export default function EmailLogin({errors, register}) {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={errors.email !== undefined}
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
      {/* Label supprimé car il est maintenant au-dessus avec l'icône */}
      <OutlinedInput
        id="email-input"
        placeholder="Entrez votre adresse email"
        {...register("email")}
      />
      {errors.email && (
        <FormHelperText error>{errors.email.message}</FormHelperText>
      )}
    </FormControl>
  );
}
