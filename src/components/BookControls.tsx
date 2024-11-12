import { Book } from '../types';

type BookControlsProps = {
    selectedBook: Book;
    closeModal: () => void;
    openEditMode: () => void;
    deleteBook: (book: Book) => void;
}

const BookControls = ({ selectedBook, closeModal, openEditMode, deleteBook }: BookControlsProps) => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{selectedBook.title}</h3>
                <button onClick={closeModal}>&times;</button>
            </div>
            <br />
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={openEditMode}>Update details 🔖</button>
                <button onClick={() => deleteBook(selectedBook)}>Remove book 🗑️</button>
            </div>
        </>
    )
}

export default BookControls