import { useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
    const headerRef = useRef();

    useEffect(() => {
        const eventScroll = () => {
            const scrollY = window.pageYOffset;
            if (scrollY > 0)
                headerRef.current.classList.add('black');
            else
                headerRef.current.classList.remove('black');
        }

        window.addEventListener('scroll', eventScroll);

        return () => {
            window.removeEventListener('scroll', eventScroll);
        }
    }, [])

    return (
        <header ref={headerRef}>
            <div className="header--logo">
                <a href="/">
                    <img src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg' alt='logo Netflix' />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" alt="Usuário" />
                </a>
            </div>
        </header>
    )
}

export default Header