let searchNumber = document.querySelector('.resultnumber');
let elUnordered = document.querySelector('.list');
let elForm = document.querySelector('.form');
let elSelect = document.querySelector('.select');
searchNumber.textContent = films.length;
let selectarr = [];
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
selectMenu(films)
// sort genres
let sortCards = fullArray => {
    arr = fullArray.filter(item => item.genres.includes(elSelect.value))
}
// search btn click
elForm.addEventListener('submit', evt => {
    evt.preventDefault();
    elUnordered.innerHTML = null
    sortCards(films)
    if (elSelect.value === 'all') {
        renderMovies(films)
    }
    renderMovies(arr);
    searchNumber.textContent = arr.length
})
sortCards(films)
//RenderMovies
let renderMovies = (fullArray) => {
    fullArray.forEach(item => {
        let elList = document.createElement('li');
        let elImg = document.createElement('img');
        let elDiv = document.createElement('div');
        let elTitle = document.createElement('h5');
        let elText = document.createElement('p');
        let elBtn = document.createElement('a');
        let elListGenres = document.createElement('ul');

        // set attributes
        elList.setAttribute('class', 'card mt-4');
        elImg.setAttribute('class', 'card-header');
        elImg.setAttribute('src', item.poster);
        elDiv.setAttribute('class', 'card-body');
        elTitle.setAttribute('class', 'card-title');
        elText.setAttribute('class', 'card-text');
        elBtn.setAttribute('href', 'https://picsum.photos')
        elBtn.setAttribute('class', 'btn-danger btn')

        item.genres.forEach(innerList => {
            let elListGenresItem = document.createElement('li');
            elListGenresItem.textContent = innerList;
            elListGenres.appendChild(elListGenresItem);
        })
        // text content
        elTitle.textContent = item.title;
        elText.textContent = item.overview;
        elBtn.textContent = "Watch Trailer"

        //initialize created elements
        elUnordered.appendChild(elList);
        elList.appendChild(elImg);
        elList.appendChild(elDiv);
        elDiv.appendChild(elTitle);
        elDiv.appendChild(elText);
        elDiv.appendChild(elBtn);
        elDiv.appendChild(elListGenres)

    });
}
renderMovies(films)