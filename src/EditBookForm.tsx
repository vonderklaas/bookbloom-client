import { Book } from "./types";

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
            const newBook = { title, author, year }
            editBook(newBook, selectedBook.id)
        }
    }

    return (
        <div>
            <h2>Edit Book</h2>
            <form onSubmit={handleEdit}>
                <label>
                    <span>Title</span>
                    <input type='text' name='title' placeholder='Martin Eden' defaultValue={selectedBook.title} required />
                    <br />
                </label>
                <label>
                    <span>Author</span>
                    <input type='text' name='author' placeholder='Jack London' defaultValue={selectedBook.author} required/>
                    <br />
                </label>
                <label>
                    <span>Year</span>
                    <input type='number' name='year' placeholder='1909' defaultValue={selectedBook.year} required/>
                    <br />
                </label>
                <button type='submit'>Save</button>
                <button type='button' onClick={closeModal}>Discard</button>
            </form>
        </div>
    )
}