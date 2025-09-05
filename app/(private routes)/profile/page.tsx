import Link from "next/link";
import css from "./ProfilePage.module.css";

export default function Profile() {
  <main className={css.mainContent}>
    <div className={css.profileCard}>
      <div className={css.header}>
        <h1 className={css.formTitle}>Profile Page</h1>
        <Link href="/" className={css.editProfileButton}>
          Edit Profile
        </Link>
      </div>
      <div className={css.avatarWrapper}>
        <img
          src="Avatar"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
      </div>
      <div className={css.profileInfo}>
        <p>Username: your_username</p>
        <p>Email: your_email@example.com</p>
      </div>
    </div>
  </main>;
}
