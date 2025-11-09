export interface ProductImage {
    url: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    number: string;
    description: string;
    images: ProductImage[];
}
