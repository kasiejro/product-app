import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Product } from '../interfaces/product';

import { initialProducts } from './utils/utils';

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    updateProduct: (updatedProduct: Product) => void;
    selectProduct: (product: Product) => void;
}

export const useProductStore = create<ProductState>()(
    persist(
        (set) => ({
            products: initialProducts,
            selectedProduct: null,

            updateProduct: (updatedProduct) =>
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === updatedProduct.id
                            ? updatedProduct
                            : product,
                    ),
                    selectedProduct:
                        state.selectedProduct?.id === updatedProduct.id
                            ? updatedProduct
                            : state.selectedProduct,
                })),

            selectProduct: (product) => {
                set({ selectedProduct: product });
            },
        }),
        {
            name: 'product-storage', // zapisuje dane do localStorage
        },
    ),
);
