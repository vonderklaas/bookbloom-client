import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const checkIfUserIsLoggedIn = () => {
        const user_id = localStorage.getItem('user_id');
        const username = localStorage.getItem('username');

        if (user_id && username) {
            setUser({ id: user_id, username: username });
        }
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

    const isActive = (path: string) => location.pathname.includes(path);

    return (
        <header className="header">
            <Link to={`/`}>
                <h2>bookbloom</h2>
            </Link>
            <>
                {!user ? (
                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        <Link to={`login`} className={isActive('login') ? 'active' : ''}>Login</Link>
                        <Link to={`register`} className={isActive('register') ? 'active' : ''}>Register</Link>
                    </nav>
                ) : (
                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        <Link to={`wishlist`} className={isActive('wishlist') ? 'active' : ''}>Wishlist</Link>
                        <Link to={`books`} className={isActive('books') ? 'active' : ''}>My books</Link>
                        <a href='' onClick={logout}>
                            Logout
                        </a>
                    </nav>
                )}
            </>
        </header>
    )
}