import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Product } from '../../../../interfaces/product';
import { useProductStore } from '../../../../stores/useProductStore';

import { EditProductDetails } from './EditProductDetails';

const mockSelectedProduct: Product = {
    id: '1',
    name: 'Laptop',
    number: '123',
    description: 'Super laptop',
    images: [
        { id: '1', url: 'link-to-laptop-image', name: 'Laptop image' },
        { id: '2', url: 'link-to-laptop-image2', name: 'Laptop image2' },
    ],
};
const mockUpdateProduct = vi.fn();
const onClose = vi.fn();

vi.mock('../../../../stores/useProductStore', () => ({
    useProductStore: vi.fn(() => ({
        selectedProduct: mockSelectedProduct,
        updateProduct: mockUpdateProduct,
    })),
}));

describe('EditProductDetails', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders form with initial product data', () => {
        render(<EditProductDetails onClose={onClose} />);

        expect(
            screen.getByRole('heading', { name: /edit product details/i }),
        ).toBeInTheDocument();
        expect(screen.getByTestId(/name-1/i)).toHaveValue('Laptop');
        expect(screen.getByLabelText(/number/i)).toHaveValue('123');
        expect(screen.getByLabelText(/description/i)).toHaveValue(
            'Super laptop',
        );
        expect(screen.getByText(/images:/i)).toBeInTheDocument();
        expect(screen.getAllByRole('img')).toHaveLength(2);
    });

    it('renders form without images when the product has no images', () => {
        const mockedProductWithEmptyImages = {
            ...mockSelectedProduct,
            images: [],
        };
        vi.mocked(useProductStore).mockReturnValue({
            selectedProduct: mockedProductWithEmptyImages,
            updateProduct: mockUpdateProduct,
        });

        render(<EditProductDetails onClose={onClose} />);

        expect(
            screen.getByRole('heading', { name: /edit product details/i }),
        ).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
            'Laptop',
        );
        expect(screen.getByLabelText(/name/i)).toHaveValue('Laptop');
        expect(screen.getByLabelText(/number/i)).toHaveValue('123');
        expect(screen.getByLabelText(/description/i)).toHaveValue(
            'Super laptop',
        );
        expect(screen.queryByLabelText(/images:/i)).not.toBeInTheDocument();
        expect(screen.queryAllByLabelText(/image/i)).toHaveLength(0);
    });

    it('disables Save button if any field is empty', () => {
        render(<EditProductDetails onClose={onClose} />);

        const nameInput = screen.getByTestId(/name-1/i);
        const saveButton = screen.getByRole('button', { name: /save/i });

        fireEvent.change(nameInput, { target: { value: '' } });
        expect(saveButton).toBeDisabled();

        fireEvent.change(nameInput, { target: { value: 'a' } });
        expect(saveButton).toBeEnabled();
    });

    it('calls updateProduct and onClose on submit', () => {
        render(<EditProductDetails onClose={onClose} />);

        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        waitFor(() => {
            expect(mockUpdateProduct).toHaveBeenCalledTimes(1);
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });

    it('renders "Product not found" information if no selected product not found', () => {
        vi.mocked(useProductStore).mockReturnValue({
            selectedProduct: null,
            updateProduct: mockUpdateProduct,
        });

        render(<EditProductDetails onClose={onClose} />);

        expect(
            screen.queryByRole('heading', { name: /edit product details/i }),
        ).not.toBeInTheDocument();
        expect(screen.getByText(/product not found/i)).toBeInTheDocument();
    });
});
