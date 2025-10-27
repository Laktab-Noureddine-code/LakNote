import { useParams, useNavigate } from 'react-router-dom';
import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';
import { Navbar } from '@/components/admin-panel/navbar';
import { NotesSidebar } from '@/components/sidebar/NotesSidebar';
import { useNotesStore } from '@/stores/useNotesStore';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export default function NotesWithSidebar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getNote } = useNotesStore();
  
  const selectedNote = id ? getNote(id) : null;

  const handleNoteSelect = (noteId: string) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <AdminPanelLayout>
      <div className="flex flex-col h-full">
        {/* Navbar with hamburger menu */}
        <Navbar title={selectedNote ? selectedNote.title : 'Notes'} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Notes Sidebar - Hidden on mobile when a note is selected, full width when shown */}
          <div className={`${id ? 'hidden lg:block' : 'w-full lg:w-auto'}`}>
            <NotesSidebar
              onNoteSelect={handleNoteSelect}
              selectedNoteId={id}
            />
          </div>
        
          {/* Main Content - Hidden on mobile when no note selected */}
          <div className={`flex-1 overflow-auto ${!id ? 'hidden lg:block' : 'block'}`}>
            {selectedNote ? (
              <div className="h-full flex flex-col">
                {/* Note Header */}
                <div className="border-b px-4 lg:px-8 py-4 flex items-center justify-between">
                  {/* Back button on mobile */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => navigate('/notes')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </Button>
                    <h1 className="text-xl lg:text-2xl font-bold">{selectedNote.title}</h1>
                  </div>
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
                <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
                  <div className="prose dark:prose-invert max-w-none">
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
        </div>
      </div>
    </AdminPanelLayout>
  );
}
