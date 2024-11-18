import toast from "react-hot-toast";
import { Book } from "../../types/types";
import './EditBookForm.css'
import { Button } from "../Button/Button";

type EditBookFormProps = {
    selectedBook: Book;
    editBook: (newBook: Book, id: string) => Promise<void>
    closeModal: () => void;
}

export const EditBookForm: React.FC<EditBookFormProps> = ({ selectedBook, editBook, closeModal }) => {

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!selectedBook.id) return;

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const year = formData.get('year') as string

        if (title && author && year) {
            const newBook = { title, author, year: parseInt(year), created_at: selectedBook.created_at }
            toast('Saving your new details.');
            editBook(newBook, selectedBook.id)
        }
    }

    return (
        <div className="edit-book-form">
            <h2 className="edit-book-form-title">Edit Book</h2>
            <form onSubmit={handleEdit}>
                <label className="form-row">
                    <span>Book Title</span>
                    <input type='text' name='title' max={128} placeholder='Martin Eden' defaultValue={selectedBook.title} required />
                </label>
                <label className="form-row">
                    <span>Author</span>
                    <input type='text' name='author' max={128} placeholder='Jack London' defaultValue={selectedBook.author} required />
                </label>
                <div className="form-row edit-buttons">
                    <Button
                        type='submit'
                        text="Save"
                    />
                    <Button
                        type='button'
                        text="Cancel"
                        onClick={closeModal}
                    />
                </div>
            </form>
        </div>
    )
}