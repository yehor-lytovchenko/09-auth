"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleClickLogOut = async () => {
    await logout();
    clearIsAuthenticated();
    router.replace("/sign-in");
  };

  return (
    <>
      {isAuthenticated ? (
        <ul>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.username}</p>
            <button className={css.logoutButton} onClick={handleClickLogOut}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
