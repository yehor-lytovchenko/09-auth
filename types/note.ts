interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export type { Note, NewNote };
