import { BookDto } from "./book.dto";

export interface BookCopyDto {
    id: number;
    book: BookDto;
    barcode: string;
    status: number;
}