import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#0d47a1',
      light: '#2962ff',
      dark: '#002171',
    },
    background: {
      default: '#ffffff',
      paper: 'rgba(236, 244, 253, 0.7)',
    },
    text: {
      primary: '#0d47a1',
      secondary: '#1976d2',
    },
    divider: 'rgba(13, 71, 161, 0.12)',
  },
  typography: {
    fontFamily: '"Winky Sans", "Poppins", sans-serif',
    h1: {
      fontFamily: '"Winky Sans", "Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '0.05em',
      background: 'linear-gradient(45deg, #1976d2 30%, #0d47a1 90%)',
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
              borderColor: 'rgba(13, 71, 161, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(13, 71, 161, 0.1)',
        },
      },
    },
  },
});

export default theme; 