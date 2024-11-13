import { API_PATH } from "../constants/constants";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

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
                console.log(data)
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
        <div className="login-wrapper">
            <div>
                <h2>Login 🙋‍♂️</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        <p>Email</p>
                        <input type='email' name='email' placeholder='jack@hotmail.com' required />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type='password' name='password' placeholder="********" required />
                    </label>
                    <br />
                    <br/>
                    <button type='submit'>Login</button>
                    <br/>
                    <br/>
                </form>
            </div>
        </div>
    );
};
