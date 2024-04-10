import axios from "axios";

function getByTitle(title: string) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&printType=books&maxResults=15&key=${import.meta.env.VITE_GOOGLE_API}`;
  return axios.get(url);
}

export default getByTitle;
