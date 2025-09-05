"use client";
import { Credentials } from "@/types/user";
import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";

export default function SignIn() {
  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as Credentials;
    const user = await login(values);
    console.log(user);
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        <p className={css.error}>{}</p>
      </form>
    </main>
  );
}
