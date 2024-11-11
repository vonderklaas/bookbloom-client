import { Book } from "./types";

// Define props type for EditBookForm
type ListOfBooksProps = {
    books: Book[]
    isProcessing: boolean;
    openModal: (book: Book) => void;
}

export const ListOfBooks = ({ books, isProcessing, openModal }: ListOfBooksProps) => {
    return (
        <div className='books'>
            {!isProcessing ? (
                <>
                    {books.map((book) => (
                        <div key={book.id} className='book' onClick={() => openModal(book)}>
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                            <div>Published at {book.year}</div>
                        </div>
                    ))}
                </>

            ) : <div>Reading books...</div>}
        </div>
    )
}