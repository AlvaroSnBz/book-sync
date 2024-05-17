import { Book, BookStatus } from '@backend/src/models/Book';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './BookStatusDropdown.css';

export default function BookStatusDropdown({ id }: { id: string }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookStatus, setBookStatus] = useState<BookStatus | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateBookStatus = async (status: string) => {
    try {
      await axios.post('http://localhost:3000/book/setBookStatus', {
        id,
        status,
      });
      console.log('Estado actualizado');
    } catch (error) {
      console.error('Error al actualizar el estado del libro:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  useEffect(() => {
    const fetchBookStatus = async () => {
      try {
        const response = await axios.get<Book>(
          `http://localhost:3000/book/getBook?id=${id}`
        );
        if (response.data != null) {
          setBookStatus(response.data.status);
        }
      } catch (error) {
        console.error('Error al obtener el estado del libro:', error);
      }
    };
    fetchBookStatus();
  }, [id]);

  const handleOptionSelect = async (newStatus: BookStatus) => {
    setBookStatus(newStatus);
    await updateBookStatus(newStatus);
    toggleDropdown();
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
      >
        {bookStatus || 'Select an option'}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {Object.values(BookStatus).map((option) => (
            <div
              key={option + id}
              className="dropdown-item"
              onClick={() => handleOptionSelect(option)}
              onKeyDown={() => handleOptionSelect(option)}
              role="button"
              tabIndex={0}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
