import { API_PATH } from "../constants/constants";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion } from "framer-motion"
import { useState } from "react";

export const Login = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

        fetch(`${API_PATH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    // Handle non-OK responses by throwing an error
                    return response.json().then((errorData) => {
                        throw new Error(errorData.error || 'Unknown error occurred');
                    });
                }
                return response.json(); // Parse JSON if response is OK
            })
            .then((data) => {
                if (data.message === 'Logged in successfully') {
                    toast.success('Logged in successfully.');
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("username", data.username);
                    setUser({ id: data.user_id, username: data.username });
                    navigate('/books');
                }
            })
            .catch((error) => {
                // Handle API error messages
                console.error("API Error:", error.message);
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false); // Stop loading indicator in all cases
            });
    };

    return (
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }}>
            <div className="login-wrapper">
                <h2 className="highlight highlight-pink">Login</h2>
                <form onSubmit={handleLogin}>
                    <label className="form-row">
                        <span>Email</span>
                        <input type='email' name='email' placeholder='hemingway@mail.com' required />
                    </label>
                    <label className="form-row">
                        <span>Password</span>
                        <input type='password' name='password' required />
                    </label>
                    <div className="login-button">
                        <button disabled={isLoading} type='submit'>{isLoading ? 'Loading...' : 'Submit'}</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};
