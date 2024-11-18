import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
    const location = useLocation();

    const isFooterShown = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register'

    return (
        <div className='layout'>
            <Header />
            <div className='container'>
                <Outlet />
            </div>
            {isFooterShown && <Footer />}
        </div>
    );
}

export default App;
