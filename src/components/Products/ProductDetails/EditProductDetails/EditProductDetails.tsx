import { useState, type ChangeEvent } from 'react';

import { useProductStore } from '../../../../stores/useProductStore';
import { MediaItem } from '../../../MediaItem/MediaItem';
import './EditProductDetails.css';

export const EditProductDetails = ({ onClose }: { onClose: () => void }) => {
    const { selectedProduct, updateProduct } = useProductStore();
    const [formData, setFormData] = useState({
        name: selectedProduct?.name || '',
        number: selectedProduct?.number || '',
        description: selectedProduct?.description || '',
        images: selectedProduct?.images || [],
    });
    const [isDisabled, setIsDisabled] = useState(false);

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => {
            const { name, value } = e.target;
            const newFormData = { ...prev, [name]: value };

            // validation ensuring no empty fields
            const hasEmpty = Object.values(newFormData).some(
                (formValue) => !Array.isArray(formValue) && !formValue.trim(),
            );

            setIsDisabled(hasEmpty);

            return newFormData;
        });
    };

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>,
        imageId: string,
    ) => {
        e.preventDefault();
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedImages = prev.images.map((img) =>
                img.id === imageId ? { ...img, [name]: value } : img,
            );
            return { ...prev, images: updatedImages };
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateProduct({ ...selectedProduct, ...formData });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className='editProductDetailsForm'>
            <h2>Edit Product Details</h2>
            <div className='productDetails'>
                <div className='formField'>
                    <label htmlFor={`name-${selectedProduct.id}`}>Name:</label>
                    <input
                        data-testid={`name-${selectedProduct.id}`}
                        id={`name-${selectedProduct.id}`}
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className='formField'>
                    <label htmlFor={`number-${selectedProduct.id}`}>
                        Number:
                    </label>
                    <input
                        id={`number-${selectedProduct.id}`}
                        name='number'
                        value={formData.number}
                        onChange={handleChange}
                    />
                </div>

                <div className='formField'>
                    <label htmlFor={`description-${selectedProduct.id}`}>
                        Description:
                    </label>
                    <textarea
                        id={`description-${selectedProduct.id}`}
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {selectedProduct.images.length > 0 ? (
                <>
                    <label>Images:</label>

                    {formData.images.map((image) => (
                        <div key={image.id} className='imagesFormField'>
                            <MediaItem image={image} size={100} />

                            <div className='imageData'>
                                <div className='formField'>
                                    <label
                                        key={image.name}
                                        htmlFor={`image-name-${image.id}`}
                                    >
                                        Name:
                                    </label>
                                    <input
                                        id={`image-name-${image.id}`}
                                        type='text'
                                        name='name'
                                        value={image.name}
                                        onChange={(e) =>
                                            handleImageChange(e, image.id)
                                        }
                                    />
                                </div>

                                <div className='formField'>
                                    <label
                                        key={image.url}
                                        htmlFor={`image-url-${image.id}`}
                                    >
                                        URL:
                                    </label>
                                    <input
                                        id={`image-url-${image.id}`}
                                        type='url'
                                        name='url'
                                        value={image.url}
                                        onChange={(e) =>
                                            handleImageChange(e, image.id)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <></>
            )}

            <div className='buttonGroup'>
                <button type='submit' disabled={isDisabled}>
                    Save
                </button>
                <button type='button' onClick={onClose}>
                    Close
                </button>
            </div>
        </form>
    );
};
