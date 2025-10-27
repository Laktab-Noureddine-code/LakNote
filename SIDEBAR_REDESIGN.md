# Sidebar Redesign - Implementation Guide

## Overview
New sidebar design with a left icon menu (70px) and a right content sidebar (280px) that shows Notes or Folders based on the current route.

## New Components Created

### 1. Stores (Zustand)
- **`/src/stores/useNotesStore.ts`** - Notes state management
  - Sample notes with colors
  - CRUD operations for notes
  - Persisted to localStorage
  
- **`/src/stores/useFoldersStore.ts`** - Folders state management
  - Sample folders with note associations
  - CRUD operations for folders
  - Persisted to localStorage

### 2. Sidebar Components

#### IconSidebar (`/src/components/sidebar/IconSidebar.tsx`)
- Fixed left sidebar (70px width)
- **Top Menu Items:**
  - Notes (FileText icon) → `/notes`
  - Todos (CheckSquare icon) → `/todos`
  - Folders (Folder icon) → `/folders`
  - Saved (Bookmark icon) → `/saved`
  - Friends (Users icon) → `/friends`
- **Bottom Menu Items:**
  - Help (HelpCircle icon) → `/help`
  - Settings (Settings icon) → `/settings`

#### NotesSidebar (`/src/components/sidebar/NotesSidebar.tsx`)
- Shows when path starts with `/notes`
- Features:
  - Search notes
  - List of notes with color indicators
  - Click to select note
  - "New Note" button

#### FoldersSidebar (`/src/components/sidebar/FoldersSidebar.tsx`)
- Shows when path starts with `/folders`
- Features:
  - Search folders
  - List of folders with colored icons
  - Shows note count per folder
  - "New Folder" button

### 3. Layout Component

#### AppLayout (`/src/components/layouts/AppLayout.tsx`)
- Main layout wrapper
- Automatically shows correct sidebar based on route
- Props:
  - `currentPath` - Current route path
  - `showContentSidebar` - Toggle content sidebar
  - `contentSidebarType` - Force specific sidebar type
  - `onNoteSelect` / `onFolderSelect` - Selection callbacks
  - `selectedNoteId` / `selectedFolderId` - Current selection

### 4. Page Components

#### NotesPage (`/src/components/Pages/Notes/NotesPage.tsx`)
- Full notes view with sidebar
- Shows selected note content
- Edit and delete buttons

#### FoldersPage (`/src/components/Pages/Folders/FoldersPage.tsx`)
- Full folders view with sidebar
- Shows folder details and contained notes
- Grid layout for notes in folder

## Usage

### Basic Implementation

```tsx
import { NotesPage } from '@/components/Pages/Notes/NotesPage';
import { FoldersPage } from '@/components/Pages/Folders/FoldersPage';

// In your router
<Route path="/notes" element={<NotesPage />} />
<Route path="/folders" element={<FoldersPage />} />
```

### Custom Layout Usage

```tsx
import { AppLayout } from '@/components/layouts/AppLayout';

function MyPage() {
  return (
    <AppLayout
      currentPath="/notes"
      showContentSidebar={true}
    >
      <div>Your content here</div>
    </AppLayout>
  );
}
```

## Styling

All components use:
- Tailwind CSS for styling
- shadcn/ui components (Button, Input, ScrollArea, Tooltip)
- Lucide React icons
- Dark mode support via Tailwind's `dark:` prefix

## Data Structure

### Note
```typescript
{
  id: string;
  title: string;
  content: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Folder
```typescript
{
  id: string;
  name: string;
  color?: string;
  noteIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Next Steps

1. **Update your main App/Router** to use the new pages
2. **Remove old sidebar components** if no longer needed
3. **Add routing** for all menu items (todos, saved, friends, help, settings)
4. **Implement note editor** for creating/editing notes
5. **Add folder management** UI for creating/editing folders
6. **Connect to backend API** (currently using local state)

## Migration from Old Sidebar

The old admin panel sidebar can be replaced by:
1. Import `NotesPage` or `FoldersPage` in your routes
2. Update route paths to match new structure
3. Remove old `Sidebar`, `Menu`, and related components
4. Update any links to use new paths

## Layout Measurements

- **Icon Sidebar**: 70px (fixed)
- **Content Sidebar**: 280px (fixed)
- **Main Content**: Remaining space (responsive)
- **Total Left Margin**: 350px when content sidebar is shown, 70px otherwise
