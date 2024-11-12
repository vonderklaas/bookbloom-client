import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Book } from '../types';
import { EditBookForm } from '../components/EditBookForm';
import { AddBookForm } from '../components/AddBookForm';
import { ListOfBooks } from '../components/ListOfBooks';
import { API_PATH, modalStyles } from '../constants';
import { useUser } from '../context/UserContext';
import BookControls from '../components/BookControls';

type MyBooksProps = {
    isWishlist?: boolean;  // New prop to toggle between books and wishlist
}

const MyBooks = ({isWishlist}: MyBooksProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isAddMode, setIsAddMode] = useState<boolean>(false);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const { user } = useUser();

    // Fetch books or wishlist items based on `isWishlist` prop
    useEffect(() => {
        if (user?.id) {
            fetchBooksOrWishlist();
        }
    }, [user?.id, isWishlist]);


    const fetchBooksOrWishlist = async () => {
        setIsProcessing(true);
        const response = await fetch(`${API_PATH}/books?user_id=${user?.id}&wishlist=${isWishlist}`);
        const data = await response.json();
        setBooks(data);
        setIsProcessing(false);
    };


    const deleteBook = async ({ id }: Book) => {
        setIsProcessing(true);
        closeModal();
        const response = await fetch(`${API_PATH}/books/${id}?user_id=${user?.id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            fetchBooksOrWishlist();
        }
        setIsProcessing(false);
    };


    const editBook = async (newBook: Book, id: string) => {
        setIsProcessing(true);
        closeModal();

        await fetch(`${API_PATH}/books/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ ...newBook, user_id: user?.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        fetchBooksOrWishlist();
        setIsProcessing(false);
    }

    const addBook = async (newBook: Book) => {
        await fetch(`${API_PATH}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...newBook, user_id: user?.id, wishlist: isWishlist }),
        });
        fetchBooksOrWishlist();
    };

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
        <div className='content'>
            <ListOfBooks books={books} openModal={openModal} isProcessing={isProcessing} setIsAddMode={setIsAddMode} selectedBook={selectedBook}/>
            {modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <div>
                        {!isEditMode && selectedBook && (
                            <BookControls selectedBook={selectedBook} closeModal={closeModal} openEditMode={openEditMode} deleteBook={deleteBook} />
                        )}
                        {isEditMode && selectedBook && (
                            <EditBookForm selectedBook={selectedBook} editBook={editBook} closeModal={closeModal} />
                        )}
                        {isAddMode && (
                            <AddBookForm addBook={addBook} closeModal={closeModal} setIsAddMode={setIsAddMode} />
                        )}
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default MyBooks