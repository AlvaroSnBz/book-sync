import React, { useState } from "react";
import { Book } from "./models/Book";
import getByTitle from "./services/BookService";
import BookDisplay from "./components/BookDisplay/BookDisplay";
import "./index.css";
import SearchForm from "./components/SearchForm/SearchForm";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await getByTitle(inputValue);
      setBooks(response.data.items);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <SearchForm
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        handleChange={handleChange}
      />
      <ul>
        {books
          .filter(
            (book) =>
              book.volumeInfo.authors?.length > 0 &&
              book.volumeInfo.pageCount !== undefined
          )
          .map((book) => (
            <BookDisplay
              key={book.id}
              id={book.id}
              volumeInfo={book.volumeInfo}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
