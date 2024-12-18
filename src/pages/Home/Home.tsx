import { useUser } from "../../context/UserContext";
import { motion } from "framer-motion"
import Stats from "../../components/Stats/Stats";
import { Link } from "react-router-dom";
import './Home.css'

export const Home = () => {
    const { user } = useUser();

    return (
        <div className="home">
            {!user?.id && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6, duration: 0.5 }}>
                    <img className="greetings-arrow" src='/arrow.png' alt='Arrow' />
                </motion.div>
            )}
            <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="greetings">
                    <>
                        {!user?.id ? (
                            <h1>
                                Your first <span className="highlight highlight-gray">AI-enhanced</span> digital library
                            </h1>

                        ) : (
                            <h1>
                                Welcome, <span className="highlight highlight-blue">{user?.username}</span>!
                            </h1>
                        )}
                    </>
                    <p>Organize your <span className="highlight highlight-green">collection</span> and keep track of your favorite reads.</p>
                    <p>Add titles to your <span className="highlight highlight-yellow">wishlist</span> and save them for later.</p>
                    <p>Unlock smart <span className="highlight highlight-pink">AI recommendations</span> based on your reading habits.</p>
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
