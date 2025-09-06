import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const user = await getMe();

  return {
    title: `${user.username}'s profile`,
    description: `Profile page of ${user.username}`,
    openGraph: {
      title: ` ${user.username}'s profile`,
      description: ` Profile page of ${user.username}`,
      url: "https://09-auth-three-taupe.vercel.app/profile",
      images: [
        {
          url:
            user.avatar ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${user.username}'s profile`,
        },
      ],
    },
  };
};

export default async function Profile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
