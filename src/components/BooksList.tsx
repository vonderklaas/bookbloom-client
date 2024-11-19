import { motion } from "framer-motion";
import { LOADING_MESSAGES } from "../constants/constants";
import { useUser } from "../context/UserContext";
import { Book } from "../types/types";
import BookCard from "./BookCard";
import toast from "react-hot-toast";
import { Button } from "./Button/Button";

type BooksListProps = {
    isWishlist?: boolean;
    books: Book[];
    isProcessing: boolean;
    openModal: (book?: Book) => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedBook: Book | null;
    fetchBooksOrWishlist: () => void;
};

export const BooksList = ({ books, isProcessing, openModal, setIsAddMode, selectedBook, isWishlist, fetchBooksOrWishlist }: BooksListProps) => {
    const { user } = useUser();
    const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

    const handleAddBook = () => {
        setIsAddMode(true);
        openModal();
    };

    if (!user?.id) {
        toast("Please log in first to continue.");
        return null;
    }

    const sortedBooks = [...books].sort((a, b) => {
        const dateA = new Date(a.created_at || 0);
        const dateB = new Date(b.created_at || 0);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <>
            <div className="book-list-title-wrapper">
                <h2 className={isWishlist ? "highlight highlight-yellow" : "highlight highlight-green"}>
                    {isWishlist ? "Wishlist" : "Collection"}
                </h2>
                <Button
                    isDisabled={isProcessing}
                    onClick={fetchBooksOrWishlist}
                    className={'button-refresh'}
                    text={'↻'}
                />
            </div>
            <br />
            {user?.id && (
                <>
                    {isWishlist ? (
                        <Button
                            onClick={handleAddBook}
                            className={'button-add-wish'}
                            text={'Add a wish'}
                            isDisabled={isProcessing}
                        />
                    ) : (
                        <Button
                            onClick={handleAddBook}
                            className={'button-add-collection'}
                            text={'Add a book'}
                            isDisabled={isProcessing}
                        />
                    )}
                </>
            )}
            <>
                {!isProcessing ? (
                    <div>
                        {sortedBooks.length > 0 ? (
                            <div className="books">
                                {sortedBooks.map((book) => (
                                    <div key={book.id}>
                                        <BookCard book={book} openModal={openModal} selectedBook={selectedBook} isWishlist={isWishlist} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-books-wrapper">
                                <img className="book-add-pointer" src="/public/arrow.png" alt="Add Book" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="spinner">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {randomMessage}
                        </motion.div>
                    </div>
                )}
            </>
        </>
    );
};
