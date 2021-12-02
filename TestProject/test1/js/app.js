/* Shop page - filter */
const filterBtn = document.querySelector(".shop-filter button");
const filter = document.querySelector(".filterCol-3");
const shop = document.querySelector(".filterCol-9");
let a=0;

filterBtn.addEventListener("click", function () {
    if(a!=0){
        filter.style.width = "0%"
        filter.style.display="none"
        shop.style.width="100%"
        a++;
    }
    else{
        shop.style.width = "75%"
        filter.style.display="block"
        filter.style.width="25%"
        a--;
    }
    
});

