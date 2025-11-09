import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Product } from '../../../../interfaces/product';
import { useProductStore } from '../../../../stores/useProductStore';

import ViewProductDetails from './ViewProductDetails';

const mockUpdateClick = vi.fn();
const mockSelectedProduct: Product = {
    id: '1',
    name: 'Laptop',
    number: '123',
    description: 'Super laptop',
    images: [
        { url: 'link-to-laptop-image', name: 'Laptop image' },
        { url: 'link-to-laptop-image2', name: 'Laptop image2' },
    ],
};

vi.mock('../../../../stores/useProductStore', () => ({
    useProductStore: vi.fn(() => ({
        selectedProduct: mockSelectedProduct,
    })),
}));

describe('ViewProductDetails', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders "Product not found" information if no selected product not found', () => {
        vi.mocked(useProductStore).mockReturnValue({
            selectedProduct: null,
        });

        render(<ViewProductDetails onUpdateClick={mockUpdateClick} />);

        expect(
            screen.queryByRole('heading', { name: /edit product details/i }),
        ).not.toBeInTheDocument();
        expect(screen.getByText(/product not found/i)).toBeInTheDocument();
    });

    it('renders product details correctly', () => {
        render(<ViewProductDetails onUpdateClick={mockUpdateClick} />);

        expect(
            screen.getByRole('heading', { name: /product details/i }),
        ).toBeInTheDocument();
        expect(screen.getByLabelText('product name')).toHaveTextContent(
            `Name: ${mockSelectedProduct.name}`,
        );
        expect(screen.getByLabelText('product number')).toHaveTextContent(
            `Number: ${mockSelectedProduct.number}`,
        );
        expect(screen.getByLabelText('product description')).toHaveTextContent(
            `Description: ${mockSelectedProduct.description}`,
        );
        expect(screen.getByText(/images:/i)).toBeInTheDocument();
        expect(screen.getAllByRole('img')).toHaveLength(2);
    });

    it('calls onUpdateClick when Update button is clicked', () => {
        render(<ViewProductDetails onUpdateClick={mockUpdateClick} />);

        const button = screen.getByRole('button', { name: /update/i });
        fireEvent.click(button);

        expect(mockUpdateClick).toHaveBeenCalledTimes(1);
    });

    it('renders "No image available" if product has no images', () => {
        vi.mocked(useProductStore).mockReturnValue({
            selectedProduct: { ...mockSelectedProduct, images: [] },
        });

        render(<ViewProductDetails onUpdateClick={mockUpdateClick} />);

        expect(screen.getByText(/no image available/i)).toBeInTheDocument();
        expect(screen.queryAllByRole('img')).toHaveLength(0);
    });
});
