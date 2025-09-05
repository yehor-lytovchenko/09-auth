"use client";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

import css from "./NotePreview.module.css";
import { useParams } from "next/navigation";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  if (note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleString()}
            </p>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.backBtn} onClick={handleClose}>
              Back
            </button>
          </div>
        </div>
      </Modal>
    );
  } else if (isLoading) {
    return <p>Loading, please wait...</p>;
  } else if (error) {
    return <p>Something went wrong.</p>;
  }
}
