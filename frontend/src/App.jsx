import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
