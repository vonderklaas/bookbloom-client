import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { API_PATH } from "../constants/constants";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

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
            <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>

                <div className="greetings">
                    <h1>
                        Greetings, <span style={{ color: "orange" }}>{user?.id ? user?.username : 'stranger'}</span>!
                    </h1>
                    <p>At <Link to='/'>bookbloom</Link>, you can manage your book <Link to='/collection'>collection</Link> and keep track of your favorite reads.</p>
                    <p>You can also add books to your <Link to='/'>wishlist</Link>, so you never forget that exciting title you're eager to read.</p>
                    <p>And if you struggle with writing book descriptions or publication years, don't forget to use our <span className="pink">AI assistant</span>.</p>
                </div>
            </motion.div>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
                <div className="stats">
                    <h2>Worldwide Statistics</h2>
                    {totalReaders ? (
                        <p>📖 Readers — <span style={{ color: "orange" }}>{totalReaders ?? "..."}</span></p>
                    ) : <p>...</p>}
                    {totalBooks ? (
                        <p>📚 Books Mentioned — <span style={{ color: "orange" }}>{totalBooks ?? "..."}</span></p>
                    ) : <p>...</p>}
                </div>
            </motion.div>
        </div>
    );
};
