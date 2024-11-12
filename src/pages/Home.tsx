import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { API_PATH } from "../constants";

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
            console.error("Failed to fetch totals:", error);
        }
    };

    useEffect(() => {
        if (totalReaders === null || totalBooks === null) {
            fetchTotals();
        }
        const intervalId = setInterval(fetchTotals, 300000);

        return () => clearInterval(intervalId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="home">
            <h1>
                Welcome, <span style={{ color: "orangered" }}>{user?.id ? user?.username : 'wanderer'}</span>!
            </h1>
            <p>Manage your personal book collection and keep track of your favorite reads.</p>
            <br />
            <div className="stats">
                <h2>Currently tracking</h2>
                {totalReaders ? (
                    <h3><span style={{ color: "orangered" }}>{totalReaders ?? "..."} readers</span></h3>
                ) : <h3>...</h3>}
                {totalBooks ? (
                    <h3><span style={{ color: "orangered" }}>{totalBooks ?? "..."} books</span></h3>
                ) : <h3>...</h3>}
            </div>
        </div>
    );
};
