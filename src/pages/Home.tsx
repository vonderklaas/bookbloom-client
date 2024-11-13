import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { API_PATH } from "../constants/constants";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
            <div className="greetings">
                <h1>
                    Greetings, <span style={{ color: "orange" }}>{user?.id ? user?.username : 'stranger'}</span>!
                </h1>
                <p>At <b>bookbloom</b> you can manage your book <Link to='collection'>collection</Link> and keep track of your favorite reads.</p>
                <p>Also, you can add books to your <Link to='collection'>wishlist</Link> so you never forget that exciting title you are dying to read.</p>
                <p>Good luck!</p>
            </div>
            <br/>
            <div className="stats">
                <h2>Worldwide Statistics</h2>
                {totalReaders ? (
                    <p>📖 Readers — <span style={{ color: "orange" }}>{totalReaders ?? "..."}</span></p>
                ) : <p>...</p>}
                {totalBooks ? (
                    <p>📚 Books Mentioned — <span style={{ color: "orange" }}>{totalBooks ?? "..."}</span></p>
                ) : <p>...</p>}
            </div>
            <br />
        </div>
    );
};
