import { Volume } from '@backend/src/models/Volume';
import styles from '@frontend/src/components/BookDisplay/BookDisplay.module.css';
import coverNotFound from '../../../assets/coverNotFound.png';
import BookStatusDropdown from '../BookStatusDropdown/BookStatusDropdown';

interface BookDisplayProps {
  volume: Volume;
  removeBook: (id: string) => void;
  openBookInfo: (() => void) | undefined;
  setSelectedBook: ((selectedVolume: Volume) => void) | undefined;
  option: 'info' | 'display';
}

export default function BookDisplay({
  volume,
  removeBook,
  openBookInfo,
  setSelectedBook,
  option,
}: BookDisplayProps) {
  const transformURL = (url: string | undefined) => {
    if (url !== undefined) {
      return url.replace('http', 'https');
    }
    return coverNotFound;
  };

  const selectBookAndOpenBookInfo = () => {
    if (openBookInfo !== undefined && setSelectedBook !== undefined) {
      setSelectedBook(volume);
      openBookInfo();
    }
  };

  return (
    <div>
      <h2 className={styles.bookTitle}>{volume.volumeInfo.title}</h2>
      <button
        type="button"
        className={styles.bookCoverButton}
        onClick={option === 'display' ? selectBookAndOpenBookInfo : undefined}
      >
        <img
          className={styles.bookCover}
          alt="Cover not found"
          src={transformURL(volume.volumeInfo.imageLinks?.thumbnail)}
        />
      </button>
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
