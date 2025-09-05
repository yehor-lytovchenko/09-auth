import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/serverApi";

interface NoteDetailProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: NoteDetailProps): Promise<Metadata> => {
  const { id } = await params;
  const notes = await fetchNoteById(id);

  return {
    title: notes.title,
    description: notes.content.slice(0, 15),
    openGraph: {
      title: notes.title,
      description: notes.content.slice(0, 15),
      url: `https://08-zustand-wine-seven.vercel.app/notes/filter/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: notes.title,
        },
      ],
    },
  };
};

export default async function NoteDetails({ params }: NoteDetailProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
