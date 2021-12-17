/* Shop page - filter */
const filterBtn = document.querySelector(".shop-filter button");
const filter = document.querySelector(".filterCol-3");
const shop = document.querySelector(".filterCol-9");

const cd_item_i = document.getElementsByClassName('.fa')
let screenWidth = window.innerWidth
let a = 0;

filterBtn.addEventListener("click", function() {

    // if (a != 0 && $(window).width() < 576) {
    //     filter.style.width = "100%"
    //     shop.style.display = "none"
    //     a++;
    // }
    if (a == 0 && screenWidth < 576) {
        filter.style.width = "100%"
        filter.style.display = "block"
        shop.style.width = "0%"
        shop.style.display = "none"

        a++;
    } else if (a != 0 && screenWidth < 576) {
        shop.style.width = "100%"
        shop.style.display = "block"
        filter.style.width = "0%"
        filter.style.display = "none"


        a--;
    }
});

filterBtn.addEventListener("click", function() {
    if (a != 0 && screenWidth > 576) {
        filter.style.width = "0%"
        filter.style.display = "none"
        shop.style.width = "100%"
        shop.style.display = "block"

        a++;
    } else if (a == 0 && screenWidth > 576) {
        shop.style.width = "75%"
        filter.style.width = "25%"
        filter.style.display = "block"
        shop.style.display = "block"

        a--;
    }

});
window.setTimeout(function() {
    window.location.reload();
}, 30000);