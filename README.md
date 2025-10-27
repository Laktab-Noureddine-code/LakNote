# LakNote

A modern, feature-rich note-taking application built with React and TypeScript. LakNote provides an intuitive interface for creating, organizing, and managing your notes with a powerful rich-text editor.

## ✨ Features

- **Rich Text Editor**: Powered by TipTap with support for:
  - Text formatting (bold, italic, underline, strikethrough)
  - Headings (H1-H6)
  - Lists (bullet and numbered)
  - Code blocks with syntax highlighting
  - Images and YouTube video embeds
  - Links and text alignment
  - Blockquotes
  
- **Organized Workspace**:
  - Notes management with sidebar navigation
  - Folder organization system
  - Search functionality
  - Color-coded notes and folders
  
- **Modern UI/UX**:
  - Responsive design for desktop and mobile
  - Dark/Light mode support
  - Retractable sidebar
  - Clean and intuitive interface
  
- **Additional Features**:
  - Todo list management
  - Bookmarking system
  - User settings
  - Friends/collaboration features (coming soon)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Rich Text Editor**: TipTap
- **State Management**: Zustand + Redux Toolkit
- **Routing**: React Router v6
- **Code Highlighting**: Lowlight + Highlight.js
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Laktab-Noureddine-code/LakNote.git
   ```

2. Navigate to the project directory

   ```bash
   cd LakNote
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Run the development server

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
LakNote/
├── src/
│   ├── components/
│   │   ├── admin-panel/      # Admin layout components
│   │   ├── demo/              # Demo/placeholder content
│   │   ├── layouts/           # Layout components
│   │   ├── Notes/             # Note editor components
│   │   ├── Pages/             # Page components
│   │   ├── sidebar/           # Sidebar components
│   │   └── ui/                # shadcn/ui components
│   ├── stores/                # Zustand stores
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   └── App.tsx                # Main app component
├── public/                    # Static assets
└── package.json
```

## 🎨 Features in Detail

### Rich Text Editor
The note editor supports a wide range of formatting options including:
- Multiple heading levels
- Text styling (bold, italic, underline, strikethrough)
- Lists and blockquotes
- Code blocks with syntax highlighting for JavaScript, HTML, CSS, Java, Python, and PHP
- Image uploads and URL embeds
- YouTube video embeds
- Custom link insertion
- Text alignment options

### Organization System
- Create and manage notes with custom titles and cover images
- Organize notes into folders with color coding
- Quick search across all notes
- Sidebar navigation for easy access

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Laktab Noureddine**
- GitHub: [@Laktab-Noureddine-code](https://github.com/Laktab-Noureddine-code)

## 🙏 Credits

- UI components based on [shadcn/ui](https://ui.shadcn.com)
- Sidebar design inspired by [salimi-my](https://github.com/salimi-my/shadcn-ui-sidebar) 