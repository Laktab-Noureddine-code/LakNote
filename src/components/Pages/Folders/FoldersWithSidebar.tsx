import { useParams, useNavigate } from 'react-router-dom';
import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';
import { Navbar } from '@/components/admin-panel/navbar';
import { FoldersSidebar } from '@/components/sidebar/FoldersSidebar';
import { useFoldersStore } from '@/stores/useFoldersStore';
import { useNotesStore } from '@/stores/useNotesStore';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function FoldersWithSidebar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getFolder } = useFoldersStore();
  const { getNote } = useNotesStore();
  
  const selectedFolder = id ? getFolder(id) : null;
  const folderNotes = selectedFolder
    ? selectedFolder.noteIds.map((noteId) => getNote(noteId)).filter((note): note is NonNullable<typeof note> => note !== undefined)
    : [];

  const handleFolderSelect = (folderId: string) => {
    navigate(`/folders/${folderId}`);
  };

  return (
    <AdminPanelLayout>
      <div className="flex flex-col h-full">
        {/* Navbar with hamburger menu */}
        <Navbar title={selectedFolder ? selectedFolder.name : 'Folders'} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Folders Sidebar - Hidden on mobile when a folder is selected, full width when shown */}
          <div className={`${id ? 'hidden lg:block' : 'w-full lg:w-auto'}`}>
            <FoldersSidebar
              onFolderSelect={handleFolderSelect}
              selectedFolderId={id}
            />
          </div>
        
          {/* Main Content - Hidden on mobile when no folder selected */}
          <div className={`flex-1 overflow-auto ${!id ? 'hidden lg:block' : 'block'}`}>
            {selectedFolder ? (
              <div className="h-full flex flex-col">
                {/* Folder Header */}
                <div className="border-b px-4 lg:px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Back button on mobile */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => navigate('/folders')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </Button>
                    <div
                      className="h-10 w-10 rounded flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: selectedFolder.color || '#94a3b8' }}
                    >
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-xl lg:text-2xl font-bold">{selectedFolder.name}</h1>
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

                {/* Folder Notes */}
                <ScrollArea className="flex-1">
                  <div className="px-4 lg:px-8 py-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Notes ({folderNotes.length})
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {folderNotes.map((note) => (
                        <div
                          key={note.id}
                          className="rounded-lg border p-4 hover:bg-accent transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            {note.color && (
                              <div
                                className="mt-1 h-4 w-4 rounded flex-shrink-0"
                                style={{ backgroundColor: note.color }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm mb-2">{note.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-3">
                                {note.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {folderNotes.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">
                          No notes in this folder yet
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">No folder selected</h2>
                  <p className="text-muted-foreground">
                    Select a folder from the sidebar to view its content
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
