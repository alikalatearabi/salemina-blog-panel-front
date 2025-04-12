import { Box, Typography, Chip, Stack, TextField, CircularProgress, Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiRequest } from '../services/api';
import AddIcon from '@mui/icons-material/Add';


interface BlogMetadataProps {
  content: string;
  metaDescription: string;
  onMetaDescriptionChange: (description: string) => void;
  // categories: string[];
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
  // tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const BlogMetadata = ({
  content,
  metaDescription,
  onMetaDescriptionChange,
  // categories,
  selectedCategories,
  onCategorySelect,
  // tags,
  selectedTags,
  onTagSelect,
}: BlogMetadataProps) => {
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [apiCategories, setApiCategories] = useState<string[]>([]);
  const [apiTags, setApiTags] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagError, setTagError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [addingTag, setAddingTag] = useState(false);
  
  // Combine prop categories with API categories
  const allCategories = [...new Set([...apiCategories])];
  // Use only API tags
  const allTags = [...new Set([...apiTags])];

  useEffect(() => {
    // Calculate word count (excluding HTML tags)
    const text = content.replace(/<[^>]*>/g, ' ').trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);

    // Calculate reading time (assuming 200 words per minute)
    setReadingTime(Math.ceil(words.length / 200));
  }, [content]);
  
  useEffect(() => {
    // Fetch categories and tags from API 
    fetchCategories();
    fetchTags();
  }, []);
  
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      setError(null);
      
      // Fetch categories from the API
      const data = await apiRequest<any>('/categories');
      
      // Handle different response formats
      let categoryNames: string[] = [];
      
      if (data && Array.isArray(data)) {
        // If response is a direct array of categories
        categoryNames = data.map((cat: any) => cat.name || cat);
      } else if (data && data.categories && Array.isArray(data.categories)) {
        // If response has a categories array property
        categoryNames = data.categories.map((cat: any) => cat.name || cat);
      } else if (data && typeof data === 'object') {
        // Try to extract any array from the response
        const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
        if (possibleArrays.length > 0) {
          const categoryArray = possibleArrays[0] as any[];
          categoryNames = categoryArray.map((cat: any) => {
            if (typeof cat === 'string') return cat;
            return cat.name || cat.title || cat.label || cat._id || '';
          }).filter(Boolean);
        }
      }
      
      console.log("API Response (categories):", data);
      console.log("Extracted categories:", categoryNames);
      
      setApiCategories(categoryNames);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchTags = async () => {
    try {
      setLoadingTags(true);
      setTagError(null);
      
      // Fetch tags from the API
      const data = await apiRequest<any>('/tags');
      
      // Handle different response formats
      let tagNames: string[] = [];
      
      if (data && Array.isArray(data)) {
        // If response is a direct array of tags
        tagNames = data.map((tag: any) => tag.name || tag);
      } else if (data && data.tags && Array.isArray(data.tags)) {
        // If response has a tags array property
        tagNames = data.tags.map((tag: any) => tag.name || tag);
      } else if (data && typeof data === 'object') {
        // Try to extract any array from the response
        const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
        if (possibleArrays.length > 0) {
          const tagArray = possibleArrays[0] as any[];
          tagNames = tagArray.map((tag: any) => {
            if (typeof tag === 'string') return tag;
            return tag.name || tag.title || tag.label || tag._id || '';
          }).filter(Boolean);
        }
      }
      
      console.log("API Response (tags):", data);
      console.log("Extracted tags:", tagNames);
      
      setApiTags(tagNames);
    } catch (err) {
      console.error('Error fetching tags:', err);
      setTagError(err instanceof Error ? err.message : 'Failed to fetch tags');
    } finally {
      setLoadingTags(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      return;
    }
    
    try {
      setAddingCategory(true);
      setError(null);
      
      // Send request to add the new category
      await apiRequest('/categories', {
        method: 'POST',
        body: JSON.stringify({ name: newCategory.trim() })
      });
      
      // Refresh categories list
      await fetchCategories();
      
      // Clear the input
      setNewCategory('');
    } catch (err) {
      console.error('Error adding category:', err);
      setError(err instanceof Error ? err.message : 'Failed to add category');
    } finally {
      setAddingCategory(false);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) {
      return;
    }
    
    try {
      setAddingTag(true);
      setTagError(null);
      
      // Send request to add the new tag
      await apiRequest('/tags', {
        method: 'POST',
        body: JSON.stringify({ name: newTag.trim() })
      });
      
      // Refresh tags list
      await fetchTags();
      
      // Clear the input
      setNewTag('');
    } catch (err) {
      console.error('Error adding tag:', err);
      setTagError(err instanceof Error ? err.message : 'Failed to add tag');
    } finally {
      setAddingTag(false);
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      backgroundColor: 'rgba(236, 244, 253, 0.7)',
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(13, 71, 161, 0.1)',
      mb: 2
    }}>
      <Stack spacing={3}>
        {/* Word Count and Reading Time */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 1 }}>
            Content Statistics
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2" sx={{ color: '#0d47a1' }}>
              Words: {wordCount}
            </Typography>
            <Typography variant="body2" sx={{ color: '#0d47a1' }}>
              Reading Time: {readingTime} min
            </Typography>
          </Stack>
        </Box>

        {/* Meta Description */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 1 }}>
            Meta Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Enter meta description..."
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
            }}
          />
          <Typography 
            variant="caption" 
            sx={{ 
              color: metaDescription.length > 160 ? '#f44336' : '#1976d2',
              mt: 1,
              display: 'block'
            }}
          >
            {metaDescription.length}/160 characters
          </Typography>
        </Box>

        {/* Categories */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 1 }}>
            Categories
          </Typography>
          
          {/* Add new category */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              size="small"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              sx={{
                flexGrow: 1,
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
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              disabled={addingCategory || !newCategory.trim()}
              startIcon={addingCategory ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(25, 118, 210, 0.3)',
                  color: 'rgba(255, 255, 255, 0.4)',
                }
              }}
            >
              Add
            </Button>
          </Stack>
          
          {loadingCategories ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} sx={{ color: '#1976d2' }} />
            </Box>
          ) : (
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {allCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => onCategorySelect(category)}
                  sx={{
                    backgroundColor: selectedCategories.includes(category) 
                      ? '#1976d2' 
                      : 'rgba(236, 244, 253, 0.7)',
                    color: selectedCategories.includes(category) 
                      ? '#ffffff' 
                      : '#0d47a1',
                    '&:hover': {
                      backgroundColor: selectedCategories.includes(category)
                        ? '#1565c0'
                        : 'rgba(25, 118, 210, 0.2)',
                    },
                    border: selectedCategories.includes(category)
                      ? '1px solid #1976d2'
                      : '1px solid rgba(13, 71, 161, 0.1)',
                  }}
                />
              ))}
            </Stack>
          )}
          {error && (
            <Typography variant="caption" sx={{ color: '#f44336', mt: 1, display: 'block' }}>
              Error: {error}
            </Typography>
          )}
        </Box>

        {/* Tags */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 1 }}>
            Tags
          </Typography>
          
          {/* Add new tag */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              size="small"
              placeholder="New tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              sx={{
                flexGrow: 1,
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
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTag}
              disabled={addingTag || !newTag.trim()}
              startIcon={addingTag ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(25, 118, 210, 0.3)',
                  color: 'rgba(255, 255, 255, 0.4)',
                }
              }}
            >
              Add
            </Button>
          </Stack>
          
          {loadingTags ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} sx={{ color: '#1976d2' }} />
            </Box>
          ) : (
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => onTagSelect(tag)}
                  sx={{
                    backgroundColor: selectedTags.includes(tag) 
                      ? '#1976d2' 
                      : 'rgba(236, 244, 253, 0.7)',
                    color: selectedTags.includes(tag) 
                      ? '#ffffff' 
                      : '#0d47a1',
                    '&:hover': {
                      backgroundColor: selectedTags.includes(tag)
                        ? '#1565c0'
                        : 'rgba(25, 118, 210, 0.2)',
                    },
                    border: selectedTags.includes(tag)
                      ? '1px solid #1976d2'
                      : '1px solid rgba(13, 71, 161, 0.1)',
                  }}
                />
              ))}
            </Stack>
          )}
          {tagError && (
            <Typography variant="caption" sx={{ color: '#f44336', mt: 1, display: 'block' }}>
              Error: {tagError}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default BlogMetadata; 