# Bug Fix: Notes Display Issues

## Issues Fixed

### Issue 1: Editor Not Displaying Content
**Problem**: When selecting a note, the editor remained blank even though the note had HTML content stored.

**Root Cause**: The `useEditor` hook in `NoteEditor.tsx` only set content on initial mount. When the `content` prop changed (e.g., switching notes or AI generation), the editor didn't update.

**Solution**: Added a `useEffect` hook that monitors the `content` prop and updates the editor when it changes:

```typescript
useEffect(() => {
  if (editor && content !== editor.getHTML()) {
    editor.commands.setContent(content);
  }
}, [content, editor]);
```

### Issue 2: Sidebar Showing Raw HTML
**Problem**: The sidebar preview displayed raw HTML tags like `<h1>`, `<p>`, etc., instead of plain text.

**Root Cause**: The sidebar was directly rendering `note.content` which contained HTML markup.

**Solution**: Added a `stripHtml()` utility function that removes HTML tags and extracts plain text:

```typescript
const stripHtml = (html: string): string => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
```

## Files Modified

1. **`src/components/Pages/Notes/NoteEditor.tsx`**
   - Imported `useEffect` from React
   - Added `useEffect` to sync content prop with editor state

2. **`src/components/sidebar/NotesSidebar.tsx`**
   - Added `stripHtml()` utility function
   - Updated preview text to use `stripHtml(note.content)`

3. **`src/stores/useNotesStore.ts`**
   - Updated default notes to use HTML format instead of plain text
   - Ensures consistency with editor and AI-generated content

## Testing

To verify the fixes:

1. **Test Editor Display**:
   - Click on different notes in the sidebar
   - Editor should display the formatted content (headings, paragraphs, etc.)
   - Content should update immediately when switching notes

2. **Test Sidebar Preview**:
   - Check the sidebar note previews
   - Should show plain text without HTML tags
   - Should be readable and clean

3. **Test AI Generation**:
   - Click the AI Assist button
   - Generate content with a prompt
   - Generated HTML should appear in the editor
   - Sidebar preview should show plain text version

## Notes

- The editor uses Tiptap which expects HTML content
- All note content is stored as HTML in the Zustand store
- The sidebar strips HTML for preview purposes only
- The actual stored content remains as HTML
