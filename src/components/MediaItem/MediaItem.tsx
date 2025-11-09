import { useState } from 'react';

import type { ProductImage } from '../../interfaces/product';

export const MediaItem = ({
    image,
    errorImageSrc = 'https://placehold.co/200x200?text=Broken+Image',
    size = 200,
}: {
    image: ProductImage;
    errorImageSrc?: string;
    size?: number;
}) => {
    const [src, setSrc] = useState(image.url);

    return (
        <img
            src={src}
            alt={image.name}
            onError={() => setSrc(errorImageSrc)}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                objectFit: 'cover',
            }}
        />
    );
};
