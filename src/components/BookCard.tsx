import { Book } from '../types/types'

type BookCardProps = {
    book: Book,
    openModal: (book?: Book) => void;
    selectedBook: Book | null;
    isWishlist: boolean | undefined;
}

const BookCard = ({ book, openModal, selectedBook, isWishlist }: BookCardProps) => {
    const className = `
        ${isWishlist ? 'book-card-wish' : 'book-card'}
        ${selectedBook?.id === book?.id ? (isWishlist ? 'active-book-wishlist' : 'active-book') : ''}
    `.trim();

    return (
        <div className={className} onClick={() => openModal(book)}>
            <div className='book-card-wrapper' key={book.id}>
                <div>
                    <p className='book-card-title'>{book.title}</p>
                    <p className='book-card-author'>{book.author}</p>
                </div>
                <div className='book-card-year'>{book.year}</div>
            </div>
        </div>
    )
}

export default BookCard;
