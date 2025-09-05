import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default async function SidebarNotes() {
  const tagsList = ["All", "Todo", "Work", "Meeting", "Personal", "Shopping"];

  return (
    <ul className={css.menuList}>
      {tagsList.map((tag) => {
        return (
          <li className={css.menuItem} key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
