import { LOADING_MESSAGES } from "../constants";
import { useUser } from "../context/UserContext";
import { Book } from "../types";
import BookCard from "./Book";

type ListOfBooksProps = {
    isWishlist?: boolean; // New prop to indicate if we’re fetching wishlist books
    books: Book[]
    isProcessing: boolean;
    openModal: (book?: Book) => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedBook: Book | null;
}

export const ListOfBooks = ({ books, isProcessing, openModal, setIsAddMode, selectedBook, isWishlist }: ListOfBooksProps) => {

    const { user } = useUser();

    const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

    const handleAddBook = () => {
        setIsAddMode(true)
        openModal();
    }

    return (
        <>
            {user?.id && books.length >= 1 && (
                <button onClick={handleAddBook}>{isWishlist ? 'Add a wish ✨' : 'Add a book 📚'}</button>
            )}
            <div className='books'>
                {!isProcessing ? (
                    <>
                        {books.length > 0 ? (
                            <>
                                {books.map((book) => (
                                    <div key={book.id}>
                                        <BookCard book={book} openModal={openModal} selectedBook={selectedBook} isWishlist={isWishlist} />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {user?.id ? (
                                    <button onClick={handleAddBook}>Add a book 📚</button>
                                ) : (
                                    <span>
                                        No user — no books.
                                    </span>
                                )}
                            </>
                        )}
                    </>
                ) : <div>{randomMessage}</div>}
            </div>
        </>
    )
}