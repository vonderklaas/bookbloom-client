import { LOADING_MESSAGES } from "./constants";
import { Book } from "./types";

// Define props type for EditBookForm
type ListOfBooksProps = {
    books: Book[]
    isProcessing: boolean;
    openModal: (book: Book) => void;
}


export const ListOfBooks = ({ books, isProcessing, openModal }: ListOfBooksProps) => {

    const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

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

            ) : <div>{randomMessage}</div>
            }
        </div>
    )
}