import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import BlogEditor from './pages/BlogEditor';
import BlogList from './pages/BlogList';
import Login from './pages/Login';
import { isAuthenticated, logout } from './services/api';

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    // Check authentication status on mount and when localStorage changes
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };
    
    checkAuth();
    
    // Listen for storage events (if user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuth(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Router>
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(236, 244, 253, 0.8) 0%, rgba(225, 239, 254, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          zIndex: -1,
        }
      }}>
        {isAuth && (
          <AppBar position="static" sx={{ 
            backgroundColor: 'rgba(236, 244, 253, 0.7)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(13, 71, 161, 0.1)',
          }}>
            <Toolbar>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  textDecoration: 'none',
                  background: 'linear-gradient(45deg, #1976d2 30%, #0d47a1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: '"Winky Sans", "Poppins", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                Salemina
              </Typography>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: '#0d47a1',
                  fontFamily: '"Winky Sans", "Poppins", sans-serif',
                  '&:hover': {
                    color: '#1976d2',
                  },
                }}
              >
                My Blogs
              </Button>
              <Button
                component={Link}
                to="/editor"
                sx={{
                  color: '#0d47a1',
                  fontFamily: '"Winky Sans", "Poppins", sans-serif',
                  '&:hover': {
                    color: '#1976d2',
                  },
                }}
              >
                Create Blog
              </Button>
              
              {/* Signout Button */}
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  ml: 2,
                  color: '#1976d2',
                  borderColor: 'rgba(25, 118, 210, 0.5)',
                  fontFamily: '"Winky Sans", "Poppins", sans-serif',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    borderColor: '#1976d2',
                    boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Sign Out
              </Button>
              
              {/* Mobile-friendly Signout Icon Button */}
              <Tooltip title="Sign Out">
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    ml: 1,
                    color: '#1976d2',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        )}

        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <BlogList />
                </ProtectedRoute>
              } />
              <Route path="/editor" element={
                <ProtectedRoute>
                  <BlogEditor />
                </ProtectedRoute>
              } />
              <Route path="/editor/:id" element={
                <ProtectedRoute>
                  <BlogEditor />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
