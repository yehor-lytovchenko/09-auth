"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const tagsList = ["All", "Todo", "Work", "Meeting", "Personal", "Shopping"];

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {tagsList.map((tag) => {
            return (
              <li className={css.menuItem} key={tag}>
                <Link
                  className={css.menuLink}
                  href={`/notes/filter/${tag}`}
                  onClick={toggle}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
