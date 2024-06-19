import { Volume } from '@backend/src/models/Volume';
import styles from '@frontend/src/components/BookDisplay/BookDisplay.module.css';
import coverNotFound from '../../../assets/coverNotFound.png';
import BookStatusDropdown from '../BookStatusDropdown/BookStatusDropdown';

interface BookDisplayProps {
  volume: Volume;
  removeBook: (id: string) => void;
}

export default function BookDisplay({ volume, removeBook }: BookDisplayProps) {
  return (
    <div>
      <h2 className={styles.bookTitle}>{volume.volumeInfo.title}</h2>
      <img
        className={styles.bookCover}
        alt="Cover not found"
        width="179px"
        src={volume.volumeInfo.imageLinks?.thumbnail || coverNotFound}
      />
      <h3 className={styles.bookInfo}>
        {volume.volumeInfo.pageCount
          ? `Pages: ${volume.volumeInfo.pageCount}`
          : ''}
      </h3>
      <h3 className={styles.bookInfo}>
        {volume.volumeInfo.authors
          ? `Author: ${volume.volumeInfo.authors}`
          : ''}
      </h3>
      <BookStatusDropdown volume={volume} removeBook={removeBook} />
    </div>
  );
}
