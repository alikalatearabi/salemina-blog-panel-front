import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import BlogEditor from './pages/BlogEditor';
import BlogList from './pages/BlogList';

function App() {
  return (
    <Router>
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #264653 0%, #2A9D8F 50%, #E9C46A 100%)',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(38, 70, 83, 0.8) 0%, rgba(38, 70, 83, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          zIndex: -1,
        }
      }}>
        <AppBar position="static" sx={{ 
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #2A9D8F 30%, #E9C46A 90%)',
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
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: '"Winky Sans", "Poppins", sans-serif',
                '&:hover': {
                  color: '#E9C46A',
                },
              }}
            >
              My Blogs
            </Button>
            <Button
              component={Link}
              to="/editor"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: '"Winky Sans", "Poppins", sans-serif',
                '&:hover': {
                  color: '#E9C46A',
                },
              }}
            >
              Create Blog
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/editor" element={<BlogEditor />} />
              <Route path="/editor/:id" element={<BlogEditor />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
