import styles from './SearchForm.module.css';

interface FuncProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchForm(funcProps: FuncProps) {
  const { handleSubmit, inputValue, handleChange } = funcProps;
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formDiv}>
        <input
          className={styles.searchInput}
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button className={styles.submitButton} type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
