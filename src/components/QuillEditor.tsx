import { useMemo, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Box } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  // Debug log when value changes
  useEffect(() => {
    console.log('QuillEditor value:', value);
  }, [value]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          // Here you would typically upload the image to your server
          // For now, we'll create a local URL
          const imageUrl = URL.createObjectURL(file);
          
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, 'image', imageUrl);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean'],
        [{ 'direction': 'rtl' }]
      ],
      handlers: {
        image: imageHandler
      }
    },
    
  }), []);

  return (
    <Box sx={{
      '& .ql-container': {
        borderColor: 'rgba(13, 71, 161, 0.1)',
        borderRadius: '8px',
        fontFamily: 'Inter, system-ui, sans-serif',
        backgroundColor: 'rgba(236, 244, 253, 0.5)',
        color: '#0d47a1',
        backdropFilter: 'blur(10px)',
        '&.ql-rtl': {
          direction: 'rtl',
          textAlign: 'right',
        },
      },
      '& .ql-toolbar': {
        borderColor: 'rgba(13, 71, 161, 0.1)',
        borderRadius: '8px',
        backgroundColor: 'rgba(236, 244, 253, 0.5)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        marginBottom: '5px',
        '& .ql-picker': {
          color: '#0d47a1',
        },
        '& .ql-stroke': {
          stroke: '#0d47a1',
        },
        '& .ql-fill': {
          fill: '#0d47a1',
        },
        '& .ql-picker-options': {
          backgroundColor: 'rgba(236, 244, 253, 0.8)',
          borderColor: 'rgba(13, 71, 161, 0.1)',
          backdropFilter: 'blur(10px)',
          zIndex: 3,
        },
        '& .ql-picker-item': {
          color: '#0d47a1',
        },
        '& .ql-picker-item.ql-selected': {
          color: '#1976d2',
        },
        '& .ql-picker-item:hover': {
          color: '#42a5f5',
        },
        '& button:hover': {
          color: '#42a5f5',
          '& .ql-stroke': {
            stroke: '#42a5f5',
          },
          '& .ql-fill': {
            fill: '#42a5f5',
          },
        },
      },
      '& .ql-editor': {
        minHeight: '200px',
        '& p': {
          color: '#0d47a1',
        },
        '&.ql-rtl': {
          direction: 'rtl',
          textAlign: 'right',
        },
        '& .ql-blank::before': {
          left: 'auto',
          right: '15px',
          color: 'rgba(13, 71, 161, 0.5)',
        },
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          margin: '1rem 0',
          borderRadius: '8px',
        }
      }
    }}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        placeholder="Write your blog content here..."
        preserveWhitespace
      />
    </Box>
  );
};

export default QuillEditor; 