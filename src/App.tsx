// import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <div className='layout'>
            <Header />
            <div className='container'>
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
