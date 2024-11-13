import { Book } from "../types/types";

type EditBookFormProps = {
    selectedBook: Book;
    editBook: (newBook: Book, id: string) => Promise<void>
    closeModal: () => void;
}

export const EditBookForm: React.FC<EditBookFormProps> = ({ selectedBook, editBook, closeModal }) => {

    const currentYear = new Date().getFullYear();

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!selectedBook.id) return;

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const description = formData.get('description') as string
        const year = formData.get('year') as string

        if (title && author && year && description) {
            const newBook = { title, author, description, year: parseInt(year), createdAt: selectedBook.createdAt }
            editBook(newBook, selectedBook.id)
        }
    }

    return (
        <div className="edit-book-form">
            {/* <h2>Edit Book</h2> */}
            <form onSubmit={handleEdit}>
                <label>
                    <span>Title</span>
                    <input type='text' name='title' max={128} placeholder='Martin Eden' defaultValue={selectedBook.title} required />
                    <br />
                </label>
                <br />
                <label>
                    <span>Author</span>
                    <input type='text' name='author' max={128} placeholder='Jack London' defaultValue={selectedBook.author} required />
                    <br />
                </label>
                <br />
                <label>
                    <span>Description</span>
                    <br />
                    <textarea
                        name='description'
                        maxLength={256}
                        placeholder='A story about...'
                        defaultValue={selectedBook.description}
                        cols={42}
                        rows={5}
                        required></textarea>
                    <br />
                </label>
                <br />
                <label>
                    <span>Year</span>
                    <input type='number' name='year' max={currentYear} placeholder='1909' defaultValue={selectedBook.year} required />
                    <br />
                </label>
                <br />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type='submit'>Save 📌</button>
                    <button type='button' onClick={closeModal}>Discard 🗃️</button>
                </div>
            </form>
        </div>
    )
}