import { ReactNode } from 'react';
import { IconSidebar } from '@/components/sidebar/IconSidebar';
import { NotesSidebar } from '@/components/sidebar/NotesSidebar';
import { FoldersSidebar } from '@/components/sidebar/FoldersSidebar';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  currentPath: string;
  showContentSidebar?: boolean;
  contentSidebarType?: 'notes' | 'folders' | null;
  onNoteSelect?: (noteId: string) => void;
  onFolderSelect?: (folderId: string) => void;
  selectedNoteId?: string;
  selectedFolderId?: string;
}

export function AppLayout({
  children,
  currentPath,
  showContentSidebar = true,
  contentSidebarType = null,
  onNoteSelect,
  onFolderSelect,
  selectedNoteId,
  selectedFolderId,
}: AppLayoutProps) {
  // Determine which content sidebar to show based on path
  let sidebarToShow = contentSidebarType;
  if (!sidebarToShow && showContentSidebar) {
    if (currentPath.startsWith('/notes')) {
      sidebarToShow = 'notes';
    } else if (currentPath.startsWith('/folders')) {
      sidebarToShow = 'folders';
    }
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Left Icon Sidebar */}
      <IconSidebar currentPath={currentPath} />

      {/* Content Sidebar (Notes or Folders) */}
      {sidebarToShow === 'notes' && (
        <NotesSidebar
          onNoteSelect={onNoteSelect}
          selectedNoteId={selectedNoteId}
        />
      )}
      {sidebarToShow === 'folders' && (
        <FoldersSidebar
          onFolderSelect={onFolderSelect}
          selectedFolderId={selectedFolderId}
        />
      )}

      {/* Main Content */}
      <main
        className={cn(
          'h-screen overflow-y-auto transition-all duration-300',
          sidebarToShow ? 'ml-[350px]' : 'ml-[70px]'
        )}
      >
        {children}
      </main>
    </div>
  );
}
