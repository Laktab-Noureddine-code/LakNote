import { Search, Plus, Folder as FolderIcon, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFoldersStore } from '@/stores/useFoldersStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface FoldersSidebarProps {
  onFolderSelect?: (folderId: string) => void;
  selectedFolderId?: string;
}

export function FoldersSidebar({ onFolderSelect, selectedFolderId }: FoldersSidebarProps) {
  const { folders } = useFoldersStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="h-[calc(100vh-56px)] w-full lg:w-[280px] border-r bg-background flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-semibold">Your Folders</h2>
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

      {/* Folders List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredFolders.map((folder) => (
            <Link
              key={folder.id}
              to={`/folders/${folder.id}`}
              onClick={() => onFolderSelect?.(folder.id)}
              className={cn(
                'block w-full rounded-lg p-3 text-left transition-colors hover:bg-accent',
                selectedFolderId === folder.id && 'bg-accent'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded"
                  style={{ backgroundColor: folder.color || '#94a3b8' }}
                >
                  <FolderIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{folder.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {folder.noteIds.length} {folder.noteIds.length === 1 ? 'note' : 'notes'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Add Folder Button */}
      <div className="border-t p-4">
        <Button className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>
    </aside>
  );
}
