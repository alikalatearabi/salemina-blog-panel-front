import { useState } from 'react';
import { Container, Box, Typography, Card, CardContent, CardActions, Button, Grid, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  status: 'draft' | 'published';
  createdAt: string;
  categories: string[];
  tags: string[];
}

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs] = useState<Blog[]>([
    {
      id: '1',
      title: 'Getting Started with React',
      excerpt: 'A comprehensive guide to React development...',
      status: 'published',
      createdAt: '2024-03-20',
      categories: ['Technology', 'Development'],
      tags: ['React', 'JavaScript', 'Web Development']
    },
    {
      id: '2',
      title: 'Modern UI Design Principles',
      excerpt: 'Exploring the latest trends in UI design...',
      status: 'draft',
      createdAt: '2024-03-19',
      categories: ['Design'],
      tags: ['UI/UX', 'Design Systems']
    }
  ]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ 
            background: 'linear-gradient(45deg, #2A9D8F 30%, #E9C46A 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '-0.02em',
            fontFamily: '"Winky Sans", "Poppins", sans-serif'
          }}>
            My Blogs
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/editor')}
            sx={{
              backgroundColor: '#2A9D8F',
              fontFamily: '"Winky Sans", "Poppins", sans-serif',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#21867a',
              },
            }}
          >
            Create New Blog
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} md={6} key={blog.id}>
              <Card sx={{ 
                backgroundColor: 'rgba(26, 54, 93, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                  backgroundColor: 'rgba(26, 54, 93, 0.4)',
                }
              }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ 
                      fontFamily: '"Winky Sans", "Poppins", sans-serif',
                      color: '#63B3ED',
                      fontWeight: 600
                    }}>
                      {blog.title}
                    </Typography>
                    <Chip 
                      label={blog.status} 
                      sx={{ 
                        backgroundColor: blog.status === 'published' ? 'rgba(66, 153, 225, 0.2)' : 'rgba(99, 179, 237, 0.2)',
                        color: blog.status === 'published' ? '#4299E1' : '#63B3ED',
                        border: blog.status === 'published' ? '1px solid rgba(66, 153, 225, 0.4)' : '1px solid rgba(99, 179, 237, 0.4)',
                        fontWeight: 500,
                        fontFamily: '"Poppins", sans-serif'
                      }}
                      size="small"
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ 
                    color: '#CBD5E0',
                    mb: 2,
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    {blog.excerpt}
                  </Typography>
                  <Stack direction="row" spacing={1} mb={2}>
                    {blog.categories.map((category) => (
                      <Chip 
                        key={category} 
                        label={category} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(66, 153, 225, 0.1)',
                          color: '#4299E1',
                          border: '1px solid rgba(66, 153, 225, 0.3)',
                          fontFamily: '"Poppins", sans-serif'
                        }}
                      />
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {blog.tags.map((tag) => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(99, 179, 237, 0.1)',
                          color: '#63B3ED',
                          border: '1px solid rgba(99, 179, 237, 0.3)',
                          fontFamily: '"Poppins", sans-serif'
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button 
                    size="small"
                    onClick={() => navigate(`/editor/${blog.id}`)}
                    sx={{
                      color: '#4299E1',
                      fontFamily: '"Winky Sans", "Poppins", sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(66, 153, 225, 0.1)',
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="small"
                    sx={{
                      color: '#63B3ED',
                      fontFamily: '"Winky Sans", "Poppins", sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(99, 179, 237, 0.1)',
                      },
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BlogList; 