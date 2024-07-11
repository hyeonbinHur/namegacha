import { useState } from 'react';
import astro from '../assets/png/error.png';
import LogoBlack from '../assets/sLogo/logo-black.png';
import LogoWhite from '../assets/sLogo/name-favicon-white.png';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="error-page">
            <section className="error-page--text-container">
                <h3 className="error--main-title">404</h3>
                <h5 className="error--sub-title">Error Page</h5>
                <p className="error--paragraph">
                    Uh oh, an unexpected error has occurred. Please return to
                    the main page and try again. If the problem persists, feel
                    free to contact our support team for further assistance.
                </p>
                <button
                    className="error--button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => navigate('/namegacha/')}
                >
                    <img
                        src={isHovered ? LogoWhite : LogoBlack}
                        alt="name gacha logo"
                        className="error--logo"
                    />
                    Name Gacha
                </button>
            </section>
            <section className="error-page--img-container">
                <img
                    src={astro}
                    alt="Error Astronat image"
                    className="error--img"
                />
            </section>
        </div>
    );
}
