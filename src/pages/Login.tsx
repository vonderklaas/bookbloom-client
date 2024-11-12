import { API_PATH } from "../constants";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const { setUser } = useUser();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (email && password) {
            loginUser(email, password)
            navigate('/')
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
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("username", data.username);
                    setUser({ id: data.user_id, username: data.username });
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;
