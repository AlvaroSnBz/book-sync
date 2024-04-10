import './SearchForm.css';

interface FuncProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BookDisplay(funcProps: FuncProps) {
  const { handleSubmit, inputValue, handleChange } = funcProps;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-div">
        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button className="submit-button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
