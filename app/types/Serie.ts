export type Serie = {
    
        isLent: boolean;
        books: {
            id: number;
            userId: number;
            title: string;
            volume: number;
            resume: string;
            rating: number;
            returned: boolean;
            borrower: string | null;
            date: Date | null;
            authorId: number;
            genreId: number;
            formatId: number;
            serieId: number | null;
        }[];
        name: string;
        id: number;
        userId: number;
    
};