import { API_PATH } from "../constants/constants";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion } from "framer-motion"

export const Login = () => {
    const navigate = useNavigate();

    const { setUser } = useUser();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (email && password) {
            loginUser(email, password)
        }
    }

    const loginUser = async (email: string, password: string) => {
        fetch(`${API_PATH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 'Invalid credentials') {
                    toast.error('Invalid credentials, try again.')
                    return;
                }
                if (data.message === 'Logged in successfully') {
                    toast.success('Logged in successfully.')
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("username", data.username);
                    setUser({ id: data.user_id, username: data.username });
                    navigate('/books')
                }
            })
            .catch((error) => {
                console.error("API Error:", error)
            });
    };

    return (
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }}>
            <div className="login-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label className="form-row">
                        <span>Email</span>
                        <input type='email' name='email' placeholder='jack@hotmail.com' required />
                    </label>
                    <label className="form-row">
                        <span>Password</span>
                        <input type='password' name='password' placeholder="********" required />
                    </label>
                    <div className="login-button">
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};
