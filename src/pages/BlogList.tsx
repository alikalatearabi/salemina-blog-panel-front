import { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardContent, CardActions, Button, Grid, Chip, Stack, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

interface Author {
  _id: string;
  username: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
  slug?: string;
}

interface Tag {
  _id: string;
  name: string;
  slug?: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  status: 'draft' | 'published';
  authorId: Author;
  wordCount: number;
  readingTime: number;
  views: number;
  categories: (string | Category)[];
  tags: (string | Tag)[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  publishedAt?: string;
}

interface PostsResponse {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  total: number;
}

const BlogList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await apiRequest<PostsResponse>(`/posts?page=${page}`);
        setPosts(response.posts);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  // Function to handle post deletion
  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiRequest(`/posts/${postId}`, { method: 'DELETE' });
        // Remove the deleted post from the state
        setPosts(posts.filter(post => post._id !== postId));
      } catch (err) {
        console.error('Error deleting post:', err);
        setError(err instanceof Error ? err.message : 'Failed to delete post');
      }
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get excerpt from content if not available
  const getExcerpt = (post: Post) => {
    if (post.excerpt) return post.excerpt;
    // Strip HTML tags and get first 100 characters
    const strippedContent = post.content.replace(/<[^>]*>?/gm, '');
    return strippedContent.length > 100 
      ? strippedContent.substring(0, 100) + '...' 
      : strippedContent;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ 
            background: 'linear-gradient(45deg, #1976d2 30%, #0d47a1 90%)',
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
              backgroundColor: '#1976d2',
              fontFamily: '"Winky Sans", "Poppins", sans-serif',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Create New Blog
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress sx={{ color: '#1976d2' }} />
          </Box>
        ) : posts.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 5, 
            backgroundColor: 'rgba(236, 244, 253, 0.7)',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(13, 71, 161, 0.1)',
          }}>
            <Typography variant="h6" sx={{ color: '#0d47a1', mb: 2 }}>
              No posts found
            </Typography>
            <Typography variant="body2" sx={{ color: '#1976d2', mb: 3 }}>
              Get started by creating your first blog post.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/editor')}
              sx={{
                color: '#1976d2',
                borderColor: '#1976d2',
                '&:hover': {
                  borderColor: '#1565c0',
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                },
              }}
            >
              Create Post
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} md={6} key={post._id}>
                <Card sx={{ 
                  backgroundColor: 'rgba(236, 244, 253, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(13, 71, 161, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                    backgroundColor: 'rgba(236, 244, 253, 0.9)',
                  }
                }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" sx={{ 
                        fontFamily: '"Winky Sans", "Poppins", sans-serif',
                        color: '#0d47a1',
                        fontWeight: 600
                      }}>
                        {post.title}
                      </Typography>
                      <Chip 
                        label={post.status} 
                        sx={{ 
                          backgroundColor: post.status === 'published' ? 'rgba(25, 118, 210, 0.2)' : 'rgba(66, 165, 245, 0.2)',
                          color: post.status === 'published' ? '#1976d2' : '#42a5f5',
                          border: post.status === 'published' ? '1px solid rgba(25, 118, 210, 0.4)' : '1px solid rgba(66, 165, 245, 0.4)',
                          fontWeight: 500,
                          fontFamily: '"Poppins", sans-serif'
                        }}
                        size="small"
                      />
                    </Stack>
                    <Typography variant="body2" sx={{ 
                      color: '#0d47a1',
                      mb: 2,
                      fontFamily: '"Poppins", sans-serif'
                    }}>
                      {getExcerpt(post)}
                    </Typography>
                    
                    <Typography variant="caption" sx={{ 
                      display: 'block',
                      color: '#1976d2',
                      mb: 2,
                      fontFamily: '"Poppins", sans-serif'
                    }}>
                      {post.authorId && post.authorId.name && `By ${post.authorId.name} • `}
                      {formatDate(post.createdAt)} • {post.wordCount} words • {post.readingTime} min read
                    </Typography>
                    
                    {post.categories.length > 0 && (
                      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" gap={1}>
                        {post.categories.map((category) => (
                          <Chip 
                            key={typeof category === 'object' ? category._id : category} 
                            label={typeof category === 'object' ? category.name || category.slug || category._id : category} 
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              color: '#1976d2',
                              border: '1px solid rgba(25, 118, 210, 0.3)',
                              fontFamily: '"Poppins", sans-serif'
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                    
                    {post.tags.length > 0 && (
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {post.tags.map((tag) => (
                          <Chip 
                            key={typeof tag === 'object' ? tag._id : tag} 
                            label={typeof tag === 'object' ? tag.name || tag.slug || tag._id : tag} 
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(66, 165, 245, 0.1)',
                              color: '#42a5f5',
                              border: '1px solid rgba(66, 165, 245, 0.3)',
                              fontFamily: '"Poppins", sans-serif'
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                    <Button 
                      size="small"
                      onClick={() => navigate(`/editor/${post._id}`)}
                      sx={{
                        color: '#1976d2',
                        fontFamily: '"Winky Sans", "Poppins", sans-serif',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small"
                      onClick={() => handleDeletePost(post._id)}
                      sx={{
                        color: '#42a5f5',
                        fontFamily: '"Winky Sans", "Poppins", sans-serif',
                        '&:hover': {
                          backgroundColor: 'rgba(66, 165, 245, 0.1)',
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
        )}
      </Box>
    </Container>
  );
};

export default BlogList; 