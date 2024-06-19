import { BookStatus, Volume } from '@backend/src/models/Volume';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styles from './BookStatusDropdown.module.css';
import trashImage from '../../../assets/delete.png';

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
      await axios.post('/book/setBookStatus', {
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
      await axios.delete(`/book/deleteBookStatus?id=${volume.id}`, {});
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
          `/book/getBook?id=${volume.id}`
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
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.dropdownToggle}
          type="button"
          onClick={toggleDropdown}
        >
          {bookStatus || 'Select an option'}
        </button>
        {bookStatus != null && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={deleteBookStatus}
          >
            <img
              className={styles.deleteIcon}
              src={trashImage}
              alt="delete icon"
            />
          </button>
        )}
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {Object.values(BookStatus).map((option) => (
            <div
              key={option + volume.id}
              className={styles.dropdownItem}
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
