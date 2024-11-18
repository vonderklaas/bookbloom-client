import { useState } from "react";
import { Book } from "../../types/types";
import './AddBookForm.css'
import { Button } from "../Button/Button";

type AddBookFormProps = {
    addBook: (book: Book) => void;
    closeModal: () => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddBookForm: React.FC<AddBookFormProps> = ({ addBook, closeModal, setIsAddMode }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title && author) {
            const newBook = { title, author, created_at: new Date() };
            addBook(newBook);
            closeModal();
            setIsAddMode(false);
        }
    };

    return (
        <div className="add-book-form">
            <h2 className="add-book-form-title">Add Book</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-row">
                    <span>Book Title</span>
                    <input
                        type="text"
                        name="title"
                        minLength={3}
                        maxLength={128}
                        placeholder="Martin Eden"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className="form-row">
                    <span>Author</span>
                    <input
                        type="text"
                        name="author"
                        minLength={3}
                        maxLength={128}
                        placeholder="Jack London"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </label>
                <Button
                    className="add-buttons"
                    type="submit"
                    isDisabled={!title || !author}
                    text="Add"
                />
            </form>
        </div>
    );
};