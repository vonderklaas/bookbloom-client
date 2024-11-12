import { Book } from '../types'

type BookCardProps = {
    book: Book,
    openModal: (book?: Book) => void;
    selectedBook: Book | null;
    isWishlist: boolean | undefined;
}

const BookCard = ({ book, openModal, selectedBook, isWishlist }: BookCardProps) => {
    // Determine the appropriate class name based on book type and selection status
    const className = `
        ${isWishlist ? 'book-card-wish' : 'book-card'}
        ${selectedBook?.id === book?.id ? (isWishlist ? 'active-book-wishlist' : 'active-book') : ''}
    `.trim();

    return (
        <div className={className}>
            <div key={book.id} onClick={() => openModal(book)}>
                <h3 style={{color: 'orange'}}>{book.title}</h3>
                <p>{book.author}</p>
                <br/>
                <div>{book.year}</div>
            </div>
        </div>
    )
}

export default BookCard;
