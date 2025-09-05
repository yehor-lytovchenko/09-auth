import css from "./SearchBox.module.css";

interface SearchBoxProps {
  handleChange: (query: string) => void;
}

export default function SearchBox({ handleChange }: SearchBoxProps) {
  return (
    <input
      onChange={(event) => handleChange(event.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
