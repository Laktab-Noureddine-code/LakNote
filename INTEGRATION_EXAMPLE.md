# Integration Example

## Quick Start

### 1. Update Your Router

If you're using React Router, update your routes:

```tsx
// In your main App.tsx or router file
import { NotesPage } from '@/components/Pages/Notes/NotesPage';
import { FoldersPage } from '@/components/Pages/Folders/FoldersPage';

// Replace your old routes with:
<Routes>
  <Route path="/notes" element={<NotesPage />} />
  <Route path="/folders" element={<FoldersPage />} />
  
  {/* Add placeholder routes for other menu items */}
  <Route path="/todos" element={<div>Todos Page - Coming Soon</div>} />
  <Route path="/saved" element={<div>Saved Page - Coming Soon</div>} />
  <Route path="/friends" element={<div>Friends Page - Coming Soon</div>} />
  <Route path="/help" element={<div>Help Page - Coming Soon</div>} />
  <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
</Routes>
```

### 2. Test the New Sidebar

Navigate to `/notes` or `/folders` in your app to see the new sidebar design.

### 3. Remove Old Sidebar (Optional)

If you want to completely replace the old admin panel sidebar:

```tsx
// Remove these imports:
// import { Sidebar } from '@/components/admin-panel/sidebar';
// import { AdminPanelLayout } from '@/components/admin-panel/admin-panel-layout';

// Replace with:
import { NotesPage } from '@/components/Pages/Notes/NotesPage';
```

### 4. Customize for Other Pages

For pages that don't need the content sidebar (like Todos, Settings):

```tsx
import { AppLayout } from '@/components/layouts/AppLayout';

export function TodosPage() {
  return (
    <AppLayout
      currentPath="/todos"
      showContentSidebar={false}  // No right sidebar
    >
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Todos</h1>
        {/* Your todos content */}
      </div>
    </AppLayout>
  );
}
```

## Sample Data

The stores come with sample data:

### Notes
- UX Design Process (green)
- Anatomy of an Optimally Designed... (blue)
- User Interface Fundamentals (purple)
- Principles Of Design (orange)

### Folders
- Work Projects (contains 2 notes)
- Personal (contains 1 note)

## API Integration

To connect to a backend API, update the stores:

```typescript
// In useNotesStore.ts
addNote: async (note) => {
  // Call your API
  const response = await fetch('/api/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });
  const newNote = await response.json();
  
  set((state) => ({
    notes: [...state.notes, newNote],
  }));
},
```

## Dark Mode

All components support dark mode automatically through Tailwind's `dark:` classes. Make sure your app has dark mode configured in `tailwind.config.js`.

## Troubleshooting

### Icons not showing
Make sure `lucide-react` is installed:
```bash
npm install lucide-react
```

### Tooltips not working
Ensure shadcn tooltip component is installed:
```bash
npx shadcn@latest add tooltip
```

### ScrollArea not working
Install the scroll-area component:
```bash
npx shadcn@latest add scroll-area
```
