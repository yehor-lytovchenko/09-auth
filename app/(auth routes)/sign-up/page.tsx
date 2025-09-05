"use client";
import { Credentials } from "@/types/user";
import css from "./SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as Credentials;
    const user = await register(values);
    try {
      setUser(user);
      router.replace("/profile");
    } catch (error) {
      setError((error as ApiError).message ?? "something went wrong");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>Error</p>}
      </form>
    </main>
  );
}
