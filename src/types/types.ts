export type Book = {
    id?: string;
    title: string;
    author: string;
    description?: string;
    year: number;
    fromWishlist?: boolean;
    createdAt: Date;
}