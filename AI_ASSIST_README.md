# AI Assist Feature

## Overview
The AI Assist feature integrates Google's Gemini 2.5 Flash model to generate content for your notes using natural language prompts.

## Features
- **Floating Action Button**: Green sparkle button in the bottom-right corner
- **AI Dialog Panel**: Beautiful UI with animated orb, suggested prompts, and input field
- **Content Generation**: Generates HTML content compatible with the Tiptap editor
- **Chat History**: Stores all user prompts and AI responses in Zustand store
- **Error Handling**: Displays user-friendly error messages
- **Loading States**: Shows loading animation during API calls
- **Auto-Integration**: Generated content automatically populates the note editor

## Files Created

### 1. Environment Configuration
- `.env` - Added `VITE_GEMINI_API_KEY`

### 2. Stores
- `src/stores/useAIStore.ts` - Zustand store for AI chat history

### 3. Services
- `src/services/geminiService.ts` - API service for Gemini integration

### 4. Components
- `src/components/AIAssist/AIAssist.tsx` - Main AI Assist component
- `src/components/AIAssist/AIAssist.css` - Styling for AI Assist

### 5. Integration
- Updated `src/components/Pages/Notes/CreateNote.tsx`
- Updated `src/components/Pages/Notes/NotesWithSidebar.tsx`

## Usage

1. **Open a note** in either CreateNote or NotesWithSidebar page
2. **Click the green sparkle button** in the bottom-right corner
3. **Enter a prompt** or click a suggested prompt:
   - "Generate Summary"
   - "Create a blog post about technology"
   - "Write a tutorial on React hooks"
4. **Click Send** or press Enter
5. **Wait for generation** - The orb will animate while processing
6. **Content appears** automatically in the note editor

## API Details

**Endpoint**: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`

**Model**: `gemini-2.5-flash`

**System Prompt**: Configured to generate clean HTML compatible with Tiptap editor (supports h1-h6, p, ul, ol, li, blockquote, strong, em, u, s, pre/code, a, img, iframe)

## Error Handling

- API key validation on service initialization
- Network error handling with user-friendly messages
- Empty response validation
- Loading state management
- Error display in UI

## Storage

All user prompts and AI responses are persisted in localStorage via Zustand's persist middleware, allowing you to track your AI interaction history.

## Customization

To modify suggested prompts, edit the `suggestedPrompts` array in `AIAssist.tsx`:

```typescript
const suggestedPrompts = [
  'Your custom prompt 1',
  'Your custom prompt 2',
  'Your custom prompt 3',
];
```

## Security Note

The API key is stored in `.env` file. Make sure to:
- Add `.env` to `.gitignore`
- Never commit API keys to version control
- Use environment-specific keys for production
