import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesCLient from "./Notes.client";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/clientApi";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
  return {
    title: slug[0] === "All" ? "All notes" : `${slug[0]} notes`,
    description: slug[0] === "All" ? "All notes" : `Notes with tag ${slug[0]}`,
    openGraph: {
      title: slug[0] === "All" ? "All notes" : `${slug[0]} notes`,
      description:
        slug[0] === "All" ? "All notes" : `Notes with tag ${slug[0]}`,
      url: `https://08-zustand-wine-seven.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: slug[0] === "All" ? "All notes" : `${slug[0]} notes`,
        },
      ],
    },
  };
};

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  console.log(slug[0]);
  const tag = slug[0] === "All" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesCLient tag={tag} />
    </HydrationBoundary>
  );
}
