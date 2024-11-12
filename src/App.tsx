import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Book } from "./types";
import { EditBookForm } from './EditBookForm';
import { AddBookForm } from './AddBookForm';
import { ListOfBooks } from './ListOfBooks';
import { API_PATH, modalStyles } from './constants';
import { Header } from './Header';

const App = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isAddMode, setIsAddMode] = useState<boolean>(false);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        requestAllBooks();
    }, [])

    const requestAllBooks = async () => {
        setIsProcessing(true);

        const response = await fetch(`${API_PATH}/books`)
        const data = await response.json();

        setBooks(data);
        setIsProcessing(false);
    }

    const deleteBook = async ({ id }: Book) => {
        closeModal();
        setIsProcessing(true);

        const response = await fetch(`${API_PATH}/books/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            closeModal();
            requestAllBooks();
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

        requestAllBooks();
        setIsProcessing(false);
    }

    const addBook = async (newBook: Book) => {
        await fetch(`${API_PATH}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });
        requestAllBooks();
    }

    const openEditMode = () => {
        setIsEditMode(true);
    }

    const openModal = (book?: Book) => {
        if (book) {
            setSelectedBook(book);
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsEditMode(false);
        setIsOpen(false);
        setSelectedBook(null)
        setIsAddMode(false)
    };

    return (
        <div className='container'>
            <Header setIsAddMode={setIsAddMode} openModal={openModal} />
            <div className='content'>
                <ListOfBooks books={books} openModal={openModal} isProcessing={isProcessing} />
                {modalIsOpen && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={modalStyles}
                    >
                        <div>
                            {isAddMode && (
                                <AddBookForm addBook={addBook} closeModal={closeModal} setIsAddMode={setIsAddMode}/>
                            )}
                            {isEditMode && selectedBook && (
                                <EditBookForm selectedBook={selectedBook} editBook={editBook} closeModal={closeModal} />
                            )}
                            {!isEditMode && selectedBook && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h3>{selectedBook.title}</h3>
                                        <button onClick={closeModal}>x</button>
                                    </div>
                                    <button onClick={openEditMode}>edit</button>
                                    <button onClick={() => deleteBook(selectedBook)}>delete</button>
                                </>
                            )}

                        </div>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default App;
