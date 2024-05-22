import { Volume } from '@backend/src/models/Volume';
import '@frontend/src/components/BookDisplay/BookDisplay.css';
import BookStatusDropdown from '../BookStatusDropdown/BookStatusDropdown';

export default function BookDisplay({ id, volumeInfo }: Volume) {
  return (
    <div>
      <h2 className="book-title">{volumeInfo.title}</h2>
      <img
        className="book-cover"
        alt="Cover not found"
        width="179px"
        src={
          volumeInfo.imageLinks?.thumbnail || 'src\\assets\\coverNotFound.png'
        }
      />
      <h3 className="book-info">
        {volumeInfo.pageCount ? `Pages: ${volumeInfo.pageCount}` : ''}
      </h3>
      <h3 className="book-info">
        {volumeInfo.authors ? `Author: ${volumeInfo.authors}` : ''}
      </h3>
      <BookStatusDropdown id={id} volumeInfo={volumeInfo} status={undefined} />
    </div>
  );
}
