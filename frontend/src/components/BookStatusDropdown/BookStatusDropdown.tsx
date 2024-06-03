import { BookStatus, Volume } from '@backend/src/models/Volume';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './BookStatusDropdown.css';

interface BookStatusDropdownProps {
  volume: Volume;
  removeBook: (id: string) => void;
}

export default function BookStatusDropdown({
  volume,
  removeBook,
}: BookStatusDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookStatus, setBookStatus] = useState<BookStatus | undefined>(
    undefined
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateBookStatus = async (status: string) => {
    try {
      await axios.post('http://localhost:3000/book/setBookStatus', {
        id: volume.id,
        volumeInfo: volume.volumeInfo,
        status,
      });
      console.log('Estado actualizado');
    } catch (error) {
      console.error('Error al actualizar el estado del libro:', error);
    }
  };

  const deleteBookStatus = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/book/deleteBookStatus?id=${volume.id}`,
        {}
      );
      console.log('Estado borrado');
      setBookStatus(undefined);
      removeBook(volume.id);
    } catch (error) {
      console.error('Error al borrar el estado del libro:', error);
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
        const response = await axios.get<Volume>(
          `http://localhost:3000/book/getBook?id=${volume.id}`
        );
        if (response.data != null) {
          setBookStatus(response.data.status);
        }
      } catch (error) {
        console.error('Error al obtener el estado del libro:', error);
      }
    };
    fetchBookStatus();
  }, [volume.id]);

  const handleOptionSelect = async (newStatus: BookStatus) => {
    setBookStatus(newStatus);
    await updateBookStatus(newStatus);
    toggleDropdown();
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="button-container">
        <button
          className="dropdown-toggle"
          type="button"
          onClick={toggleDropdown}
        >
          {bookStatus || 'Select an option'}
        </button>
        {bookStatus != null && (
          <button
            type="button"
            className="delete-button"
            onClick={deleteBookStatus}
          >
            <img
              className="delete-icon"
              src="src\\assets\\delete.png"
              alt="delete icon"
            />
          </button>
        )}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {Object.values(BookStatus).map((option) => (
            <div
              key={option + volume.id}
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
// https://www.flaticon.com/authors/feen
