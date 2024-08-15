import { Volume } from '@backend/src/models/Volume';
import styles from '@frontend/src/components/BookInfo/BookInfo.module.css';
import { useState } from 'react';
import axios from 'axios';
import BookDisplay from '../BookDisplay/BookDisplay';

interface BookInfoProps {
  volume: Volume;
  removeBook: (id: string) => void;
}

export default function BookInfo({ volume, removeBook }: BookInfoProps) {
  const [startDate, setStartDate] = useState<string>('');
  const [finishDate, setFinishDate] = useState<string>('');

  const updateBook = async (
    option: 'startDate' | 'finishDate',
    date: string
  ) => {
    try {
      const volumeCopy = { ...volume };
      if (option === 'startDate') {
        volumeCopy.startDate = date;
      } else {
        volumeCopy.finishDate = date;
      }
      await axios.post<Volume[]>(`/book/updateBook`, volumeCopy);
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
  };

  const handleStartDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const date = event.target.value;
    setStartDate(date);
    updateBook('startDate', date);
  };

  const handleFinishDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const date = event.target.value;
    setFinishDate(date);
    updateBook('finishDate', date);
  };

  return (
    <>
      <BookDisplay
        volume={volume}
        option="info"
        removeBook={removeBook}
        openBookInfo={undefined}
        setSelectedBook={undefined}
      />
      <div className={styles.dateContainer}>
        <label className={styles.dateLabel} htmlFor="date">
          Start date
        </label>
        <input
          value={startDate !== '' ? startDate : volume.startDate}
          onChange={handleStartDateChange}
          type="date"
          id="date"
        />
      </div>
      <div className={styles.dateContainer}>
        <label className={styles.dateLabel} htmlFor="date">
          Finish date
        </label>
        <input
          value={finishDate !== '' ? finishDate : volume.finishDate}
          onChange={handleFinishDateChange}
          type="date"
          id="date"
        />
      </div>
    </>
  );
}
