import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [
        {
          id: '1',
          title: 'UX Design Process',
          content: '<h1>UX Design Process</h1><p>User Experience (UX) design is a crucial aspect of creating digital products that are intuitive, efficient, and enjoyable to use.</p>',
          color: '#84cc16',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Anatomy of an Optimally Designed...',
          content: '<h1>Anatomy of an Optimally Designed Interface</h1><p>A well-designed interface combines aesthetics with functionality to create seamless user interactions.</p>',
          color: '#3b82f6',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          title: 'User Interface Fundamentals',
          content: '<h1>User Interface Fundamentals</h1><p>Understanding the core principles of UI design is essential for creating effective digital experiences.</p>',
          color: '#a855f7',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          title: 'Principles Of Design',
          content: '<h1>Principles Of Design</h1><p>Design principles guide the creation of visually appealing and functional interfaces that users love.</p>',
          color: '#f97316',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              ...note,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateNote: (id, updatedNote) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updatedNote, updatedAt: new Date() }
              : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      getNote: (id) => get().notes.find((note) => note.id === id),
    }),
    {
      name: 'notes-storage',
    }
  )
);
