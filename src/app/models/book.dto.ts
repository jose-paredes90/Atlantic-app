import { BookCopyDto } from "./book-copy.dto";


export interface BookDto {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  bookCopies: BookCopyDto[]
}
