const API_KEY = 'c9680c5e8dedd8ce95289c14748165f9';

function criarFilme(filme) {
    let filmes = document.querySelector('div.filmes');
    filmes.insertAdjacentHTML('beforeend', `
        <div class="filme">
            <a href="./detalhes.html">
                <img src="https://image.tmdb.org/t/p/original${filme.poster_path}" 
                    alt="${filme.original_title || filme.original_name}" 
                    title="${filme.original_title || filme.original_name}" 
                    loading="lazy">
            </a>
            <p>${filme.original_title || filme.original_name}</p>
            <p>${filme.vote_average}</p>
            <a class="botao" href="./detalhes.html">Detalhes</a>
        </div>
    `);
}

function gerarFilmes() {
    for (let i = 0; i < 5; i++) {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => criarFilme(data.results[i]));
    }
}

window.addEventListener("load", evento => {
    let url = location.pathname;
    if (url.indexOf("index.html") > -1) {
        gerarFilmes();
    }
});
