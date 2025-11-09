import { useNavigate } from 'react-router-dom';

import { useProductStore } from '../../../../stores/useProductStore';
import type { Product } from '../../../../interfaces/product';
import '../ProductList.css';

interface ProductListItemProps {
    product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
    const navigate = useNavigate();
    const { selectProduct } = useProductStore();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
        selectProduct(product);
    };

    return (
        <div onClick={handleClick} className='productListItem'>
            <h3>{product.name}</h3>
            <h6>{product.number}</h6>
        </div>
    );
}
