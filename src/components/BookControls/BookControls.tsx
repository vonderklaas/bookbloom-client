import { Book } from '../../types/types';
import './BookControls.css'

type BookControlsProps = {
    selectedBook: Book;
    closeModal: () => void;
    openEditMode: () => void;
    deleteBook: (book: Book) => void;
}

export const BookControls = ({ selectedBook, closeModal, openEditMode, deleteBook }: BookControlsProps) => {
    return (
        <div className='book-controls'>
            <div className='book-controls-upper'>
                <h2 className='book-controls-upper-title'>{selectedBook.title}</h2>
                <button onClick={closeModal}>&times;</button>
            </div>
            <p className='book-controls-description'>{selectedBook.description}</p>
            <small>Published at {selectedBook.year}</small>
            <div className='book-controls-buttons'>
                <button onClick={openEditMode}>Update details</button>
                <button onClick={() => deleteBook(selectedBook)}>Remove book</button>
            </div>
        </div>
    )
}