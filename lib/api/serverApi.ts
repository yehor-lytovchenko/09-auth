import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";

async function checkServerSession() {
  const cookieStore = await cookies();

  const response = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
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
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes/", {
    params: {
      perPage: 12,
      search: query,
      page,
      ...(tag && tag.trim() !== "" && tag !== "All" && { tag: tag.trim() }),
    },
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

async function getMe() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export { checkServerSession, fetchNotes, fetchNoteById, getMe };
