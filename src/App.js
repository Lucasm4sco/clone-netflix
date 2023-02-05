import { useState, useEffect } from "react";
import { getHomeList, getInfoMovie } from "./data/tmdb";
import './App.css';

import Header from "./components/Header/Header";
import MovieRow from "./components/MovieRow/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getHomeList();
      setMovieList(data);

      const originalsList = data.filter(item => item.slug === 'originals');
      const random = Math.floor(Math.random() * originalsList[0].items.results.length);
      const movieChosen = originalsList[0].items.results[random];

      const infoMovieChosen = await getInfoMovie(movieChosen.id, 'tv');
      setFeaturedData(infoMovieChosen);
    }

    loadData();
  }, []);

  useEffect(() => {
    if(!movieList.length)
      return

    setLoading(false);
  }, [movieList])

  return (
    <div className="page">
      <Header />
      <main>
        {featuredData && <FeaturedMovie item={featuredData} />}
        <section className="lists">
          {movieList.map((item, i) => (
            <MovieRow
              title={item.title}
              items={item.items}
              key={i}
            />
          ))}
        </section>
      </main>
      <footer>
        <p>Feito com <span role='img' aria-label="coração">💜</span></p>
        <p>Direitos de imagem para Netflix</p>
        <p>Dados pegos do site <a href="https://www.themoviedb.org" target='_blank' rel='noreferrer'>Themoviedb.org</a></p>
      </footer>

      {loading && (
        <div className="loading">
          <img src="https://assets.wired.com/photos/w_2000/wp-content/uploads/2016/01/Netflix_LoadTime.gif" alt='Carregando...' />
        </div>
      )}
    </div>
  );
}

export default App;
