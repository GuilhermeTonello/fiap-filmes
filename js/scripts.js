const API_KEY = 'c9680c5e8dedd8ce95289c14748165f9';

function getUrlParam(param) {
    return new URLSearchParams(location.search).get(param);
}

function criarFilme(filme) {
    let filmes = document.querySelector('div.filmes');
    filmes.insertAdjacentHTML('beforeend', `
        <div class="filme">
            <a href="./detalhes.html?filme=${filme.id}">
                <img src="https://image.tmdb.org/t/p/original${filme.poster_path}" 
                    alt="${filme.original_title || filme.original_name}" 
                    title="${filme.original_title || filme.original_name}" 
                    loading="lazy">
            </a>
            <p>${filme.original_title || filme.original_name}</p>
            <p>${filme.vote_average}</p>
            <a class="botao" href="./detalhes.html?filme=${filme.id}">Detalhes</a>
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

function gerarFilmeDetails(filmeId) {
    let filmeSinopse = document.querySelector('section.filme-resumo');
    let filmeInfo = document.querySelector('section.filme-info');
    let fichaTecnica = document.querySelector('aside.ficha-tecnica');

    fetch(`https://api.themoviedb.org/3/movie/${filmeId}?api_key=c9680c5e8dedd8ce95289c14748165f9&language=en-US&append_to_response=credits`)
        .then(res => res.json())
        .then(filme => {
            filmeSinopse.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 100%), url('https://image.tmdb.org/t/p/original${filme.backdrop_path}')`;
            filmeSinopse.querySelector('div.filme-img img').src = `https://image.tmdb.org/t/p/original${filme.poster_path}`;
            filmeSinopse.querySelector('div.filme-info h2').innerHTML = filme.original_title || filme.original_name;
            filmeSinopse.querySelector('div.filme-info p').innerHTML = filme.overview;

            filmeInfo.querySelector('div.botoes a#site').href = filme.homepage;
            
            for (let i = 0; i < 4; i++) {
                let atorAtual = filme.credits.cast[i];
                filmeInfo.querySelector('div.elenco div.atores').insertAdjacentHTML('beforeend', `
                    <div class="ator">
                        <img src="https://image.tmdb.org/t/p/original${atorAtual.profile_path}" alt="${atorAtual.original_name}">
                        <p class="ator-nome">${atorAtual.original_name}</p>
                        <p class="ator-personagem">${atorAtual.character}</p>
                    </div>
                `);
            }

            const filmeReleaseDate = new Date(filme.release_date);
            fichaTecnica.insertAdjacentHTML('beforeend', `
                <div class="item-tecnico">
                    <p class="item-titulo">Título Original</p>
                    <p class="item-valor">${filme.original_title || filme.original_name}</p>
                </div>

                <div class="item-tecnico">
                    <p class="item-titulo">Idioma Original</p>
                    <p class="item-valor">${filme.original_language}</p>
                </div>

                <div class="item-tecnico">
                    <p class="item-titulo">Orçamento</p>
                    <p class="item-valor">US$ ${filme.budget}</p>
                </div>

                <div class="item-tecnico">
                    <p class="item-titulo">Receita</p>
                    <p class="item-valor">US$ ${filme.revenue}</p>
                </div>

                <div class="item-tecnico">
                    <p class="item-titulo">Lançamento</p>
                    <p class="item-valor">${(filmeReleaseDate.getDate() + 1) + "/" + (filmeReleaseDate.getMonth() + 1) + "/" + filmeReleaseDate.getFullYear()}</p>
                </div>

                <div class="item-tecnico">
                    <p class="item-titulo">Nota</p>
                    <p class="item-valor">${filme.vote_average}</p>
                </div>
            `);
        });
    console.log('oi');
}

window.addEventListener("load", evento => {
    let url = location.pathname;
    if (url.indexOf("index.html") > -1) {
        gerarFilmes();
    } else if (url.indexOf("detalhes.html") > -1 && getUrlParam('filme') != null) {
        gerarFilmeDetails(getUrlParam('filme'));
    }
});
