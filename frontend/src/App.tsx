import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductList } from './pages/ProductList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}