import { useState } from 'react';
import { AppLayout } from '@/components/layouts/AppLayout';
import { useNotesStore } from '@/stores/useNotesStore';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export function NotesPage() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const { notes, getNote } = useNotesStore();
  
  const selectedNote = selectedNoteId ? getNote(selectedNoteId) : null;

  return (
    <AppLayout
      currentPath="/notes"
      showContentSidebar={true}
      contentSidebarType="notes"
      onNoteSelect={setSelectedNoteId}
      selectedNoteId={selectedNoteId || undefined}
    >
      <div className="h-full bg-background">
        {selectedNote ? (
          <div className="h-full flex flex-col">
            {/* Note Header */}
            <div className="border-b px-8 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">{selectedNote.title}</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Note Content */}
            <div className="flex-1 overflow-y-auto px-8  py-6">
              <div className="prose dark:prose-invert ">
                <p>{selectedNote.content}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">No note selected</h2>
              <p className="text-muted-foreground">
                Select a note from the sidebar to view its content
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
