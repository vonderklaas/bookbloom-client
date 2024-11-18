import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Outlet, useLocation } from "react-router-dom"; 

const App = () => {
    const location = useLocation();

    const isFooterShown =
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/author' ||
        location.pathname === '/support'

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
