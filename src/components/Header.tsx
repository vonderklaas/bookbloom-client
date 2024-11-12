import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const Header = () => {

    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const checkIfUserIsLoggedIn = () => {
        const user_id = localStorage.getItem('user_id');
        const username = localStorage.getItem('username');

        if (user_id && username) {
            setUser({ id: user_id, username: username });
        }

        // On app load, check if user info exists
        // const userId = localStorage.getItem('user_id');
        // if (userId) {
        //     const username = localStorage.getItem('username');
        //     setUser({ id: userId, username });
        //     console.log(`Welcome back, ${username}`);
        // } else {
        //     console.log("User is not logged in.");
        // }
    }

    useEffect(() => {
        checkIfUserIsLoggedIn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        setUser(null);
        console.log("User logged out.");
        navigate('/')
    }

    return (
        <header className="header">
            <Link to={`/`}>
                <h2>bookbloom</h2>
            </Link>
            <nav>
                {!user && (
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to={`login`}>Login</Link>
                        <Link to={`register`}>Register</Link>
                    </div>)}
                {user ? (
                    <>
                        <Link to={`books`}>My books</Link>
                        <div>
                            Username: {user.username}
                        </div>
                        <div onClick={logout}>
                            Logout
                        </div>
                    </>
                ) : <div>No User</div>}
            </nav>
        </header>
    )
}