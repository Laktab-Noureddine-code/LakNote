import { Search, Plus, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotesStore, Note } from '@/stores/useNotesStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface NotesSidebarProps {
  onNoteSelect?: (noteId: string) => void;
  selectedNoteId?: string;
}

export function NotesSidebar({ onNoteSelect, selectedNoteId }: NotesSidebarProps) {
  const { notes } = useNotesStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Utility function to strip HTML tags and get plain text
  const stripHtml = (html: string): string => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="h-[calc(100vh-56px)] w-full lg:w-[280px] border-r bg-background flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-semibold">Your Notes</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="border-b px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Notes List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredNotes.map((note) => (
            <Link
              key={note.id}
              to={`/notes/${note.id}`}
              onClick={() => onNoteSelect?.(note.id)}
              className={cn(
                'block w-full rounded-lg p-3 text-left transition-colors hover:bg-accent',
                selectedNoteId === note.id && 'bg-accent'
              )}
            >
              <div className="flex items-start gap-3">
                {note.color && (
                  <div
                    className="mt-1 h-4 w-4 rounded flex-shrink-0"
                    style={{ backgroundColor: note.color }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{note.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {stripHtml(note.content)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Add Note Button */}
      <div className="border-t p-4">
        <Button className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>
    </aside>
  );
}
