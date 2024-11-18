import { motion } from 'framer-motion';
import { Book } from '../types/types'

type BookCardProps = {
    book: Book,
    openModal: (book?: Book) => void;
    selectedBook: Book | null;
    isWishlist: boolean | undefined;
}

const BookCard = ({ book, openModal, selectedBook, isWishlist }: BookCardProps) => {
    const className = `
        ${isWishlist ? 'book-card book-wish' : 'book-card'}
        ${selectedBook?.id === book?.id ? 'active-book' : ''}
    `.trim();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={className} onClick={() => openModal(book)}>
                <div className='book-card-wrapper' key={book.id}>
                    <div>
                        <span className='book-card-title'>{book.title}</span>
                        <p className='book-card-author'>{book.author}</p>
                    </div>
                    <div className='book-card-footer-wrapper'>
                        <div title={isWishlist ? 'Wishlist' : 'Collection'}>{isWishlist ? '✨' : '📖'}</div>
                        {/* <small className='book-card-year'>{book.year}</small> */}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default BookCard;
