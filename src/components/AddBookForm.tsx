import { useState } from "react";
import { Book } from "../types/types";
import { API_PATH } from "../constants/constants";
import toast from "react-hot-toast";

type AddBookFormProps = {
    addBook: (book: Book) => void;
    closeModal: () => void;
    setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddBookForm: React.FC<AddBookFormProps> = ({ addBook, closeModal, setIsAddMode }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
    const [isGeneratingYear, setIsGeneratingYear] = useState(false);
  
    const currentYear = new Date().getFullYear();
    const minimumCharactersForInputs = 3;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title && author && year) {
            const newBook = { title, author, year: parseInt(year), description, createdAt: new Date() };
            addBook(newBook);
            closeModal();
            setIsAddMode(false);
        }
    };

    const generateDescription = () => {
        setIsGeneratingDescription(true);
        setDescription('');
        const url = `${API_PATH}/generate-ai-description?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;

        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            const data = event.data;

            if (data === "[DONE]") {
                eventSource.close();
                setIsGeneratingDescription(false);
            } else if (data && !data.includes("{}")) {
                setDescription((prev) => prev + data);
            }
        };

        eventSource.onerror = (err) => {
            toast.error(`eventSource failed: ${err}`);
            eventSource.close();
            setIsGeneratingDescription(false);
        };
    };

    const generateYear = async () => {
        setIsGeneratingYear(true);
        setYear('');
        try {
            const response = await fetch(
                `${API_PATH}/generate-ai-year?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&description=${encodeURIComponent(description)}`
            );
            const data = await response.json();
            if (data.year && !data.year.trim().includes("not found")) {
                setYear(data.year.trim());
            } else {
                toast.error("Year generation failed. Please try again or enter manually.");
            }
        } catch (error) {
            toast.error(`An error occurred while fetching the year. ${error}`);
        } finally {
            setIsGeneratingYear(false);
        }
    };

    return (
        <form className="add-book-form" onSubmit={handleSubmit}>
            <label>
                <p>Title</p>
                <input
                    type="text"
                    name="title"
                    minLength={4}
                    maxLength={128}
                    placeholder="Martin Eden"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                <p>Author</p>
                <input
                    type="text"
                    name="author"
                    minLength={4}
                    maxLength={128}
                    placeholder="Jack London"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </label>
            <div>
                <div className="flex-on-fields">
                    <p>Description</p>
                    <button
                        type="button"
                        className="ai-button"
                        onClick={generateDescription}
                        disabled={isGeneratingDescription || description.length >= 1 || !title || title.length <= minimumCharactersForInputs || !author || author.length <= minimumCharactersForInputs}
                    >
                        {isGeneratingDescription ? "Generating..." : "Use AI"}
                    </button>
                </div>
                <textarea
                    name="description"
                    maxLength={256}
                    placeholder="This is a story about..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    cols={36}
                    rows={5}
                ></textarea>
            </div>
            <div>
                <div className="flex-on-fields">
                    <p>Publication Year</p>
                    <button
                        className="ai-button"
                        type="button"
                        onClick={generateYear}
                        disabled={isGeneratingYear || year.length >= 1 || !title || title.length <= minimumCharactersForInputs || !author || author.length <= minimumCharactersForInputs || !description || description.length <= minimumCharactersForInputs}
                    >
                        {isGeneratingYear ? "Generating..." : "Use AI"}
                    </button>
                </div>
                <input
                    type="number"
                    name="year"
                    max={currentYear}
                    placeholder="1909"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
            </div>
            <br />
            <button type="submit" disabled={isGeneratingYear || isGeneratingDescription || !title || !author || !description || !year}>Add</button>
        </form>
    );
};

// AI Cases - suggest (wishlist) books based on your collection