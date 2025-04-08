import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Box } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

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
    keyboard: {
      bindings: {
        space: {
          key: 32,
          handler: function(range: { index: number, length: number }, context: any) {
            return false;
          }
        }
      }
    }
  }), []);

  return (
    <Box sx={{
      '& .ql-container': {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        fontFamily: 'Inter, system-ui, sans-serif',
        backgroundColor: 'rgba(38, 70, 83, 0.3)',
        color: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        '&.ql-rtl': {
          direction: 'rtl',
          textAlign: 'right',
        },
      },
      '& .ql-toolbar': {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        backgroundColor: 'rgba(38, 70, 83, 0.3)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        marginBottom: '5px',
        '& .ql-picker': {
          color: 'rgba(255, 255, 255, 0.9)',
        },
        '& .ql-stroke': {
          stroke: 'rgba(255, 255, 255, 0.9)',
        },
        '& .ql-fill': {
          fill: 'rgba(255, 255, 255, 0.9)',
        },
        '& .ql-picker-options': {
          backgroundColor: 'rgba(38, 70, 83, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          zIndex: 3,
        },
        '& .ql-picker-item': {
          color: 'rgba(255, 255, 255, 0.9)',
        },
        '& .ql-picker-item.ql-selected': {
          color: '#2A9D8F',
        },
        '& .ql-picker-item:hover': {
          color: '#E9C46A',
        },
        '& button:hover': {
          color: '#E9C46A',
          '& .ql-stroke': {
            stroke: '#E9C46A',
          },
          '& .ql-fill': {
            fill: '#E9C46A',
          },
        },
      },
      '& .ql-editor': {
        minHeight: '200px',
        '& p': {
          color: 'rgba(255, 255, 255, 0.9)',
        },
        '&.ql-rtl': {
          direction: 'rtl',
          textAlign: 'right',
        },
        '& .ql-blank::before': {
          left: 'auto',
          right: '15px',
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
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </Box>
  );
};

export default QuillEditor; 