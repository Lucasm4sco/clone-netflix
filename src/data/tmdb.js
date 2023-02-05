const API_KEY = process.env.REACT_APP_API_KEY;
const URL_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint, filter = '') => {
    if (filter)
        filter += '&'

    const response = await fetch(`${URL_BASE}${endpoint}?${filter}language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}

/*
    A NetFlix encerrou o acesso a sua API pública, por isso acredito não ter uma forma correta de achar todos os originais na API do TMDB, devido a isso o array da lista originais possui o output de alguns programas de TV
    Obs: Você ainda pode usar o filtro with_companies com os id's da netflix entregados pela API, mas retornam poucos dados
*/

const getHomeList = async () => {
    return [
        {
            slug: 'originals',
            title: 'Originais do Netflix',
            items: await basicFetch('/discover/tv')
        },
        {
            slug: 'trending',
            title: 'Recomendados para Você',
            items: await basicFetch('/trending/all/week')
        },
        {
            slug: 'toprated',
            title: 'Em Alta',
            items: await basicFetch('/movie/top_rated')
        },
        {
            slug: 'action',
            title: 'Ação',
            items: await basicFetch('/discover/movie', 'with_genres=28')
        },
        {
            slug: 'comedy',
            title: 'Comédia',
            items: await basicFetch('/discover/movie', 'with_genres=35')
        },
        {
            slug: 'horror',
            title: 'Terror',
            items: await basicFetch('/discover/movie', 'with_genres=27')
        },
        {
            slug: 'romance',
            title: 'Romance',
            items: await basicFetch('/discover/movie', 'with_genres=10749')
        },
        {
            slug: 'documentary',
            title: 'Documentários',
            items: await basicFetch('/discover/movie', 'with_genres=99')
        }
    ]
}

const getInfoMovie = async (id, type) => {
    let info = {};

    if (type === 'movie')
        info = await basicFetch('/movie/' + id);
    else
        info = await basicFetch('/tv/' + id);

    return info;
}

export { getHomeList, getInfoMovie };