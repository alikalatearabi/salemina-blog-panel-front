import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4299E1',
      light: '#63B3ED',
      dark: '#3182CE',
    },
    secondary: {
      main: '#F6AD55',
      light: '#FBD38D',
      dark: '#ED8936',
    },
    background: {
      default: '#0F172A',
      paper: 'rgba(26, 54, 93, 0.7)',
    },
    text: {
      primary: '#E2E8F0',
      secondary: '#CBD5E0',
    },
    divider: 'rgba(226, 232, 240, 0.12)',
  },
  typography: {
    fontFamily: '"Winky Sans", "Poppins", sans-serif',
    h1: {
      fontFamily: '"Winky Sans", "Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '0.05em',
      background: 'linear-gradient(45deg, #4299E1 30%, #F6AD55 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: '"Winky Sans", "Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: '"Winky Sans", "Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      letterSpacing: '0.02em',
    },
    h4: {
      fontFamily: '"Winky Sans", "Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: '0.02em',
    },
    h5: {
      fontFamily: '"Winky Sans", "Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '0.01em',
    },
    h6: {
      fontFamily: '"Winky Sans", "Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4,
      letterSpacing: '0.01em',
    },
    subtitle1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1.1rem',
      lineHeight: 1.5,
      letterSpacing: '0.02em',
      fontStyle: 'italic',
    },
    subtitle2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '0.9rem',
      lineHeight: 1.57,
      letterSpacing: '0.01em',
      fontStyle: 'italic',
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: '1.1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: '0.9rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    button: {
      fontFamily: '"Winky Sans", "Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '0.9rem',
      lineHeight: 1.75,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'uppercase',
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          letterSpacing: '0.05em',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            '& fieldset': {
              borderColor: 'rgba(226, 232, 240, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: '#4299E1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4299E1',
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(226, 232, 240, 0.1)',
        },
      },
    },
  },
});

export default theme; 