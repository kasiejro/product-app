import { useNavigate } from 'react-router-dom';

import './Header.css';

export const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <header className='appHeader'>
            <button onClick={handleClick}>Home</button>
        </header>
    );
};
