import { BsFillPlayFill } from 'react-icons/bs';
import './FeaturedMovie.css';

const FeaturedMovie = ({ item }) => {
    const firstDate = new Date(item?.first_air_date);

    let genres = []
    item.genres.forEach(genre => {
        genres.push(genre.name);
    })

    if(!item)
        return

    return (
        <section className='featured' style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className='featured--vertical'>
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {item.name}
                    </div>
                    <div className="featured--info">
                        <div className="featured--points">
                            {item.vote_average} pontos
                        </div>
                        <div className="featured--year">
                            {firstDate.getFullYear()}
                        </div>
                        <div className='featured--seasons'>
                            {item.number_of_seasons && `${item.number_of_seasons} temporada${item.number_of_seasons > 1 ? 's' : ''}`}
                        </div>
                    </div>
                    <div className="featured--description">
                        {item.overview}
                    </div>
                    <div className="featured--buttons">
                        <a href={'/watch/' + item.id} className='featured--watchbutton'><BsFillPlayFill /> Assistir</a>
                        <a href={'/list/' + item.id} className='featured--mylistbutton'>+ Minha Lista</a>
                    </div>
                    <div className="featured--genres">
                        <strong>Gêneros: </strong>
                        {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedMovie