import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Stack, TextField, CircularProgress, Alert } from '@mui/material';
import QuillEditor from '../components/QuillEditor';
import BlogMetadata from '../components/BlogMetadata';
import { apiRequest, getPost } from '../services/api';

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  status: 'draft' | 'published';
  categories: string[];
  tags: string[];
}

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available categories and tags - in a real app, these would come from your backend
  const [categories, setCategories] = useState<string[]>([
    'Technology', 'Design', 'Business', 'Marketing', 'Development'
  ]);

  useEffect(() => {
    // If we have an ID, fetch the post
    if (id) {
      fetchPost(id);
    }
    
    // Fetch categories and tags
    fetchCategoriesAndTags();
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      console.log(`Fetching post with ID: ${postId}`);
      
      // Use the dedicated getPost function instead
      const post = await getPost(postId);
      console.log('Post data received:', post);
      
      // Populate form with post data
      setTitle(post.title || '');
      setContent(post.content || '');
      setExcerpt(post.excerpt || '');
      setMetaDescription(post.metaDescription || '');
      setSelectedCategories(post.categories || []);
      setSelectedTags(post.tags || []);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesAndTags = async () => {
    // In a real app, you would fetch these from your backend
    // For now, we'll just use the static values
    try {
      // You could implement this endpoint
      // const data = await apiRequest('/categories-and-tags');
      // setCategories(data.categories);
      // setTags(data.tags);
    } catch (err) {
      console.error('Error fetching categories and tags:', err);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const savePost = async (status: 'draft' | 'published') => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      const postData = {
        title,
        content,
        excerpt,
        metaDescription,
        status,
        categories: selectedCategories,
        tags: selectedTags
      };
      
      if (isEditing) {
        // Update existing post
        await apiRequest(`/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify(postData)
        });
      } else {
        // Create new post
        await apiRequest('/posts', {
          method: 'POST',
          body: JSON.stringify(postData)
        });
      }
      
      // Navigate back to blog list
      navigate('/');
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '50vh' 
        }}>
          <CircularProgress sx={{ color: '#1976d2' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(45deg, #1976d2 30%, #0d47a1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Title Field */}
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(236, 244, 253, 0.5)',
                color: '#0d47a1',
                '& fieldset': {
                  borderColor: 'rgba(13, 71, 161, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#1976d2',
              },
            }}
          />

          {/* Excerpt Field */}
          <TextField
            label="Excerpt"
            variant="outlined"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            multiline
            rows={2}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(236, 244, 253, 0.5)',
                color: '#0d47a1',
                '& fieldset': {
                  borderColor: 'rgba(13, 71, 161, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#1976d2',
              },
            }}
          />

          <BlogMetadata
            content={content}
            metaDescription={metaDescription}
            onMetaDescriptionChange={setMetaDescription}
            // categories={categories}
            selectedCategories={selectedCategories}
            onCategorySelect={handleCategorySelect}
            // tags={tags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />

          <QuillEditor
            value={content}
            onChange={setContent}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                color: '#1976d2',
                borderColor: '#1976d2',
                fontFamily: '"Winky Sans", "Poppins", sans-serif',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#42a5f5',
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                },
              }}
            >
              Cancel
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                disabled={saving}
                onClick={() => savePost('draft')}
                sx={{
                  color: '#0d47a1',
                  borderColor: '#0d47a1',
                  fontFamily: '"Winky Sans", "Poppins", sans-serif',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#0d47a1',
                    backgroundColor: 'rgba(13, 71, 161, 0.1)',
                  },
                }}
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </Button>
              <Button
                variant="contained"
                disabled={saving}
                onClick={() => savePost('published')}
                sx={{
                  backgroundColor: '#1976d2',
                  fontFamily: '"Winky Sans", "Poppins", sans-serif',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                {saving ? 'Publishing...' : 'Publish'}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default BlogEditor; 