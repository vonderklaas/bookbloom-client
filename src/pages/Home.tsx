import { useUser } from "../context/UserContext";
import { motion } from "framer-motion"
import Stats from "../components/Stats/Stats";
import { Link } from "react-router-dom";

export const Home = () => {
    const { user } = useUser();

    return (
        <div className="home">
            {!user?.id && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6, duration: 0.5 }}>
                    <img className="greetings-arrow" src='/public/arrow.png' alt='' />
                </motion.div>
            )}
            <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="greetings">
                    <>
                        {!user?.id ? (
                            <h1>
                                Your first <span className="highlight highlight-pink">AI-enhanced</span> digital library
                            </h1>

                        ) : (
                            <h1>
                                Welcome, <span className="highlight highlight-pink">{user?.username}</span>!
                            </h1>
                        )}
                    </>
                    <p>Organize your <span className="highlight highlight-green">collection</span> and track favorite reads.</p>
                    <p>Add titles to your <span className="highlight highlight-yellow">wishlist</span> to save them for later.</p>
                    {!user?.id && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 0.5 }}>
                            <p>So? <span className="highlight highlight-blue"><Link to='/register'>Create an account</Link></span>!</p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
            <Stats />
        </div>
    );
};
