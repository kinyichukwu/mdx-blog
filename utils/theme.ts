import { createTheme } from "@mui/material";

export const PrimaryColor = {
    main: '#76b900'
  };
export const theme = createTheme({
  
    palette: {
      mode: 'dark',
      primary: PrimaryColor,
      background: {
        default: '#0d1117', // A darker shade of black (darkent github color)
        paper: '#161b22' //  (lighter githubs dark color)
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: ({ theme }) => ({
            // we want the buttons to be white for dark mode
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary
          })
        }
      }
    }
  });