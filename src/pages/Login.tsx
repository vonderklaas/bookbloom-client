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
                    alert('invalid credentials')
                    return;
                }
                if (data.message === 'Logged in successfully') {
                    alert('Logged in successfully')
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
                        <span>Email</span>
                        <br />
                        <input type='email' name='email' placeholder='jacklondon@gmail.com' required />
                        <br />
                    </label>
                    <br />
                    <label>
                        <span>Password</span>
                        <br />
                        <input type='password' name='password' placeholder="******" required />
                        <br />
                    </label>
                    <br />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
