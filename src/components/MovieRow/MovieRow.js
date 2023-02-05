import { useState, useEffect, useCallback } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './MovieRow.css';

const MovieRow = ({ title, items }) => {

    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        x >= 0 ? setScrollX(0) : setScrollX(x);
    }

    const handleRightArrow = useCallback(() => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let widthList = items.results.length * 150;
        if((window.innerWidth - widthList) > x) 
            x = window.innerWidth - widthList - 80

        setScrollX(x);
    }, [items, scrollX])

    useEffect(() => {
        const followingScreenScrollX = () => {
            let widthList = items.results.length * 150;
            if(window.innerHeight - widthList > scrollX)
                handleRightArrow();
        }

        window.addEventListener('resize', followingScreenScrollX);
        return () => window.removeEventListener('rezise', followingScreenScrollX);
    }, [items, handleRightArrow, scrollX])

    return (
        <div className='movieRow'>
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movieRow--listarea" style={{
                width: items.results.length * 150
            }}>
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                }}>
                    {items?.results?.map((item, i) => (
                        <div key={i} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieRow;