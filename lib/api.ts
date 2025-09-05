import axios from "axios";
import { NewNote, Note } from "../types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function fetchNotes(
  page: number,
  query: string,
  tag: string | undefined
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>("/notes/", {
    params: {
      perPage: 12,
      search: query,
      page,
      ...(tag && tag.trim() !== "" && tag !== "All" && { tag: tag.trim() }),
    },
  });
  return response.data;
}

async function createNote(params: NewNote): Promise<Note> {
  const response = await axios.post<Note>("/notes", params);
  return response.data;
}

async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
}

async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}

export { fetchNotes, createNote, deleteNote, fetchNoteById };
