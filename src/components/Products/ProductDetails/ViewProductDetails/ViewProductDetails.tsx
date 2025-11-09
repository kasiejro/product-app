import './ViewProductDetails.css';
import { MediaItem } from '../../../MediaItem/MediaItem';
import { useProductStore } from '../../../../stores/useProductStore';

interface ViewProductDetailsProps {
    onUpdateClick: () => void;
}

const ViewProductDetails = ({ onUpdateClick }: ViewProductDetailsProps) => {
    const { selectedProduct } = useProductStore();

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

    const { name, number, description, images } = selectedProduct;

    return (
        <div className='viewProductDetails'>
            <header className='viewProductDetailsHeader'>
                <h2>Product Details</h2>
                <button onClick={onUpdateClick}>Update</button>
            </header>

            <div className='content'>
                <div className='mainInfo'>
                    <p aria-label='product name'>
                        Name: <span>{name}</span>
                    </p>
                    <p aria-label='product number'>
                        Number: <span>{number}</span>
                    </p>
                </div>

                <div aria-label='product description' className='description'>
                    <p>Description: </p>
                    <span>{description}</span>
                </div>

                <p>Images:</p>

                {images.length > 0 && (
                    <div className='media'>
                        {images.map((image) => (
                            <MediaItem key={image.url} image={image} />
                        ))}
                    </div>
                )}

                {images.length === 0 && <p>No image available</p>}
            </div>
        </div>
    );
};

export default ViewProductDetails;
