import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export const Author = () => {
    return (
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }}>
            <div className="author-wrapper">
                <h2 className="highlight highlight-gray">Author</h2>
                <br />
                <p>Follow me on X — <Link className="fake-link" to='https://x.com/vonderklaas'>@vonderklaas</Link></p>
                <p>Follow me on GitHub — <Link className="fake-link" to='https://github.com/vonderklaas'>@vonderklaas</Link></p>
                <br/>
                <div>
                    <p>
                        It is easier than ever to find new books online, but organizing your collection,
                        keeping track of your favorites, and finding your next great read still take up a lot
                        of time and effort.
                    </p>
                    <p>
                        You have to manually catalog books, sort through countless lists,
                        remember what you have read, decide what to read next, and keep track of
                        wishlists — it all adds up.
                    </p>
                    <p>So, welcome to bookbloom!</p>
                </div>
                <br />
            </div>
        </motion.div>
    )
}
