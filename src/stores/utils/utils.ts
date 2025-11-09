import { v4 as uuidv4 } from 'uuid';

import type { Product } from '../../interfaces/product';

import productsJson from './products.json';

export const initialProducts: Product[] = productsJson.map(
    (product: Omit<Product, 'id'>) => ({
        ...product,
        id: uuidv4(),
    }),
);
