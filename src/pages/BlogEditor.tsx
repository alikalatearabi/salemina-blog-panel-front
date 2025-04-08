import { useState } from 'react';
import { Container, Box, Typography, Button, Stack, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import QuillEditor from '../components/QuillEditor';
import BlogMetadata from '../components/BlogMetadata';

const BlogEditor = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Sample categories and tags - in a real app, these would come from your backend
  const categories = ['Technology', 'Design', 'Business', 'Marketing', 'Development'];
  const tags = ['React', 'TypeScript', 'Material-UI', 'Web Development', 'UI/UX'];

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={() => navigate('/')}
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                mr: 2,
                '&:hover': {
                  color: '#E9C46A',
                  backgroundColor: 'rgba(233, 196, 106, 0.1)',
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '-0.02em',
            }}>
              Create New Blog Post
            </Typography>
          </Box>

          <BlogMetadata
            content={content}
            metaDescription={metaDescription}
            onMetaDescriptionChange={setMetaDescription}
            categories={categories}
            selectedCategories={selectedCategories}
            onCategorySelect={handleCategorySelect}
            tags={tags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />

          <QuillEditor
            value={content}
            onChange={setContent}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: '#E9C46A',
                borderColor: '#E9C46A',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#E9C46A',
                  backgroundColor: 'rgba(233, 196, 106, 0.1)',
                },
              }}
            >
              Save as Draft
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2A9D8F',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#21867a',
                },
              }}
            >
              Publish
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default BlogEditor; 