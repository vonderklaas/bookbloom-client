import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_PATH } from "../constants/constants";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { Button } from "../components/Button/Button";
import { Tip } from "../components/Tip";

export const Recommendations: React.FC = () => {
    const [books, setBooks] = useState<{ title: string; author: string }[]>([]);
    const [recommendations, setRecommendations] = useState<{ title: string; author: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const userId = user?.id;

    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const [allBooksResponse, wishlistBooksResponse] = await Promise.all([
                fetch(`${API_PATH}/books?user_id=${userId}&wishlist=false`),
                fetch(`${API_PATH}/books?user_id=${userId}&wishlist=true`)
            ]);

            if (!allBooksResponse.ok || !wishlistBooksResponse.ok) {
                throw new Error("Failed to fetch books or wishlist books.");
            }

            const allBooks = await allBooksResponse.json();
            const wishlistBooks = await wishlistBooksResponse.json();
            const combinedBooks = [...allBooks, ...wishlistBooks];
            const uniqueBooks = Array.from(
                new Map(combinedBooks.map((book) => [book.title + book.author, book])).values()
            );

            setBooks(uniqueBooks.map(({ title, author }) => ({ title, author })));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching books:", error);
            toast.error("Failed to fetch books. Please try again.");
            setIsLoading(false);
        }
    };

    // Function to fetch AI suggestions
    const fetchRecommendations = async () => {
        if (books.length === 0) {
            toast.error("No books found. Please add some books first!");
            return;
        }

        setIsLoading(true);
        setRecommendations([]);
        toast(`Fetching recommendations for ${books.length} books.`);
        try {
            const response = await fetch(`${API_PATH}/generate-ai-titles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ books }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch book suggestions.");
            }

            const data = await response.json();

            if (data.titles) {
                const parsedSuggestions = data.titles.split(",").map((item: string) => {
                    const [title, author] = item.split(" by ").map((part) => part.trim());
                    return { title, author };
                });
                setRecommendations(parsedSuggestions);
            } else {
                toast.error("No suggestions available.");
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            toast.error("Error fetching suggestions. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch books and wishlist books on component mount
    useEffect(() => {
        if (user?.id) {
            fetchBooks();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div>
            <div className="book-list-title-wrapper">
                <h2 className="highlight highlight-pink">
                    Recommendations
                </h2>
            </div>
            <br />
            {user?.id && (
                <>
                    <Button
                        isDisabled={isLoading || books.length < 3}
                        className="button-ai-recommendations"
                        text={recommendations.length > 0 ? 'More recommendations' : 'Get recommendations'}
                        onClick={fetchRecommendations}
                    />
                </>
            )}

            {recommendations.length === 0 && (
                <>
                    <br />
                    <br />
                    <Tip marginLeft text="Our AI model analyzes your collection and wishlist to recommend books you'll enjoy." />
                    {books.length < 3 && (
                        <Tip marginLeft text='Please add at least 3 books to get personalized suggestions.' />
                    )}
                </>
            )}

            <div className="books">
                {recommendations.length > 0 && (
                    recommendations.map((recommendation, index) => (
                        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="book-card book-suggested" onClick={() => { }}>
                                <div className='book-card-wrapper'>
                                    <div>
                                        <span className='book-card-title'>{recommendation.title}</span>
                                        <p className='book-card-author'>{recommendation.author}</p>
                                    </div>
                                    <div className='book-card-footer-wrapper'>
                                        <Button
                                            className="button-add-wish"
                                            text='To wishlist ✨'
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
