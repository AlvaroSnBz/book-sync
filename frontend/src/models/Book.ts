export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string | undefined;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  description: string;
  imageLinks: ImageLinks;
  pageCount: number;
}

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}
