import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { API_PATH } from "../constants/constants";
import toast from "react-hot-toast";

export const Home = () => {
    const { user } = useUser();
    const [totalReaders, setTotalReaders] = useState<number | null>(null);
    const [totalBooks, setTotalBooks] = useState<number | null>(null);

    const fetchTotals = async () => {
        try {
            const usersResponse = await fetch(`${API_PATH}/total-users`);
            const usersData = await usersResponse.json();
            setTotalReaders(usersData.total_users);

            const booksResponse = await fetch(`${API_PATH}/total-books`);
            const booksData = await booksResponse.json();
            setTotalBooks(booksData.total_books);
        } catch (error) {
            toast.error(`Failed to fetch totals: ${error}`);
        }
    };

    useEffect(() => {
        if (totalReaders === null || totalBooks === null) {
            fetchTotals();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="home">
            <h1>
                Welcome, <span style={{ color: "orange" }}>{user?.id ? user?.username : 'wanderer'}</span>!
            </h1>
            <p>Manage your book <b>collection</b> and keep track of your favorite reads.</p>
            <p>Add books to your <b>wishlist</b> so you never forget that exciting title you are dying to read.</p>
            <div className="stats">
                <h2>Currently Tracking</h2>
                {totalReaders ? (
                    <h3>📖 Readers — <span style={{ color: "orange" }}>{totalReaders ?? "..."}</span></h3>
                ) : <h3>...</h3>}
                {totalBooks ? (
                    <h3>📚 Books — <span style={{ color: "orange" }}>{totalBooks ?? "..."}</span></h3>
                ) : <h3>...</h3>}
            </div>
        </div>
    );
};
