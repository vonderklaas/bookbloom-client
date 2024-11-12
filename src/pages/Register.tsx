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
                if (data.error === 'User already exists') {
                    alert('User already exists')
                    return;
                }
                if (data.message === 'User registered successfully') {
                    alert('User registered successfully')
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
                <h2>Register ✍️</h2>
                <form onSubmit={handleRegister}>
                    <label>
                        <span>Username</span>
                        <br/>
                        <input type='text' name='username' placeholder='jacklondon' required />
                        <br />
                    </label>
                    <br/>
                    <label>
                        <span>Email</span>
                        <br/>
                        <input type='email' name='email' placeholder='jacklondon@gmail.com' required />
                        <br />
                    </label>
                    <br/>
                    <label>
                        <span>Password</span>
                        <br/>
                        <input type='password' name='password' placeholder="******" required />
                        <br />
                    </label>
                    <br/>
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
