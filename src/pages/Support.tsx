import { motion } from "framer-motion"
import { Link } from "react-router-dom"


export const Support = () => {
    return (
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }}>
            <div className="support-wrapper">
                <h2 className="highlight highlight-gray">Support</h2>
                <br />
                <p>
                    <span>This is our </span>
                    <Link className="fake-link" to={'/terms-and-conditions'}>Terms and Conditions</Link>
                </p>
                <br />
                <p>Have questions?</p>
                <p>Please email at <a href='mailto:vonderklaas@proton.me'><b>vonderklaas@proton.me</b></a></p>
            </div>
        </motion.div>
    )
}
