import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

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
        toast('User logged out.');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        setUser(null);
        navigate('/')
    }

    const isActive = (path: string) => location.pathname.includes(path);

    return (
        <header className="header">
            <Link to={`/`}>
                <p>bookbloom</p>
            </Link>
            <>
                {!user ? (
                    <nav style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link to={`login`} className={isActive('login') ? 'active' : ''}>Login</Link>
                        <Link to={`register`} className={isActive('register') ? 'active' : ''}>Register</Link>
                    </nav>
                ) : (
                    <nav style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link to={`collection`} className={isActive('collection') ? 'active' : ''}>Collection</Link>
                        <Link to={`wishlist`} className={isActive('wishlist') ? 'active' : ''}>Wishlist</Link>
                        <span className="link" onClick={logout}>Logout</span>
                    </nav>
                )}
            </>
        </header>
    )
}