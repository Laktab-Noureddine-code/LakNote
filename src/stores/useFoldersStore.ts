import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Folder {
  id: string;
  name: string;
  color?: string;
  noteIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface FoldersState {
  folders: Folder[];
  addFolder: (folder: Omit<Folder, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFolder: (id: string, folder: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  getFolder: (id: string) => Folder | undefined;
  addNoteToFolder: (folderId: string, noteId: string) => void;
  removeNoteFromFolder: (folderId: string, noteId: string) => void;
}

export const useFoldersStore = create<FoldersState>()(
  persist(
    (set, get) => ({
      folders: [
        {
          id: '1',
          name: 'Work Projects',
          color: '#3b82f6',
          noteIds: ['1', '2'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Personal',
          color: '#a855f7',
          noteIds: ['3'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      addFolder: (folder) =>
        set((state) => ({
          folders: [
            ...state.folders,
            {
              ...folder,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateFolder: (id, updatedFolder) =>
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === id
              ? { ...folder, ...updatedFolder, updatedAt: new Date() }
              : folder
          ),
        })),
      deleteFolder: (id) =>
        set((state) => ({
          folders: state.folders.filter((folder) => folder.id !== id),
        })),
      getFolder: (id) => get().folders.find((folder) => folder.id === id),
      addNoteToFolder: (folderId, noteId) =>
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === folderId
              ? {
                  ...folder,
                  noteIds: [...folder.noteIds, noteId],
                  updatedAt: new Date(),
                }
              : folder
          ),
        })),
      removeNoteFromFolder: (folderId, noteId) =>
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === folderId
              ? {
                  ...folder,
                  noteIds: folder.noteIds.filter((id) => id !== noteId),
                  updatedAt: new Date(),
                }
              : folder
          ),
        })),
    }),
    {
      name: 'folders-storage',
    }
  )
);
