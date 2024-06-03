import { Volume } from '@backend/src/models/Volume';
import '@frontend/src/components/BookDisplay/BookDisplay.css';
import BookStatusDropdown from '../BookStatusDropdown/BookStatusDropdown';

interface BookDisplayProps {
  volume: Volume;
  removeBook: (id: string) => void;
}

export default function BookDisplay({ volume, removeBook }: BookDisplayProps) {
  return (
    <div>
      <h2 className="book-title">{volume.volumeInfo.title}</h2>
      <img
        className="book-cover"
        alt="Cover not found"
        width="179px"
        src={
          volume.volumeInfo.imageLinks?.thumbnail ||
          'src\\assets\\coverNotFound.png'
        }
      />
      <h3 className="book-info">
        {volume.volumeInfo.pageCount
          ? `Pages: ${volume.volumeInfo.pageCount}`
          : ''}
      </h3>
      <h3 className="book-info">
        {volume.volumeInfo.authors
          ? `Author: ${volume.volumeInfo.authors}`
          : ''}
      </h3>
      <BookStatusDropdown volume={volume} removeBook={removeBook} />
    </div>
  );
}
