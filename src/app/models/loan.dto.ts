export interface LoansDto {
    id: number;
    clientId: number;
    bookCopyId: number;
    startDate?: Date;
    dueDate: Date;
    returnDate?: Date; 
    status?: number;
    barcode: string;
}