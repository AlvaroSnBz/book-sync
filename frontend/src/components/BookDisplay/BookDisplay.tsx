import { Book } from "@frontend/src/models/Book";
import "./BookDisplay.css";

export default function BookDisplay({ volumeInfo }: Book) {
  return (
    <div>
      <h2 className="book-title">{volumeInfo.title}</h2>
      <img
        className="book-cover"
        alt="Cover not found"
        width="179px"
        src={
          volumeInfo.imageLinks?.thumbnail
            ? volumeInfo.imageLinks.thumbnail
            : "src\\assets\\coverNotFound.png"
        }
      />
      <h3 className="book-info">
        {volumeInfo.pageCount ? `Pages: ${volumeInfo.pageCount}` : ""}
      </h3>
      <h3 className="book-info">
        {volumeInfo.authors ? `Author: ${volumeInfo.authors}` : ""}
      </h3>
    </div>
  );
}
