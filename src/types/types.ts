export type Book = {
    id?: string;
    title: string;
    author: string;
    description?: string;
    from_wishlist?: boolean;
    created_at: Date;
}