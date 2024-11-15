import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { API_PATH } from '../../constants/constants';
import './Stats.css'

const Stats = () => {
    const [totalReaders, setTotalReaders] = useState<number | null>(null);
    const [totalBooks, setTotalBooks] = useState<number | null>(null);

    const fetchTotals = async () => {
        try {
            const usersResponse = await fetch(`${API_PATH}/total-users`);
            const usersData = await usersResponse.json();

            const booksResponse = await fetch(`${API_PATH}/total-books`);
            const booksData = await booksResponse.json();

            setTotalReaders(usersData.total_users);
            setTotalBooks(booksData.total_books);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch community highlights');
        }
    };

    useEffect(() => {
        if (totalReaders === null || totalBooks === null) {
            fetchTotals();
        }
    }, [totalBooks, totalReaders]);

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
            <div className="stats">
                <h2>Community Highlights</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-icon">📖</span>
                        <span className="stat-text">Books</span>
                        <span className="stat-number">{totalBooks ?? "..."}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">🤸‍♂️</span>
                        <span className="stat-text">Users</span>
                        <span className="stat-number">{totalReaders ?? "..."}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Stats