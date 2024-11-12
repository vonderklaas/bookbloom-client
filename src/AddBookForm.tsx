import { Book } from "./types";

type AddBookFormProps = {
    addBook: (book: Book) => void;
    closeModal: () => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddBookForm: React.FC<AddBookFormProps> = ({ addBook, closeModal, setIsAddMode }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const year = formData.get('year') as string

        if (title && author && year) {
            const newBook = { title, author, year }
            addBook(newBook)
            closeModal()
            setIsAddMode(false);
        }
    }

    return (
        <>
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title</span>
                    <input type='text' name='title' placeholder='Martin Eden' required />
                    <br />
                </label>
                <label>
                    <span>Author</span>
                    <input type='text' name='author' placeholder='Jack London' required />
                    <br />
                </label>
                <label>
                    <span>Year</span>
                    <input type='number' name='year' placeholder='1909' required />
                    <br />
                </label>
                <button type='submit'>On shelf</button>
            </form>
        </>
    )
}