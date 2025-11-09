import { useState } from 'react';

import ViewProductDetails from './ViewProductDetails/ViewProductDetails';
import { EditProductDetails } from './EditProductDetails/EditProductDetails';

const ProductDetails = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div style={{ width: '50vw' }}>
            {!isEditing ? (
                <ViewProductDetails onUpdateClick={() => setIsEditing(true)} />
            ) : (
                <EditProductDetails onClose={() => setIsEditing(false)} />
            )}
        </div>
    );
};

export default ProductDetails;
