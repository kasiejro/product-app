import { useProductStore } from '../../../stores/useProductStore.ts';

import ProductListItem from './ProductListIteam/ProductListItem.tsx';

import './ProductList.css';

export default function ProductList() {
    const { products } = useProductStore();

    return (
        <>
            <h1>Product List</h1>
            <div className='productList'>
                {products.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}
