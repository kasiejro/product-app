import { v4 as uuidv4 } from 'uuid';

import type { Product } from '../../interfaces/product';

import productsJson from './products.json';

export interface ProductImageDTO {
    url: string;
    name: string;
}

export interface ProductDTO {
    name: string;
    number: string;
    description: string;
    images: ProductImageDTO[];
}

const transformProductsImmutable = (apiProducts: ProductDTO[]): Product[] => {
    return apiProducts.map((product) => ({
        id: uuidv4(),
        name: product.name,
        number: product.number,
        description: product.description,
        images: product.images.map((image) => ({
            id: uuidv4(),
            url: image.url,
            name: image.name,
        })),
    }));
};

export const initialProducts: Product[] =
    transformProductsImmutable(productsJson);
