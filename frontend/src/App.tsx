import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Volume } from '@backend/src/models/Volume';
import getByTitle from './services/BookService';
import BookDisplay from './components/BookDisplay/BookDisplay';
import './index.css';
import SearchForm from './components/SearchForm/SearchForm';

function App() {
  const [books, setBooks] = useState<Volume[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const fetchBookStatus = async () => {
      try {
        if (!inputValue.trim()) {
          const response = await axios.get<Volume[]>(
            `http://localhost:3000/book/getBooks`
          );
          setBooks(response.data);
        }
      } catch (error) {
        console.error('Error al obtener el estado del libro:', error);
      }
    };
    fetchBookStatus();
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await getByTitle(inputValue);
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const removeBook = (id: string) => {
    if (!inputValue.trim()) {
      setBooks(books.filter((book) => book.id !== id));
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
            <BookDisplay key={book.id} volume={book} removeBook={removeBook} />
          ))}
      </ul>
    </div>
  );
}

export default App;
