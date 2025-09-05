import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  description: " This page does not exist.",
  openGraph: {
    title: "Page not found",
    description: " This page does not exist.",
    url: "https://08-zustand-wine-seven.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
