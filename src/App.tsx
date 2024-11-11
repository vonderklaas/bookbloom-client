import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Book } from "./types";
import { EditBookForm } from './EditBookForm';
import { AddBookForm } from './AddBookForm';
import { ListOfBooks } from './ListOfBooks';
import { API_PATH, modalStyles } from './constants';

const App = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchBooks();
    }, [])

    const fetchBooks = async () => {
        setIsProcessing(true);

        const response = await fetch(`${API_PATH}/books`)
        const data = await response.json();

        setIsProcessing(false);
        setBooks(data);
    }

    const handleDelete = async ({ id }: Book) => {
        closeModal();
        setIsProcessing(true);

        const response = await fetch(`${API_PATH}/books/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            closeModal();
            fetchBooks();
        }

        setIsProcessing(false);
    };


    const editBook = async (newBook: Book, id: string) => {
        setIsProcessing(true);
        closeModal();

        await fetch(`${API_PATH}/books/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newBook),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        fetchBooks();
        setIsProcessing(false);
    }

    const openEditMode = () => {
        setIsEditMode(true);
    }

    const openModal = (book: Book) => {
        setSelectedBook(book);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsEditMode(false);
        setIsOpen(false);
    };

    return (
        <>
            <h1>Bookshelf App</h1>
            <AddBookForm fetchBooks={fetchBooks} />
            <ListOfBooks books={books} openModal={openModal} isProcessing={isProcessing} />
            {selectedBook && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <div>
                        {isEditMode ? (
                            <EditBookForm selectedBook={selectedBook} editBook={editBook} closeModal={closeModal} />
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3>{selectedBook.title}</h3>
                                    <button onClick={closeModal}>x</button>
                                </div>
                                <button onClick={openEditMode}>edit</button>
                                <button onClick={() => handleDelete(selectedBook)}>delete</button>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </>
    )
}

export default App;
