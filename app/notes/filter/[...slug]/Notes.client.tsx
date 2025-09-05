"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./Notes.module.css";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface NotesClientProps {
  tag: string | undefined;
}

export default function NotesCLient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, query, tag],
    queryFn: () => fetchNotes(currentPage, query, tag),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback((query: string) => {
    setCurrentPage(1);
    setQuery(query);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox handleChange={handleChange} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}

        <Link className={css.button} href={"/notes/action/create"}>
          Create note +
        </Link>
      </header>

      {isSuccess && data.notes.length > 0 && (
        <NoteList notes={data?.notes || []} />
      )}

      {isLoading && !data && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
    </div>
  );
}
