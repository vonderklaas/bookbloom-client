import { Book } from '../types/types';

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
                <span className='book-controls-upper-title'>{selectedBook.title}</span>
                <button onClick={closeModal}>&times;</button>
            </div>
            <p className='book-controls-description'>{selectedBook.description}</p>
            <small>Published by {selectedBook.author} at {selectedBook.year}</small>
            <br />
            <br />
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={openEditMode}>Update details 🔖</button>
                <button onClick={() => deleteBook(selectedBook)}>Remove book 🗑️</button>
            </div>
        </div>
    )
}