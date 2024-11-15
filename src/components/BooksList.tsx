import { motion } from "framer-motion";
import { LOADING_MESSAGES } from "../constants/constants";
import { useUser } from "../context/UserContext";
import { Book } from "../types/types";
import BookCard from "./BookCard";
import toast from "react-hot-toast";

type BooksListProps = {
    isWishlist?: boolean;
    books: Book[]
    isProcessing: boolean;
    openModal: (book?: Book) => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedBook: Book | null;
    fetchBooksOrWishlist: () => void;
}

export const BooksList = ({ books, isProcessing, openModal, setIsAddMode, selectedBook, isWishlist, fetchBooksOrWishlist }: BooksListProps) => {

    const { user } = useUser();

    const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

    const handleAddBook = () => {
        setIsAddMode(true)
        openModal();
    }

    if (!user?.id) {
        toast('Please auth first')
        return;
    }

    return (
        <>
            <div className="book-list-title-wrapper">
                <h2 className={isWishlist ? 'highlight highlight-yellow' : 'highlight highlight-green'}>{isWishlist ? 'Wishlist' : 'Collection'}</h2>
                <button disabled={isProcessing} onClick={fetchBooksOrWishlist} className="button-refresh">↻</button>
            </div>
            <br />
            {user?.id && (
                <>
                    {isWishlist ? (
                        <button className="button-add-wish" onClick={handleAddBook}>Add a wish</button>
                    ) : (
                        <button className="button-add-collection" onClick={handleAddBook}>Add a book</button>
                    )}
                </>
            )}
            <>
                {!isProcessing ? (
                    <div>
                        {books.length > 0 ? (
                            <div className="books">
                                {books.map((book) => (
                                    <div key={book.id}>
                                        <BookCard book={book} openModal={openModal} selectedBook={selectedBook} isWishlist={isWishlist} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-books-wrapper">
                                <img className="book-add-pointer" src='/public/arrow.png' alt='Add Book' />
                            </div>
                        )}
                    </div>
                ) : <div className="spinner">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{randomMessage}</motion.div>
                </div>
                }
            </>
        </>
    )
}