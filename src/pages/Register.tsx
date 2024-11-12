import { API_PATH } from "../constants";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
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

    const loginUser = (email: string, password: string) => {
        fetch(`${API_PATH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user_id) {
                    setUser({ id: data.user_id, username: data.username });
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("username", data.username);
                    navigate('/books')
                }
            })
            .catch((error) => console.error("Error:", error));
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
                console.log(data)
                if (data.message === 'User registered successfully') {
                    loginUser(email, password);
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>
                    <span>Username</span>
                    <input type='text' name='username' placeholder='luckyjocker' required />
                    <br />
                </label>
                <label>
                    <span>Email</span>
                    <input type='email' name='email' placeholder='jacklondon@gmail.com' required />
                    <br />
                </label>
                <label>
                    <span>Password</span>
                    <input type='password' name='password' required />
                    <br />
                </label>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default Register;
