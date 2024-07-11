import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MainPage from './pages/MainPage';

import './styles/index.scss';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
