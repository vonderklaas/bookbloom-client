import { LOADING_MESSAGES } from "../constants";
import { useUser } from "../context/UserContext";
import { Book } from "../types";

type ListOfBooksProps = {
    books: Book[]
    isProcessing: boolean;
    openModal: (book?: Book) => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const ListOfBooks = ({ books, isProcessing, openModal, setIsAddMode }: ListOfBooksProps) => {

    const { user } = useUser();

    const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

    const handleAddBook = () => {
        setIsAddMode(true)
        openModal();
    }

    return (
        <>
            {user?.id && books.length >= 1 && (
                <>
                    <button onClick={handleAddBook}>Add book</button>
                    <br />
                    <br />
                </>
            )}
            <div className='books'>
                {!isProcessing ? (
                    <>
                        {books.length > 0 ? (
                            <>
                                {books.map((book) => (
                                    <div key={book.id} className='book' onClick={() => openModal(book)}>
                                        <h3>{book.title}</h3>
                                        <p>{book.author}</p>
                                        <div>Published at {book.year}</div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {user?.id ? (
                                    <div>
                                        No books, add one?
                                        <button onClick={handleAddBook}>Add book</button>
                                    </div>
                                ) : (
                                    <div>
                                        Register to add some books!
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : <div>{randomMessage}</div>}
            </div>
        </>
    )
}