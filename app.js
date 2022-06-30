// variables
let searchNumber = document.querySelector('.resultnumber');
let elUnordered = document.querySelector('.list');
let elForm = document.querySelector('.form');
let elInputSearch = document.querySelector('.search-film');
let elSelect = document.querySelector('.select');
let elModal = document.querySelector('.modal-window');
let elOverlay = document.querySelector('.overlay-window');
let elFavouritesModal = document.querySelector('.favourites-modal');
let elFavouritesOverlay = document.querySelector('.favourites-overlay');
let elLikedNumber = document.querySelector('.liked-number');
let elHeartLogo = document.querySelector('.liked');
let parsedData = JSON.parse(window.localStorage.getItem('films'));
let selectarr = [];
let favourites;

// choose array or local storage data
if(parsedData){
    favourites=parsedData
    elLikedNumber.textContent=favourites.length;
}
else{
    favourites=[];
}

// initial search result
searchNumber.textContent = films.length;

//RenderMovies
let renderMovies = (fullArray) => {
    fullArray.forEach(item => {
        let elList = document.createElement('li');
        let elImg = document.createElement('img');
        let elDiv = document.createElement('div');
        let elTitle = document.createElement('h5');
        let elBtn = document.createElement('a');
        let elMoreInfoBtn = document.createElement('button');
        let elSelectBtn = document.createElement('button');

        // set attributes
        elList.setAttribute('class', 'card mt-4');
        elImg.setAttribute('class', 'card-header');
        elImg.setAttribute('src', item.poster);
        elDiv.setAttribute('class', 'card-body');
        elTitle.setAttribute('class', 'card-title');
        // elText.setAttribute('class', 'card-text');
        elBtn.setAttribute('href', 'https://picsum.photos')
        elBtn.setAttribute('class', 'btn-danger btn')
        elMoreInfoBtn.setAttribute('class', 'btn btn-info btn__moreinfo')
        elSelectBtn.setAttribute('class', 'btn btn-primary btn__select')

        elMoreInfoBtn.dataset.moreInfo = item.id;
        elSelectBtn.dataset.selectBtn = item.id;

        // text content
        elTitle.textContent = item.title;
        // elText.textContent = item.overview;
        elBtn.textContent = "Watch Trailer"
        elMoreInfoBtn.textContent = 'More Info'
        elSelectBtn.textContent = "Favourites"

        //initialize created elements
        elUnordered.appendChild(elList);
        elList.appendChild(elImg);
        elList.appendChild(elDiv);
        elDiv.appendChild(elTitle);
        elDiv.appendChild(elBtn);
        elDiv.appendChild(elMoreInfoBtn);
        elDiv.appendChild(elSelectBtn);
    });
}

//render modal
let renderModal = (element) => {
    let modalImg = document.createElement('img');
    let modalAside = document.createElement('div');
    let modalAsideTitle = document.createElement('h3');
    let modalAsideText = document.createElement('p');
    let modalAsideGenres = document.createElement('ul');
    let modalAsideYear = document.createElement('p');

    modalImg.setAttribute('class', 'modal__img')
    modalImg.setAttribute('src', element.poster)
    modalAside.setAttribute('class', 'modal__aside')
    modalAsideTitle.setAttribute('class', 'modal__aside-title')
    modalAsideText.setAttribute('class', 'modal__aside-text')
    modalAsideYear.setAttribute('class', 'modal__aside-year')

    modalAsideTitle.textContent = element.title;
    modalAsideText.textContent = element.overview;
    modalAsideYear.textContent = new Date(element.release_date).getFullYear();

    element.genres.forEach(item => {
        let genresList = document.createElement('li');
        genresList.textContent = item;
        modalAsideGenres.appendChild(genresList);
    })

    elModal.append(modalImg);
    elModal.append(modalAside);
    modalAside.appendChild(modalAsideTitle);
    modalAside.appendChild(modalAsideText);
    modalAside.appendChild(modalAsideYear);
    modalAside.appendChild(modalAsideGenres);
}

// render favourites 
let renderFavourites = (favouritesArray) => {
    favouritesArray.forEach(item => {
        let favouritesDiv = document.createElement('div');
        let favouritesTitle = document.createElement('h3');
        let favouritesDelete = document.createElement('button');

        favouritesDiv.setAttribute('class', 'favourites-box');
        favouritesTitle.setAttribute('class', 'favourites-title');
        favouritesDelete.setAttribute('class', 'favourites-delete btn btn-danger');

        favouritesDelete.dataset.favouritesDeleteBtn = item.id;

        favouritesTitle.textContent = item.title;
        favouritesDelete.textContent = 'Delete';

        elFavouritesModal.appendChild(favouritesDiv);
        favouritesDiv.appendChild(favouritesTitle);
        favouritesDiv.appendChild(favouritesDelete);

    })
}

