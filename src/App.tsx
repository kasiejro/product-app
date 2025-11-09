import { Route, Routes } from 'react-router-dom';

import Products from './components/Products/ProductList/ProductList';
import { Header } from './components/Header/Header';
import ProductDetails from './components/Products/ProductDetails/ProductDetails';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='' element={<Products />}></Route>
                <Route path='/product/:id' element={<ProductDetails />}></Route>
            </Routes>
        </>
    );
}

export default App;
