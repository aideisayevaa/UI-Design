let resSearch = document.querySelector('#resSearch')
let navbarLogo = document.querySelector('.navbar-logo')
let navbarSearch = document.querySelector('.navbar-search')
let count = 0;



resSearch.addEventListener('click', function() {
    if (count == 0) {
        navbarLogo.style.display = "none"
        navbarSearch.style.display = "block"
        count++
    } else {
        navbarLogo.style.display = "block"
        navbarSearch.style.display = "none"
        count--
    }

})