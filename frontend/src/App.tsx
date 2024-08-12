import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookStatus, Volume } from '@backend/src/models/Volume';
import getByTitle from './services/BookService';
import BookDisplay from './components/BookDisplay/BookDisplay';
import './index.css';
import SearchForm from './components/SearchForm/SearchForm';
import Login from './components/Login/Login';

function App() {
  const [books, setBooks] = useState<Volume[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [selectedStatusToFilter, setSelectedStatusToFilter] =
    useState<string>('');

  useEffect(() => {
    const getBooksByUsername = async () => {
      try {
        if (!inputValue.trim() && isLogged) {
          const username = localStorage.getItem('username');
          const response = await axios.get<Volume[]>(
            `/book/getBooksByUsername`,
            {
              params: {
                username,
              },
            }
          );
          setBooks(response.data);
        }
      } catch (error) {
        console.error('Error al obtener el estado del libro:', error);
      }
    };
    getBooksByUsername();
  }, [inputValue, isLogged]);

  useEffect(() => {
    const getBooksByStatus = async () => {
      if (inputValue === '') {
        try {
          const username = localStorage.getItem('username');
          const response = await axios.get<Volume[]>(`/book/getBooksByStatus`, {
            params: {
              username,
              status: selectedStatusToFilter,
            },
          });
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching books by status', error);
        }
      }
    };
    getBooksByStatus();
  }, [inputValue, selectedStatusToFilter]);

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

  const handleIsLogged = (option: boolean) => {
    setIsLogged(option);
  };

  const handleStatusToFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedStatusToFilter(event.target.value);
  };

  return (
    <div>
      <h1>{isLogged}</h1>
      {isLogged === false && <Login setIsLogged={handleIsLogged} />}
      {isLogged === true && (
        <div>
          <SearchForm
            handleSubmit={handleSubmit}
            inputValue={inputValue}
            handleChange={handleChange}
          />
          {inputValue === '' && (
            <div className="form-div">
              <h3 className="status-filter-text">Filter books by status</h3>
              <select
                value={selectedStatusToFilter}
                onChange={handleStatusToFilter}
              >
                <option label="None" value="" />
                {Object.values(BookStatus).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

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
                  volume={book}
                  removeBook={removeBook}
                />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
