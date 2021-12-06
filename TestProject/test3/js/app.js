/* Shop page - filter */
const filterBtn = document.querySelector(".shop-filter button");
const filter = document.querySelector(".filterCol-3");
const shop = document.querySelector(".filterCol-9");
const shop2 = document.querySelector("#shop .col-9");
const cd_item_i = document.getElementsByClassName('.fa')
let screenWidth = screen.width
let a = 0;

filterBtn.addEventListener("click", function () {
    if(a!=0 &&  screenWidth >576){
        filter.style.width = "0%"
        filter.style.display="none"
        shop.style.width="100%"
        shop2.style.width="100%"
        a++;
    }
    else if(a==0 &&  screenWidth >576){
        shop.style.width = "75%"
        shop2.style.width = "75%"
        filter.style.display="block"
        filter.style.width="25%"

        a--;
    }
    
    else if (a != 0 && screenWidth <= 576) {
        shop.style.width = "100%"
        shop2.style.width = "100%"
        filter.style.display = "block"
        filter.style.width = "0%"
        a++;
    } else {
        filter.style.width = "0%"
        filter.style.display = "none"
        shop.style.width = "100%"
        shop2.style.width = "100%"
        a--;
    }

});
