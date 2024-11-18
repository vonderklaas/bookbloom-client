import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import './Header.css'

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
        toast('Logged out successfully.');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        setUser(null);
        navigate('/')
    }

    const isActive = (path: string) => location.pathname === `/${path}` || (path === '' && location.pathname === '/');

    return (
        <header className="header">
            <Link className="header-mobile-wrapper" to={`/`}>
                <h3 className="header-title">bookbloom</h3>
                <span className="mobile-logout" onClick={logout}>Log out</span>
            </Link>
            <>
                {!user ? (
                    <nav style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link to={`register`} className={isActive('register') ? 'highlight highlight-blue' : ''}>Register</Link>
                        <Link to={`login`} className={isActive('login') ? 'highlight highlight-blue' : ''}>Login</Link>
                    </nav>
                ) : (
                    <nav style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link to={`collection`} className={isActive('collection') ? 'highlight highlight-green' : ''}>Collection</Link>
                        <Link to={`wishlist`} className={isActive('wishlist') ? 'highlight highlight-yellow' : ''}>Wishlist</Link>
                        <Link to={`recommendations`} className={isActive('recommendations') ? 'highlight highlight-pink' : ''}>Recommendations</Link>
                        <span className="logout" onClick={logout}>Log out</span>
                    </nav>
                )}
            </>
        </header>
    )
}