// heart logo click 
elHeartLogo.addEventListener('click', () => {
    if (favourites.length === 0) {
        elFavouritesModal.innerHTML = "";
        let errorMessage = document.createElement('p');

        errorMessage.setAttribute('class', 'errorMessage')

        errorMessage.textContent = "There is no favourites"
        elFavouritesModal.append(errorMessage)

        elFavouritesModal.classList.remove('hide');
        elFavouritesOverlay.classList.remove('hide');
    } else {
        elFavouritesModal.innerHTML = "";
        renderFavourites(favourites)
        elFavouritesModal.classList.remove('hide');
        elFavouritesOverlay.classList.remove('hide');
    }
})
// close heart logo modal
elFavouritesOverlay.addEventListener('click', () => {
    elFavouritesModal.classList.add('hide');
    elFavouritesOverlay.classList.add('hide')
})

//select menu
let selectMenu = (fullArray) => {
    fullArray.forEach(item => {
        item.genres.forEach(element => {
            if (!(selectarr.includes(element))) selectarr.push(element);
        })
    })
    selectarr.forEach(options => {
        let elOption = document.createElement('option');
        elOption.textContent = options;
        elSelect.appendChild(elOption);
    })
}

// sort genres
let sortCards = fullArray => {
    arr = fullArray.filter(item => item.genres.includes(elSelect.value))
}

// search film input
elForm.addEventListener('input', e => {
    let inputValue = e.target.value
    let searchArr = films.filter(item => item.title.toLowerCase().includes(inputValue));
    searchNumber.textContent = searchArr.length
    elUnordered.innerHTML = "";
    renderMovies(searchArr);
})

// select genres menu
elForm.addEventListener('change', evt => {
    evt.preventDefault();
    elUnordered.innerHTML = null
    sortCards(films)
    if (elSelect.value === 'all') {
        searchNumber.textContent = films.length
        renderMovies(films)
    } else {
        renderMovies(arr);
        searchNumber.textContent = arr.length
    }
})

// More info btn click
elUnordered.addEventListener('click', e => {
    if (e.target.matches('.btn__moreinfo')) {
        let moreInfo = e.target.dataset.moreInfo;
        let findElement = films.find(item => item.id === moreInfo);
        renderModal(findElement);
        elModal.classList.remove('hidden');
        elOverlay.classList.remove('hidden');
    } else if (e.target.matches('.btn__select')) {
        let selectBtn = e.target.dataset.selectBtn;
        let findElement = films.find(item => item.id === selectBtn);
        if (!favourites.includes(findElement)) {
            favourites.push(findElement)
            window.localStorage.setItem('films', JSON.stringify(favourites));
        }
        elLikedNumber.textContent = favourites.length;
    }
})

// favourites delete
elFavouritesModal.addEventListener('click', (e) => {
    if (e.target.matches('.favourites-delete ')) {
        let favouritesDeleteId = e.target.dataset.favouritesDeleteBtn;
        let findIndex = favourites.findIndex(item => item.id === favouritesDeleteId);
        favourites.splice(findIndex, 1);
        window.localStorage.setItem('films', JSON.stringify(favourites));
        elLikedNumber.textContent = favourites.length;
        if (favourites.length === 0) {
            window.localStorage.removeItem('films');
        }
        elFavouritesModal.innerHTML = "";
        renderFavourites(favourites)
    }
    if (favourites.length === 0) {
        let errorMessage = document.createElement('p');

        errorMessage.setAttribute('class', 'errorMessage')

        errorMessage.textContent = "There is no favourites"
        elFavouritesModal.append(errorMessage)
    }
})

// more info close modal
elOverlay.addEventListener('click', () => {
    elModal.classList.add('hidden');
    elOverlay.classList.add('hidden');
    elModal.innerHTML = "";
})

// more info close modal on keyPress
document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
        elModal.classList.add('hidden');
        elOverlay.classList.add('hidden');
        elModal.innerHTML = ""
    }
})
selectMenu(films)
sortCards(films)
renderMovies(films)