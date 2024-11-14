import { motion } from "framer-motion";
import { LOADING_MESSAGES } from "../constants/constants";
import { useUser } from "../context/UserContext";
import { Book } from "../types/types";
import BookCard from "./BookCard";

type BooksListProps = {
    isWishlist?: boolean; // New prop to indicate if we’re fetching wishlist books
    books: Book[]
    isProcessing: boolean;
    openModal: (book?: Book) => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedBook: Book | null;
}

export const BooksList = ({ books, isProcessing, openModal, setIsAddMode, selectedBook, isWishlist }: BooksListProps) => {

    const { user } = useUser();

    const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

    const handleAddBook = () => {
        setIsAddMode(true)
        openModal();
    }

    return (
        <>
            {user?.id && books.length >= 1 && (
                <button onClick={handleAddBook}>{isWishlist ? 'Add a wish' : 'Add a book'}</button>
            )}
            <div>
                <br/>
                {!isProcessing ? (
                    <>
                        {books.length > 0 ? (
                            <motion.div className='books' initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }}>
                                {books.map((book) => (
                                    <div key={book.id}>
                                        <BookCard book={book} openModal={openModal} selectedBook={selectedBook} isWishlist={isWishlist} />
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <>
                                {user?.id ? (
                                    <div>
                                        <button onClick={handleAddBook}>{isWishlist ? 'Add a wish' : 'Add a book'}</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>
                                            No user — no books.
                                        </p>
                                        <p>Authenticate and come back!</p>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : <div>{randomMessage}</div>}
            </div>
        </>
    )
}