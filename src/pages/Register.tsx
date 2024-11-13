import toast from "react-hot-toast";
import { API_PATH } from "../constants/constants";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get('username') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (username && email && password) {
            registerUser(username, email, password)
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


    const registerUser = (username: string, email: string, password: string) => {
        fetch(`${API_PATH}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 'User already exists') {
                    toast.error('User already exists.')
                    return;
                }
                if (data.message === 'User registered successfully') {
                    toast.success('User registered successfully.')
                    toast('Let us authenticate you.')
                    loginUser(email, password);
                }
            })
            .catch((error) => {
                console.error("API Error:", error)
            });
    };

    return (
        <div className="register-wrapper">
            <div>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <label>
                        <p>Username</p>
                        <input type='text' name='username' placeholder='jack' required />
                    </label>
                    <br/>
                    <label>
                        <p>Email</p>
                        <input type='email' name='email' placeholder='jack@hotmail.com' required />
                    </label>
                    <br/>
                    <label>
                        <p>Password</p>
                        <input type='password' name='password' placeholder="********" required />
                    </label>
                    <br/>
                    <br/>
                    <button type='submit'>Register</button>
                    <br/>
                    <br/>
                </form>
            </div>
        </div>
    );
};