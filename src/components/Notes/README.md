# Notes Component - TipTap Editor

## Overview
This is a simplified note-taking component with TipTap rich text editor integration. All API integrations, authentication, and backend dependencies have been removed.

## Components

### CreateNote.jsx
Main component for creating and previewing notes with:
- **Title input**: Text field for note title
- **Cover image upload**: File upload with preview
- **BlogEditor**: Full-featured rich text editor for content

### BlogEditor.jsx
Advanced rich text editor component with comprehensive toolbar featuring:
- **Text formatting**: Bold, Italic, Underline, Strikethrough
- **Headings**: H1-H6 with dropdown selector
- **Lists**: Bullet lists, Ordered lists
- **Blockquotes**: Quote blocks
- **Code blocks**: Syntax-highlighted code with language selection (JavaScript, HTML, CSS, Java, Python, PHP)
- **Text alignment**: Left, Center, Right, Justify
- **Media**: Image upload/URL, YouTube video embedding
- **Links**: Hyperlink insertion with custom text
- **Clear formatting**: Remove all formatting

### Styling
- `blogPreview.css`: Original blog preview styles
- `BlogEditor.css`: Complete editor styles with syntax highlighting

## Dependencies
```json
{
  "@tiptap/react": "^latest",
  "@tiptap/starter-kit": "^latest",
  "@tiptap/extension-underline": "^latest",
  "@tiptap/extension-text-align": "^latest",
  "@tiptap/extension-text-style": "^latest",
  "@tiptap/extension-link": "^latest",
  "@tiptap/extension-image": "^latest",
  "@tiptap/extension-youtube": "^latest",
  "@tiptap/extension-code-block-lowlight": "^latest",
  "lowlight": "^latest",
  "highlight.js": "^latest"
}
```

## Usage
```jsx
import CreateNote from './components/Notes/CreateNote';

function App() {
  return <CreateNote />;
}
```

## Features Included
✅ Title input
✅ Cover image upload with preview
✅ Full-featured rich text editor (BlogEditor with TipTap)
✅ Advanced formatting toolbar with all text styles
✅ Syntax-highlighted code blocks
✅ Image upload and URL insertion
✅ YouTube video embedding
✅ Link management
✅ Text alignment options
✅ Clean, modern UI with Tailwind CSS
✅ Lucide React icons
✅ Shadcn/ui dialog components

## Features Removed
❌ API calls and endpoints
❌ Authentication/tokens
❌ User/group/page creator logic
❌ Permission checks
❌ Publishing functionality
❌ Navigation/routing
❌ Backend integration

## Customization
The BlogEditor already includes extensive features. You can further extend it by adding:
- Text color and highlight
- Tables
- Mentions
- Collaboration features
- Custom extensions from the TipTap ecosystem
