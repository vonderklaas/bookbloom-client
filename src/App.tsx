import { Header } from './components/Header';
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <div className='container'>
            <Header />
            <Outlet />
        </div>
    );
}

export default App;
