import { Book } from '../../types/types';
import { Button } from '../Button/Button';
import './BookControls.css'

type BookControlsProps = {
    selectedBook: Book;
    closeModal: () => void;
    openEditMode: () => void;
    deleteBook: (book: Book) => void;
}

export const BookControls = ({ selectedBook, closeModal, openEditMode, deleteBook }: BookControlsProps) => {

    console.log('selectedBook', selectedBook);
    return (
        <div className='book-controls'>
            <div className='book-controls-upper'>
                <h2 className='book-controls-upper-title'>{selectedBook.title}</h2>
                <Button
                    onClick={closeModal}
                    text="&times;"
                />
            </div>
            <p className='book-controls-description'>{selectedBook.author}</p>
            <p title={selectedBook.from_wishlist ? 'Wishlist' : 'Collection'}>{selectedBook.from_wishlist ? '✨' : '📚'}</p>
            <div className='book-controls-buttons'>
                <Button
                    onClick={openEditMode}
                    text="Update details"
                />
                <Button
                    onClick={() => deleteBook(selectedBook)}
                    text="Remove book"
                />
            </div>
        </div>
    )
}