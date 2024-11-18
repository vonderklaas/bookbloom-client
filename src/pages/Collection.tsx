import Modal from 'react-modal';
import { useEffect, useState } from 'react'
import { Book } from '../types/types';
import { EditBookForm } from '../components/EditBookForm/EditBookForm';
import { AddBookForm } from '../components/AddBookForm/AddBookForm';
import { BooksList } from '../components/BooksList';
import { API_PATH, modalStyles } from '../constants/constants';
import { useUser } from '../context/UserContext';
import { BookControls } from '../components/BookControls/BookControls';
import toast from 'react-hot-toast';

type CollectionProps = {
    isWishlist: boolean;
}

export const Collection = ({ isWishlist }: CollectionProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isAddMode, setIsAddMode] = useState<boolean>(false);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const { user } = useUser();

    useEffect(() => {
        if (user?.id) {
            fetchBooksOrWishlist();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id, isWishlist]);


    const fetchBooksOrWishlist = async () => {
        setIsProcessing(true);
        const response = await fetch(`${API_PATH}/books?user_id=${user?.id}&wishlist=${isWishlist}`);
        if (response.ok) {
            const data = await response.json();
            setBooks(data);
            setIsProcessing(false);
        } else {
            return
        }
    };

    const deleteBook = async ({ id }: Book) => {
        toast('Removing the book.');
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
        try {
            const response = await fetch(`${API_PATH}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newBook, user_id: user?.id, from_wishlist: isWishlist }),
            });
            if (!response.ok) {
                toast.error("Failed to add the book. Please try again.");
            } else {
                fetchBooksOrWishlist();
            }
        } catch (error) {
            toast.error(`An error occurred while adding the book. ${error}`);
        }
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
        <div>
            <BooksList
                books={books}
                openModal={openModal}
                isProcessing={isProcessing}
                setIsAddMode={setIsAddMode}
                selectedBook={selectedBook}
                isWishlist={isWishlist}
                fetchBooksOrWishlist={fetchBooksOrWishlist}
            />
            {modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <div>
                        {!isEditMode && selectedBook && (
                            <BookControls
                                selectedBook={selectedBook}
                                closeModal={closeModal}
                                openEditMode={openEditMode}
                                deleteBook={deleteBook}
                            />
                        )}
                        {isEditMode && selectedBook && (
                            <EditBookForm
                                selectedBook={selectedBook}
                                editBook={editBook}
                                closeModal={closeModal}
                            />
                        )}
                        {isAddMode && (
                            <AddBookForm
                                addBook={addBook}
                                closeModal={closeModal}
                                setIsAddMode={setIsAddMode}
                            />
                        )}
                    </div>
                </Modal>
            )}
        </div>
    )
}