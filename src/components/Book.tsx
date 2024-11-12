import { Book } from '../types'

type BookCardProps = {
    book: Book,
    openModal: (book?: Book) => void;
    selectedBook: Book | null;
}

const BookCard = ({ book, openModal, selectedBook }: BookCardProps) => {
    return (
        <div className={`${selectedBook?.id === book?.id ? 'active-book' : ''}`}>
            <div key={book.id} className='book' onClick={() => openModal(book)}>
                <h3 style={{color: 'orangered'}}>{book.title}</h3>
                <p>{book.author}</p>
                <br/>
                <div>{book.year}</div>
            </div>
        </div>
    )
}

export default BookCard