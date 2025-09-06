import { NewNote, Note } from "../../types/note";
import { nextServer } from "./api";
import { Credentials, User } from "@/types/user";

async function register(credentials: Credentials) {
  const { data } = await nextServer.post<User>("/auth/register", credentials);
  return data;
}

async function login(credentials: Credentials) {
  const { data } = await nextServer.post<User>("/auth/login", credentials);
  return data;
}

async function logout() {
  await nextServer.post<User>("/auth/logout");
}

interface SessionStatus {
  success: boolean;
}

async function checkSession() {
  const { data } = await nextServer.get<SessionStatus>("/auth/session");
  return data.success;
}

async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

async function updateMe(username: string) {
  await nextServer.patch<User>("/users/me", { username });
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function fetchNotes(
  page: number,
  query: string,
  tag: string | undefined
): Promise<FetchNotesResponse> {
  const response = await nextServer.get<FetchNotesResponse>("/notes/", {
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
  const response = await nextServer.post<Note>("/notes", params);
  return response.data;
}

async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export {
  fetchNotes,
  createNote,
  deleteNote,
  fetchNoteById,
  register,
  login,
  logout,
  checkSession,
  getMe,
  updateMe,
};
