import { Box, Typography, Chip, Stack, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface BlogMetadataProps {
  content: string;
  metaDescription: string;
  onMetaDescriptionChange: (description: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const BlogMetadata = ({
  content,
  metaDescription,
  onMetaDescriptionChange,
  categories,
  selectedCategories,
  onCategorySelect,
  tags,
  selectedTags,
  onTagSelect,
}: BlogMetadataProps) => {
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Calculate word count (excluding HTML tags)
    const text = content.replace(/<[^>]*>/g, ' ').trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);

    // Calculate reading time (assuming 200 words per minute)
    setReadingTime(Math.ceil(words.length / 200));
  }, [content]);

  return (
    <Box sx={{ 
      p: 2, 
      backgroundColor: 'rgba(38, 70, 83, 0.3)',
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      mb: 2
    }}>
      <Stack spacing={3}>
        {/* Word Count and Reading Time */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#2A9D8F', mb: 1 }}>
            Content Statistics
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Words: {wordCount}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Reading Time: {readingTime} min
            </Typography>
          </Stack>
        </Box>

        {/* Meta Description */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#2A9D8F', mb: 1 }}>
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
                backgroundColor: 'rgba(38, 70, 83, 0.2)',
                color: 'rgba(255, 255, 255, 0.9)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: '#2A9D8F',
                },
              },
            }}
          />
          <Typography 
            variant="caption" 
            sx={{ 
              color: metaDescription.length > 160 ? '#E9C46A' : 'rgba(255, 255, 255, 0.7)',
              mt: 1,
              display: 'block'
            }}
          >
            {metaDescription.length}/160 characters
          </Typography>
        </Box>

        {/* Categories */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#2A9D8F', mb: 1 }}>
            Categories
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => onCategorySelect(category)}
                sx={{
                  backgroundColor: selectedCategories.includes(category) 
                    ? '#2A9D8F' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: selectedCategories.includes(category) 
                    ? '#ffffff' 
                    : 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    backgroundColor: selectedCategories.includes(category)
                      ? '#21867a'
                      : 'rgba(42, 157, 143, 0.3)',
                  },
                  border: selectedCategories.includes(category)
                    ? '1px solid #2A9D8F'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Tags */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#2A9D8F', mb: 1 }}>
            Tags
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => onTagSelect(tag)}
                sx={{
                  backgroundColor: selectedTags.includes(tag) 
                    ? '#2A9D8F' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: selectedTags.includes(tag) 
                    ? '#ffffff' 
                    : 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    backgroundColor: selectedTags.includes(tag)
                      ? '#21867a'
                      : 'rgba(42, 157, 143, 0.3)',
                  },
                  border: selectedTags.includes(tag)
                    ? '1px solid #2A9D8F'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default BlogMetadata; 